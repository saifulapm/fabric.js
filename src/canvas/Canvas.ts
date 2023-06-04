import { LEFT_CLICK, MIDDLE_CLICK, RIGHT_CLICK } from '../constants';
import { getDocument, getWindow } from '../env';
import {
  CanvasEvents,
  DragEventData,
  ObjectEvents,
  TPointerEvent,
  TPointerEventInfo,
  TPointerEventNames,
  Transform,
} from '../EventTypeDefs';
import { FabricEvent, TFabricEvent } from '../FabricEvent';
import { Point } from '../Point';
import { ActiveSelection } from '../shapes/ActiveSelection';
import { Group } from '../shapes/Group';
import type { FabricObject } from '../shapes/Object/FabricObject';
import { AssertKeys, TSize } from '../typedefs';
import { isTouchEvent, stopEvent } from '../util/dom_event';
import { sendPointToPlane } from '../util/misc/planeChange';
import {
  isActiveSelection,
  isFabricObjectWithDragSupport,
  isInteractiveTextObject,
} from '../util/types';
import { SelectableCanvas } from './SelectableCanvas';
import { TCanvasSizeOptions } from './StaticCanvas';
import { TextEditingManager } from './TextEditingManager';

const addEventOptions = { passive: false } as EventListenerOptions;

function checkClick(e: TPointerEvent, value: number) {
  return (
    typeof (e as MouseEvent).button === 'number' &&
    (e as MouseEvent).button === value - 1
  );
}

// just to be clear, the utils are now deprecated and those are here exactly as minifier helpers
// because el.addEventListener can't me be minified while a const yes and we use it 47 times in this file.
// few bytes but why give it away.
const addListener = (
  el: HTMLElement | Document,
  ...args: Parameters<HTMLElement['addEventListener']>
) => el.addEventListener(...args);
const removeListener = (
  el: HTMLElement | Document,
  ...args: Parameters<HTMLElement['removeEventListener']>
) => el.removeEventListener(...args);

const syntheticEventConfig = {
  mouse: {
    in: 'over',
    out: 'out',
    targetIn: 'mouseover',
    targetOut: 'mouseout',
    canvasIn: 'mouse:over',
    canvasOut: 'mouse:out',
  },
  drag: {
    in: 'enter',
    out: 'leave',
    targetIn: 'dragenter',
    targetOut: 'dragleave',
    canvasIn: 'drag:enter',
    canvasOut: 'drag:leave',
  },
} as const;

type TSyntheticEventContext = {
  mouse: { e: TPointerEvent };
  drag: DragEventData;
};

export class Canvas extends SelectableCanvas {
  /**
   * Contains the id of the touch event that owns the fabric transform
   * @type Number
   * @private
   */
  declare mainTouchId: null | number;

  /**
   * When the option is enabled, PointerEvent is used instead of TPointerEvent.
   * @type Boolean
   * @default
   */
  declare enablePointerEvents: boolean;

  /**
   * Holds a reference to a setTimeout timer for event synchronization
   * @type number
   * @private
   */
  private declare _willAddMouseDown: number;

  /**
   * Holds a reference to an object on the canvas that is receiving the drag over event.
   * @type FabricObject
   * @private
   */
  private declare _draggedoverTarget?: FabricObject;

  /**
   * Holds a reference to an object on the canvas from where the drag operation started
   * @type FabricObject
   * @private
   */
  private declare _dragSource?: FabricObject;

  /**
   * Holds a reference to an object on the canvas that is the current drop target
   * May differ from {@link _draggedoverTarget}
   * @todo inspect whether {@link _draggedoverTarget} and {@link _dropTarget} should be merged somehow
   * @type FabricObject
   * @private
   */
  private declare _dropTarget: FabricObject<ObjectEvents> | undefined;

  declare currentTarget?: FabricObject;

  declare currentSubTargets?: FabricObject[];

  private _isClick: boolean;

  textEditingManager = new TextEditingManager();

  constructor(el: string | HTMLCanvasElement, options = {}) {
    super(el, options);
    // bind event handlers
    (
      [
        '_onMouseDown',
        '_onTouchStart',
        '_onMouseMove',
        '_onMouseUp',
        '_onTouchEnd',
        '_onWindowResize',
        // '_onGesture',
        // '_onDrag',
        // '_onShake',
        // '_onLongPress',
        // '_onOrientationChange',
        '_onMouseWheel',
        '_onMouseOut',
        '_onMouseEnter',
        '_onContextMenu',
        '_onDoubleClick',
        '_onDragStart',
        '_onDragEnd',
        '_onDragProgress',
        '_onDragOver',
        '_onDragEnter',
        '_onDragLeave',
        '_onDrop',
      ] as (keyof this)[]
    ).forEach((eventHandler) => {
      this[eventHandler] = (this[eventHandler] as Function).bind(this);
    });
    // register event handlers
    this.addOrRemove(addListener, 'add');
  }

  protected _setDimensionsImpl(
    dimensions: TSize,
    options?: TCanvasSizeOptions
  ) {
    this._resetTransformEventData();
    super._setDimensionsImpl(dimensions, options);
  }

  /**
   * return an event prefix pointer or mouse.
   * @private
   */
  private _getEventPrefix() {
    return this.enablePointerEvents ? 'pointer' : 'mouse';
  }

  addOrRemove(functor: any, eventjsFunctor: 'add' | 'remove') {
    const canvasElement = this.upperCanvasEl,
      eventTypePrefix = this._getEventPrefix();
    functor(getWindow(), 'resize', this._onWindowResize);
    functor(canvasElement, eventTypePrefix + 'down', this._onMouseDown);
    functor(
      canvasElement,
      `${eventTypePrefix}move`,
      this._onMouseMove,
      addEventOptions
    );
    functor(canvasElement, `${eventTypePrefix}out`, this._onMouseOut);
    functor(canvasElement, `${eventTypePrefix}enter`, this._onMouseEnter);
    functor(canvasElement, 'wheel', this._onMouseWheel);
    functor(canvasElement, 'contextmenu', this._onContextMenu);
    functor(canvasElement, 'dblclick', this._onDoubleClick);
    functor(canvasElement, 'dragstart', this._onDragStart);
    functor(canvasElement, 'dragend', this._onDragEnd);
    functor(canvasElement, 'dragover', this._onDragOver);
    functor(canvasElement, 'dragenter', this._onDragEnter);
    functor(canvasElement, 'dragleave', this._onDragLeave);
    functor(canvasElement, 'drop', this._onDrop);
    if (!this.enablePointerEvents) {
      functor(canvasElement, 'touchstart', this._onTouchStart, addEventOptions);
    }
    // if (typeof eventjs !== 'undefined' && eventjsFunctor in eventjs) {
    //   eventjs[eventjsFunctor](canvasElement, 'gesture', this._onGesture);
    //   eventjs[eventjsFunctor](canvasElement, 'drag', this._onDrag);
    //   eventjs[eventjsFunctor](
    //     canvasElement,
    //     'orientation',
    //     this._onOrientationChange
    //   );
    //   eventjs[eventjsFunctor](canvasElement, 'shake', this._onShake);
    //   eventjs[eventjsFunctor](canvasElement, 'longpress', this._onLongPress);
    // }
  }

  /**
   * Removes all event listeners
   */
  removeListeners() {
    this.addOrRemove(removeListener, 'remove');
    // if you dispose on a mouseDown, before mouse up, you need to clean document to...
    const eventTypePrefix = this._getEventPrefix();
    removeListener(
      getDocument(),
      `${eventTypePrefix}up`,
      this._onMouseUp as EventListener
    );
    removeListener(
      getDocument(),
      'touchend',
      this._onTouchEnd as EventListener,
      addEventOptions
    );
    removeListener(
      getDocument(),
      `${eventTypePrefix}move`,
      this._onMouseMove as EventListener,
      addEventOptions
    );
    removeListener(
      getDocument(),
      'touchmove',
      this._onMouseMove as EventListener,
      addEventOptions
    );
  }

  /**
   * @private
   * @param {Event} [e] Event object fired on wheel event
   */
  private _onMouseWheel(e: MouseEvent) {
    this.__onMouseWheel(e);
  }

  /**
   * @private
   * @param {Event} e Event object fired on mousedown
   */
  private _onMouseOut(e: TPointerEvent) {
    const target = this._hoveredTarget;
    const shared = {
      e,
      isClick: false,
      pointer: this.getPointer(e),
      absolutePointer: this.getPointer(e, true),
    };
    this.fire('mouse:out', { ...shared, target });
    this._hoveredTarget = undefined;
    target && target.fire('mouseout', { ...shared });
    this._hoveredTargets.forEach((nestedTarget) => {
      this.fire('mouse:out', { ...shared, target: nestedTarget });
      nestedTarget && nestedTarget.fire('mouseout', { ...shared });
    });
    this._hoveredTargets = [];
  }

  /**
   * @private
   * @param {Event} e Event object fired on mouseenter
   */
  private _onMouseEnter(e: TPointerEvent) {
    // This find target and consequent 'mouse:over' is used to
    // clear old instances on hovered target.
    // calling findTarget has the side effect of killing target.__corner.
    // as a short term fix we are not firing this if we are currently transforming.
    // as a long term fix we need to separate the action of finding a target with the
    // side effects we added to it.
    if (!this._currentTransform && !this.findTarget(e)) {
      this.fire('mouse:over', {
        e,
        isClick: false,
        pointer: this.getPointer(e),
        absolutePointer: this.getPointer(e, true),
      });
      this._hoveredTarget = undefined;
      this._hoveredTargets = [];
    }
  }

  /**
   * supports native like text dragging
   * @private
   * @param {DragEvent} e
   */
  private _onDragStart(e: DragEvent) {
    this._isClick = false;
    const activeObject = this.getActiveObject();
    if (
      isFabricObjectWithDragSupport(activeObject) &&
      activeObject.onDragStart(e)
    ) {
      this._dragSource = activeObject;
      const options = { e, target: activeObject };
      this.fire('dragstart', options);
      activeObject.fire('dragstart', options);
      addListener(
        this.upperCanvasEl,
        'drag',
        this._onDragProgress as EventListener
      );
      return;
    }
    stopEvent(e);
  }

  /**
   * First we clear top context where the effects are being rendered.
   * Then we render the effects.
   * Doing so will render the correct effect for all cases including an overlap between `source` and `target`.
   * @private
   */
  private _renderDragEffects(
    e: DragEvent,
    source?: FabricObject,
    target?: FabricObject
  ) {
    let dirty = false;
    // clear top context
    const dropTarget = this._dropTarget;
    if (dropTarget && dropTarget !== source && dropTarget !== target) {
      dropTarget.clearContextTop();
      dirty = true;
    }
    source?.clearContextTop();
    target !== source && target?.clearContextTop();
    // render effects
    const ctx = this.contextTop;
    ctx.save();
    ctx.transform(...this.viewportTransform);
    if (source) {
      ctx.save();
      source.transform(ctx);
      (source as AssertKeys<FabricObject, 'canvas'>).renderDragSourceEffect(e);
      ctx.restore();
      dirty = true;
    }
    if (target) {
      ctx.save();
      target.transform(ctx);
      (target as AssertKeys<FabricObject, 'canvas'>).renderDropTargetEffect(e);
      ctx.restore();
      dirty = true;
    }
    ctx.restore();
    dirty && (this.contextTopDirty = true);
  }

  /**
   * supports native like text dragging
   * https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#finishing_a_drag
   * @private
   * @param {DragEvent} e
   */
  private _onDragEnd(e: DragEvent) {
    const didDrop = !!e.dataTransfer && e.dataTransfer.dropEffect !== 'none',
      dropTarget = didDrop ? this._activeObject : undefined,
      options = {
        e,
        target: this._dragSource as FabricObject,
        subTargets: this.targets,
        dragSource: this._dragSource as FabricObject,
        didDrop,
        dropTarget: dropTarget as FabricObject,
      };
    removeListener(
      this.upperCanvasEl,
      'drag',
      this._onDragProgress as EventListener
    );
    this.fire('dragend', options);
    this._dragSource && this._dragSource.fire('dragend', options);
    delete this._dragSource;
    // we need to call mouse up synthetically because the browser won't
    this._onMouseUp(e);
  }

  /**
   * fire `drag` event on canvas and drag source
   * @private
   * @param {DragEvent} e
   */
  private _onDragProgress(e: DragEvent) {
    const options = {
      e,
      target: this._dragSource as FabricObject | undefined,
      dragSource: this._dragSource as FabricObject | undefined,
      dropTarget: this._draggedoverTarget as FabricObject,
    };
    this.fire('drag', options);
    this._dragSource && this._dragSource.fire('drag', options);
  }

  /**
   * As opposed to {@link findTarget} we want the top most object to be returned w/o the active object cutting in line.
   * Override at will
   */
  protected findDragTargets(e: DragEvent) {
    this.targets = [];
    const target = this._searchPossibleTargets(
      this._objects,
      this.getPointer(e, true)
    );
    return {
      target,
      targets: [...this.targets],
    };
  }

  /**
   * prevent default to allow drop event to be fired
   * https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#specifying_drop_targets
   * @private
   * @param {DragEvent} [e] Event object fired on Event.js shake
   */
  private _onDragOver(e: DragEvent) {
    const eventType = 'dragover';
    const { target, targets } = this.findDragTargets(e);
    const dragSource = this._dragSource as FabricObject;
    const options = {
      e,
      target,
      subTargets: targets,
      dragSource,
      canDrop: false,
      dropTarget: undefined,
    };
    let dropTarget;
    //  fire on canvas
    this.fire(eventType, options);
    //  make sure we fire dragenter events before dragover
    //  if dragleave is needed, object will not fire dragover so we don't need to trouble ourselves with it
    this._fireEnterLeaveEvents(target, options);
    if (target) {
      if (target.canDrop(e)) {
        dropTarget = target;
      }
      target.fire(eventType, options);
    }
    //  propagate the event to subtargets
    for (let i = 0; i < targets.length; i++) {
      const subTarget = targets[i];
      // accept event only if previous targets didn't (the accepting target calls `preventDefault` to inform that the event is taken)
      // TODO: verify if those should loop in inverse order then?
      // what is the order of subtargets?
      if (subTarget.canDrop(e)) {
        dropTarget = subTarget;
      }
      subTarget.fire(eventType, options);
    }
    //  render drag effects now that relations between source and target is clear
    this._renderDragEffects(e, dragSource, dropTarget);
    this._dropTarget = dropTarget;
  }

  /**
   * fire `dragleave` on `dragover` targets
   * @private
   * @param {Event} [e] Event object fired on Event.js shake
   */
  private _onDragEnter(e: DragEvent) {
    const { target, targets } = this.findDragTargets(e);
    const options = {
      e,
      target,
      subTargets: targets,
      dragSource: this._dragSource,
    };
    this.fire('dragenter', options);
    //  fire dragenter on targets
    this._fireEnterLeaveEvents(target, options);
  }

  /**
   * fire `dragleave` on `dragover` targets
   * @private
   * @param {Event} [e] Event object fired on Event.js shake
   */
  private _onDragLeave(e: DragEvent) {
    const options = {
      e,
      target: this._draggedoverTarget,
      subTargets: this.targets,
      dragSource: this._dragSource,
    };
    this.fire('dragleave', options);

    //  fire dragleave on targets
    this._fireEnterLeaveEvents(undefined, options);
    this._renderDragEffects(e, this._dragSource);
    this._dropTarget = undefined;
    //  clear targets
    this.targets = [];
    this._hoveredTargets = [];
  }

  /**
   * `drop:before` is a an event that allows you to schedule logic
   * before the `drop` event. Prefer `drop` event always, but if you need
   * to run some drop-disabling logic on an event, since there is no way
   * to handle event handlers ordering, use `drop:before`
   * @private
   * @param {Event} e
   */
  private _onDrop(e: DragEvent) {
    const { target, targets } = this.findDragTargets(e);
    const ev = this._basicEventHandler('drop:before', {
      e,
      target,
      subTargets: targets,
      dragSource: this._dragSource,
      pointer: this.getPointer(e),
    });
    //  will be set by the drop target
    ev.didDrop = false;
    //  will be set by the drop target, used in case options.target refuses the drop
    ev.dropTarget = undefined;
    //  fire `drop`
    this._basicEventHandler('drop', ev);
    //  inform canvas of the drop
    //  we do this because canvas was unaware of what happened at the time the `drop` event was fired on it
    //  use for side effects
    this.fire('drop:after', ev);
  }

  private _onContextMenu(e: TPointerEvent): false {
    const target = this.findTarget(e),
      subTargets = this.targets || [];
    const ev = this._basicEventHandler('contextmenu:before', {
      e,
      target,
      subTargets,
    });
    // TODO: this line is silly because the dev can subscribe to the event and prevent it themselves
    this.stopContextMenu && stopEvent(e);
    this._basicEventHandler('contextmenu', ev);
    return false;
  }

  private _onDoubleClick(e: TPointerEvent) {
    this._cacheTransformEventData(e);
    this._handleEvent(e, 'dblclick');
    this._resetTransformEventData();
  }

  /**
   * Return a the id of an event.
   * returns either the pointerId or the identifier or 0 for the mouse event
   * @private
   * @param {Event} evt Event object
   */
  getPointerId(evt: TouchEvent | PointerEvent): number {
    const changedTouches = (evt as TouchEvent).changedTouches;

    if (changedTouches) {
      return changedTouches[0] && changedTouches[0].identifier;
    }

    if (this.enablePointerEvents) {
      return (evt as PointerEvent).pointerId;
    }

    return -1;
  }

  /**
   * Determines if an event has the id of the event that is considered main
   * @private
   * @param {evt} event Event object
   */
  _isMainEvent(evt: TPointerEvent): boolean {
    if ((evt as PointerEvent).isPrimary === true) {
      return true;
    }
    if ((evt as PointerEvent).isPrimary === false) {
      return false;
    }
    if (evt.type === 'touchend' && (evt as TouchEvent).touches.length === 0) {
      return true;
    }
    if ((evt as TouchEvent).changedTouches) {
      return (
        (evt as TouchEvent).changedTouches[0].identifier === this.mainTouchId
      );
    }
    return true;
  }

  /**
   * @private
   * @param {Event} e Event object fired on mousedown
   */
  _onTouchStart(e: TouchEvent) {
    e.preventDefault();
    if (this.mainTouchId === null) {
      this.mainTouchId = this.getPointerId(e);
    }
    this.__onMouseDown(e);
    this._resetTransformEventData();
    const canvasElement = this.upperCanvasEl,
      eventTypePrefix = this._getEventPrefix();
    addListener(
      getDocument(),
      'touchend',
      this._onTouchEnd as EventListener,
      addEventOptions
    );
    addListener(
      getDocument(),
      'touchmove',
      this._onMouseMove as EventListener,
      addEventOptions
    );
    // Unbind mousedown to prevent double triggers from touch devices
    removeListener(
      canvasElement,
      eventTypePrefix + 'down',
      this._onMouseDown as EventListener
    );
  }

  /**
   * @private
   * @param {Event} e Event object fired on mousedown
   */
  _onMouseDown(e: TPointerEvent) {
    this.__onMouseDown(e);
    this._resetTransformEventData();
    const canvasElement = this.upperCanvasEl,
      eventTypePrefix = this._getEventPrefix();
    removeListener(
      canvasElement,
      `${eventTypePrefix}move`,
      this._onMouseMove as EventListener,
      addEventOptions
    );
    addListener(
      getDocument(),
      `${eventTypePrefix}up`,
      this._onMouseUp as EventListener
    );
    addListener(
      getDocument(),
      `${eventTypePrefix}move`,
      this._onMouseMove as EventListener,
      addEventOptions
    );
  }

  /**
   * @private
   * @param {Event} e Event object fired on mousedown
   */
  _onTouchEnd(e: TouchEvent) {
    if (e.touches.length > 0) {
      // if there are still touches stop here
      return;
    }
    this.__onMouseUp(e);
    this._resetTransformEventData();
    this.mainTouchId = null;
    const eventTypePrefix = this._getEventPrefix();
    removeListener(
      getDocument(),
      'touchend',
      this._onTouchEnd as EventListener,
      addEventOptions
    );
    removeListener(
      getDocument(),
      'touchmove',
      this._onMouseMove as EventListener,
      addEventOptions
    );
    if (this._willAddMouseDown) {
      clearTimeout(this._willAddMouseDown);
    }
    this._willAddMouseDown = setTimeout(() => {
      // Wait 400ms before rebinding mousedown to prevent double triggers
      // from touch devices
      addListener(
        this.upperCanvasEl,
        eventTypePrefix + 'down',
        this._onMouseDown as EventListener
      );
      this._willAddMouseDown = 0;
    }, 400) as unknown as number;
  }

  /**
   * @private
   * @param {Event} e Event object fired on mouseup
   */
  _onMouseUp(e: TPointerEvent) {
    this.__onMouseUp(e);
    this._resetTransformEventData();
    const canvasElement = this.upperCanvasEl,
      eventTypePrefix = this._getEventPrefix();
    if (this._isMainEvent(e)) {
      removeListener(
        getDocument(),
        `${eventTypePrefix}up`,
        this._onMouseUp as EventListener
      );
      removeListener(
        getDocument(),
        `${eventTypePrefix}move`,
        this._onMouseMove as EventListener,
        addEventOptions
      );
      addListener(
        canvasElement,
        `${eventTypePrefix}move`,
        this._onMouseMove as EventListener,
        addEventOptions
      );
    }
  }

  /**
   * @private
   * @param {Event} e Event object fired on mousemove
   */
  _onMouseMove(e: TPointerEvent) {
    const activeObject = this.getActiveObject();
    !this.allowTouchScrolling &&
      (!activeObject ||
        // a drag event sequence is started by the active object flagging itself on mousedown / mousedown:before
        // we must not prevent the event's default behavior in order for the window to start dragging
        (isFabricObjectWithDragSupport(activeObject) &&
          !activeObject.shouldStartDragging())) &&
      e.preventDefault &&
      e.preventDefault();
    this.__onMouseMove(e);
  }

  /**
   * @private
   */
  _onWindowResize() {
    this.calcOffset();
    this._resetTransformEventData();
  }

  /**
   * Decides whether the canvas should be redrawn in mouseup and mousedown events.
   * @private
   * @param {Object} target
   */
  _shouldRender(target: FabricObject | undefined) {
    const activeObject = this.getActiveObject();

    // if just one of them is available or if they are both but are different objects
    if (
      !!activeObject !== !!target ||
      (activeObject && target && activeObject !== target)
    ) {
      // this covers: switch of target, from target to no target, selection of target
      // multiSelection with key and mouse
      return true;
    } else if (isInteractiveTextObject(activeObject)) {
      // if we mouse up/down over a editing textbox a cursor change,
      // there is no need to re render
      return false;
    }
    return false;
  }

  protected shouldHandleDefaultEvent(
    e: TPointerEvent,
    beforeEvent?: TFabricEvent<TPointerEventInfo<TPointerEvent>>
  ) {
    return (
      !beforeEvent?.defaultPrevented &&
      (checkClick(e, LEFT_CLICK) || !('button' in e)) &&
      this._isMainEvent(e)
    );
  }

  /**
   * Method that defines the actions when mouse is released on canvas.
   * The method resets the currentTransform parameters, store the image corner
   * position in the image object and render the canvas on top.
   * @private
   * @param {Event} e Event object fired on mouseup
   */
  __onMouseUp(e: TPointerEvent) {
    this._cacheTransformEventData(e);
    const target = this._target;
    const beforeEvent = this._handleEvent(e, 'up:before');
    const shouldHandle = this.shouldHandleDefaultEvent(e, beforeEvent);
    const invalidate = shouldHandle && this.performDefaultUp(e);
    this._handleEvent(e, 'up', this._isClick);

    if (shouldHandle) {
      this._groupSelector = null;
      this._currentTransform = null;
      // reset the target information about which corner is selected
      target && (target.__corner = undefined);
    }

    if (invalidate) {
      this.requestRenderAll();
    } else if (
      !this._isClick &&
      !(
        isInteractiveTextObject(this._activeObject) &&
        this._activeObject.isEditing
      )
    ) {
      this.renderTop();
    }
  }

  protected performDefaultUp(e: TPointerEvent) {
    const transform = this._currentTransform;
    const target = this._target;
    let invalidate = false;
    if (transform) {
      this._finalizeCurrentTransform(e);
      invalidate = transform.actionPerformed;
    }
    if (!this._isClick) {
      const targetWasActive = target === this._activeObject;
      this._maybeGroupObjects(e);
      if (!invalidate) {
        invalidate =
          this._shouldRender(target) ||
          (!targetWasActive && target === this._activeObject);
      }
    }
    let pointer, corner;
    if (target) {
      corner = target._findTargetCorner(
        this.getPointer(e, true),
        isTouchEvent(e)
      );
      if (
        target.selectable &&
        target !== this._activeObject &&
        target.activeOn === 'up'
      ) {
        this.setActiveObject(target, e);
        invalidate = true;
      } else {
        const control = target.controls[corner as string];
        const mouseUpHandler =
          control && control.getMouseUpHandler(e, target, control);
        if (mouseUpHandler) {
          pointer = this.getPointer(e);
          mouseUpHandler(e, transform!, pointer.x, pointer.y);
        }
      }
      target.isMoving = false;
    }
    // if we are ending up a transform on a different control or a new object
    // fire the original mouse up from the corner that started the transform
    if (
      transform &&
      (transform.target !== target || transform.corner !== corner)
    ) {
      const originalControl =
          transform.target && transform.target.controls[transform.corner],
        originalMouseUpHandler =
          originalControl &&
          originalControl.getMouseUpHandler(
            e,
            transform.target,
            originalControl
          );
      pointer = pointer || this.getPointer(e);
      originalMouseUpHandler &&
        originalMouseUpHandler(e, transform, pointer.x, pointer.y);
    }
    this._setCursorFromEvent(e, target);
    return invalidate;
  }

  _basicEventHandler<T extends keyof (CanvasEvents | ObjectEvents)>(
    eventType: T,
    options: (CanvasEvents & ObjectEvents)[T]
  ) {
    const { target, subTargets = [] } = options as {
      target?: FabricObject;
      subTargets: FabricObject[];
    };
    const ev = this.fire(eventType, options) as TFabricEvent<
      CanvasEvents[T] & ObjectEvents[T]
    >;
    target && target.fire(eventType, ev);
    for (let i = 0; i < subTargets.length; i++) {
      subTargets[i].fire(eventType, ev);
    }
    return ev;
  }

  /**
   * @private
   * Handle event firing for target and subtargets
   * @param {Event} e event from mouse
   * @param {String} eventType event to fire (up, down or move)
   * @param {fabric.Object} targetObj receiving event
   * @param {Boolean} isClick for left button only, indicates that the mouse up happened without move.
   */
  _handleEvent(
    e: TPointerEvent,
    eventType: TPointerEventNames,
    isClick = false
  ) {
    if (
      (!this.fireMiddleClick && checkClick(e, MIDDLE_CLICK)) ||
      (!this.fireRightClick && checkClick(e, RIGHT_CLICK))
    ) {
      return;
    }
    const target = this._target;
    const targets = this.targets || [];
    const ev = FabricEvent.init<TPointerEventInfo>({
      e,
      target,
      subTargets: targets,
      isClick,
      pointer: this.getPointer(e),
      absolutePointer: this.getPointer(e, true),
      transform: this._currentTransform,
      ...(eventType === 'up'
        ? {
            currentTarget: this.findTarget(e),
            currentSubTargets: this.targets,
          }
        : {}),
    });
    this.fire(`mouse:${eventType}`, ev);
    // this may be a little be more complicated of what we want to handle
    target && target.fire(`mouse${eventType}`, ev);
    for (let i = 0; i < targets.length; i++) {
      targets[i].fire(`mouse${eventType}`, ev);
    }
    return ev;
  }

  /**
   * End the current transform.
   * You don't usually need to call this method unless you are interrupting a user initiated transform
   * because of some other event ( a press of key combination, or something that block the user UX )
   * @param {Event} [e] send the mouse event that generate the finalize down, so it can be used in the event
   */
  endCurrentTransform(e: TPointerEvent) {
    const transform = this._currentTransform;
    this._finalizeCurrentTransform(e);
    if (transform && transform.target) {
      // this could probably go inside _finalizeCurrentTransform
      transform.target.isMoving = false;
    }
    this._currentTransform = null;
  }

  /**
   * @private
   * @param {Event} e send the mouse event that generate the finalize down, so it can be used in the event
   */
  _finalizeCurrentTransform(e: TPointerEvent) {
    const transform = this._currentTransform!,
      target = transform.target,
      options = {
        e,
        target,
        transform,
        action: transform.action,
      };

    if (target._scaling) {
      target._scaling = false;
    }

    target.setCoords();

    if (transform.actionPerformed) {
      this.fire('object:modified', options);
      target.fire('modified', options);
    }
  }

  /**
   * Method that defines the actions when mouse is clicked on canvas.
   * The method inits the currentTransform parameters and renders all the
   * canvas so the current image can be placed on the top canvas and the rest
   * in on the container one.
   * @private
   * @param {Event} e Event object fired on mousedown
   */
  __onMouseDown(e: TPointerEvent) {
    this._isClick = true;
    this._cacheTransformEventData(e);
    const beforeEvent = this._handleEvent(e, 'down:before');
    const invalidate =
      this.shouldHandleDefaultEvent(e, beforeEvent) &&
      // ignore if some object is being transformed at this moment
      // TODO: check if this can ever happen (mouseup clears it)
      !this._currentTransform &&
      this.performDefaultDown(e);
    this._handleEvent(e, 'down');
    // we must renderAll so that we update the visuals
    invalidate && this.requestRenderAll();
  }

  protected performDefaultDown(e: TPointerEvent) {
    let target: FabricObject | undefined = this._target;
    const shouldRender = this._shouldRender(target),
      shouldGroup = this._shouldGroup(e, target);
    if (this._shouldClearSelection(e, target)) {
      this.discardActiveObject(e);
    } else if (shouldGroup) {
      // in order for shouldGroup to be true, target needs to be true
      this._handleGrouping(e, target!);
      target = this._activeObject;
    }
    // we start a group selector rectangle if
    // selection is enabled
    // and there is no target, or the following 3 condition both apply
    // target is not selectable ( otherwise we selected it )
    // target is not editing
    // target is not already selected ( otherwise we drag )
    if (
      this.selection &&
      (!target ||
        (!target.selectable &&
          // @ts-ignore
          !target.isEditing &&
          target !== this._activeObject))
    ) {
      const p = this.getPointer(e);
      this._groupSelector = {
        ex: p.x,
        ey: p.y,
        top: 0,
        left: 0,
      };
    }

    if (target) {
      const alreadySelected = target === this._activeObject;
      if (target.selectable && target.activeOn === 'down') {
        this.setActiveObject(target, e);
      }
      const corner = target._findTargetCorner(
        this.getPointer(e, true),
        isTouchEvent(e)
      );
      if (target === this._activeObject && (corner || !shouldGroup)) {
        this._setupCurrentTransform(e, target, alreadySelected);
        const control = target.controls[corner],
          pointer = this.getPointer(e),
          mouseDownHandler =
            control && control.getMouseDownHandler(e, target, control);
        if (mouseDownHandler) {
          mouseDownHandler(e, this._currentTransform!, pointer.x, pointer.y);
        }
      }
    }
    const invalidate = shouldRender || shouldGroup;
    //  we clear `_objectsToRender` in case of a change in order to repopulate it at rendering
    //  run before firing the `down` event to give the dev a chance to populate it themselves
    invalidate && (this._objectsToRender = undefined);
    return invalidate;
  }

  /**
   * reset cache form common information needed during event processing
   * @private
   */
  _resetTransformEventData() {
    this._target = undefined;
    this._pointer = undefined;
    this._absolutePointer = undefined;
  }

  /**
   * Cache common information needed during event processing
   * @private
   * @param {Event} e Event object fired on event
   */
  _cacheTransformEventData(e: TPointerEvent) {
    // reset in order to avoid stale caching
    this._resetTransformEventData();
    this._pointer = this.getPointer(e, true);
    this._absolutePointer = this.restorePointerVpt(this._pointer);
    this._target = this._currentTransform
      ? this._currentTransform.target
      : this.findTarget(e);
  }

  /**
   * @private
   */
  _beforeTransform(e: TPointerEvent) {
    const t = this._currentTransform!;
    this.fire('before:transform', {
      e,
      transform: t,
    });
  }

  /**
   * Method that defines the actions when mouse is hovering the canvas.
   * The currentTransform parameter will define whether the user is rotating/scaling/translating
   * an image or neither of them (only hovering). A group selection is also possible and would cancel
   * all any other type of action.
   * In case of an image transformation only the top canvas will be rendered.
   * @private
   * @param {Event} e Event object fired on mousemove
   */
  __onMouseMove(e: TPointerEvent) {
    this._isClick = false;
    this._cacheTransformEventData(e);
    const beforeEvent = this._handleEvent(e, 'move:before');
    this.shouldHandleDefaultEvent(e, beforeEvent) && this.performDefaultMove(e);
    this._handleEvent(e, 'move');
    this._resetTransformEventData();
  }

  protected performDefaultMove(e: TPointerEvent) {
    const groupSelector = this._groupSelector;
    if (groupSelector) {
      // We initially clicked in an empty area, so we draw a box for multiple selection
      const pointer = this.getPointer(e);
      groupSelector.left = pointer.x - groupSelector.ex;
      groupSelector.top = pointer.y - groupSelector.ey;
      this.renderTop();
    } else if (!this._currentTransform) {
      const target = this.findTarget(e);
      this._setCursorFromEvent(e, target);
      this._fireOverOutEvents(e, target);
    } else {
      this._transformObject(e);
    }
    this.textEditingManager.onMouseMove(e);
  }

  /**
   * Manage the mouseout, mouseover events for the fabric object on the canvas
   * @param {Fabric.Object} target the target where the target from the mousemove event
   * @param {Event} e Event object fired on mousemove
   * @private
   */
  _fireOverOutEvents(e: TPointerEvent, target?: FabricObject) {
    const _hoveredTarget = this._hoveredTarget,
      _hoveredTargets = this._hoveredTargets,
      targets = this.targets,
      length = Math.max(_hoveredTargets.length, targets.length);

    this.fireSyntheticInOutEvents('mouse', {
      e,
      target,
      oldTarget: _hoveredTarget,
      fireCanvas: true,
    });
    for (let i = 0; i < length; i++) {
      this.fireSyntheticInOutEvents('mouse', {
        e,
        target: targets[i],
        oldTarget: _hoveredTargets[i],
      });
    }
    this._hoveredTarget = target;
    this._hoveredTargets = this.targets.concat();
  }

  /**
   * Manage the dragEnter, dragLeave events for the fabric objects on the canvas
   * @param {Fabric.Object} target the target where the target from the onDrag event
   * @param {Object} data Event object fired on dragover
   * @private
   */
  _fireEnterLeaveEvents(target: FabricObject | undefined, data: DragEventData) {
    const draggedoverTarget = this._draggedoverTarget,
      _hoveredTargets = this._hoveredTargets,
      targets = this.targets,
      length = Math.max(_hoveredTargets.length, targets.length);

    this.fireSyntheticInOutEvents('drag', {
      ...data,
      target,
      oldTarget: draggedoverTarget,
      fireCanvas: true,
    });
    for (let i = 0; i < length; i++) {
      this.fireSyntheticInOutEvents('drag', {
        ...data,
        target: targets[i],
        oldTarget: _hoveredTargets[i],
      });
    }
    this._draggedoverTarget = target;
  }

  /**
   * Manage the synthetic in/out events for the fabric objects on the canvas
   * @param {Fabric.Object} target the target where the target from the supported events
   * @param {Object} data Event object fired
   * @param {Object} config configuration for the function to work
   * @param {String} config.targetName property on the canvas where the old target is stored
   * @param {String} [config.canvasEvtOut] name of the event to fire at canvas level for out
   * @param {String} config.evtOut name of the event to fire for out
   * @param {String} [config.canvasEvtIn] name of the event to fire at canvas level for in
   * @param {String} config.evtIn name of the event to fire for in
   * @private
   */
  fireSyntheticInOutEvents<T extends keyof TSyntheticEventContext>(
    type: T,
    {
      target,
      oldTarget,
      fireCanvas,
      e,
      ...data
    }: TSyntheticEventContext[T] & {
      target?: FabricObject;
      oldTarget?: FabricObject;
      fireCanvas?: boolean;
    }
  ) {
    const { targetIn, targetOut, canvasIn, canvasOut } =
      syntheticEventConfig[type];
    const targetChanged = oldTarget !== target;

    if (oldTarget && targetChanged) {
      const outOpt = {
        ...data,
        e,
        target: oldTarget,
        nextTarget: target,
        isClick: false,
        pointer: this.getPointer(e),
        absolutePointer: this.getPointer(e, true),
      };
      fireCanvas && this.fire(canvasIn, outOpt);
      oldTarget.fire(targetOut, outOpt);
    }
    if (target && targetChanged) {
      const inOpt: TPointerEventInfo = {
        ...data,
        e,
        target,
        previousTarget: oldTarget,
        isClick: false,
        pointer: this.getPointer(e),
        absolutePointer: this.getPointer(e, true),
      };
      fireCanvas && this.fire(canvasOut, inOpt);
      target.fire(targetIn, inOpt);
    }
  }

  /**
   * Method that defines actions when an Event Mouse Wheel
   * @param {Event} e Event object fired on mouseup
   */
  __onMouseWheel(e: TPointerEvent) {
    this._cacheTransformEventData(e);
    this._handleEvent(e, 'wheel');
    this._resetTransformEventData();
  }

  /**
   * @private
   * @param {Event} e Event fired on mousemove
   */
  _transformObject(e: TPointerEvent) {
    const pointer = this.getPointer(e),
      transform = this._currentTransform!,
      target = transform.target,
      //  transform pointer to target's containing coordinate plane
      //  both pointer and object should agree on every point
      localPointer = target.group
        ? sendPointToPlane(
            pointer,
            undefined,
            target.group.calcTransformMatrix()
          )
        : pointer;
    // seems used only here.
    // @TODO: investigate;
    // @ts-ignore
    transform.reset = false;
    transform.shiftKey = e.shiftKey;
    transform.altKey = !!this.centeredKey && e[this.centeredKey];

    this._performTransformAction(e, transform, localPointer);
    transform.actionPerformed && this.requestRenderAll();
  }

  /**
   * @private
   */
  _performTransformAction(
    e: TPointerEvent,
    transform: Transform,
    pointer: Point
  ) {
    const x = pointer.x,
      y = pointer.y,
      action = transform.action,
      actionHandler = transform.actionHandler;
    let actionPerformed = false;
    // this object could be created from the function in the control handlers

    if (actionHandler) {
      actionPerformed = actionHandler(e, transform, x, y);
    }
    if (action === 'drag' && actionPerformed) {
      transform.target.isMoving = true;
      this.setCursor(transform.target.moveCursor || this.moveCursor);
    }
    transform.actionPerformed = transform.actionPerformed || actionPerformed;
  }

  /**
   * Sets the cursor depending on where the canvas is being hovered.
   * Note: very buggy in Opera
   * @param {Event} e Event object
   * @param {Object} target Object that the mouse is hovering, if so.
   */
  _setCursorFromEvent(e: TPointerEvent, target?: FabricObject) {
    if (!target) {
      this.setCursor(this.defaultCursor);
      return;
    }
    let hoverCursor = target.hoverCursor || this.hoverCursor;
    const activeSelection = isActiveSelection(this._activeObject)
        ? this._activeObject
        : null,
      // only show proper corner when group selection is not active
      corner =
        (!activeSelection || !activeSelection.contains(target)) &&
        // here we call findTargetCorner always with undefined for the touch parameter.
        // we assume that if you are using a cursor you do not need to interact with
        // the bigger touch area.
        target._findTargetCorner(this.getPointer(e, true));

    if (!corner) {
      if ((target as Group).subTargetCheck) {
        // hoverCursor should come from top-most subTarget,
        // so we walk the array backwards
        this.targets
          .concat()
          .reverse()
          .map((_target) => {
            hoverCursor = _target.hoverCursor || hoverCursor;
          });
      }
      this.setCursor(hoverCursor);
    } else {
      const control = target.controls[corner];
      this.setCursor(control.cursorStyleHandler(e, control, target));
    }
  }

  // Grouping objects mixin

  /**
   * Return true if the current mouse event that generated a new selection should generate a group
   * @private
   * @param {TPointerEvent} e Event object
   * @param {FabricObject} target
   * @return {Boolean}
   */
  _shouldGroup(e: TPointerEvent, target?: FabricObject): boolean {
    const activeObject = this._activeObject;
    // check if an active object exists on canvas and if the user is pressing the `selectionKey` while canvas supports multi selection.
    return (
      !!activeObject &&
      this._isSelectionKeyPressed(e) &&
      this.selection &&
      // on top of that the user also has to hit a target that is selectable.
      !!target &&
      target.selectable &&
      // if all pre-requisite pass, the target is either something different from the current
      // activeObject or if an activeSelection already exists
      // TODO at time of writing why `activeObject.type === 'activeSelection'` matter is unclear.
      // is a very old condition uncertain if still valid.
      (activeObject !== target || activeObject.type === 'activeSelection') &&
      //  make sure `activeObject` and `target` aren't ancestors of each other
      !target.isDescendantOf(activeObject) &&
      !activeObject.isDescendantOf(target) &&
      //  target accepts selection
      !target.onSelect({ e: e })
    );
  }

  /**
   * Handles active selection creation for user event
   * @private
   * @param {TPointerEvent} e Event object
   * @param {FabricObject} target
   */
  _handleGrouping(e: TPointerEvent, target: FabricObject) {
    let groupingTarget: FabricObject | undefined = target;
    // Called always a shouldGroup, meaning that we can trust this._activeObject exists.
    const activeObject = this._activeObject!;
    // avoid multi select when shift click on a corner
    if (activeObject.__corner) {
      return;
    }
    if (groupingTarget === activeObject) {
      // if it's a group, find target again, using activeGroup objects
      groupingTarget = this.findTarget(e, true);
      // if even object is not found or we are on activeObjectCorner, bail out
      if (!groupingTarget || !groupingTarget.selectable) {
        return;
      }
    }
    if (activeObject && activeObject.type === 'activeSelection') {
      this._updateActiveSelection(e, groupingTarget);
    } else {
      this._createActiveSelection(e, groupingTarget);
    }
  }

  /**
   * @private
   */
  _updateActiveSelection(e: TPointerEvent, target: FabricObject) {
    const activeSelection = this._activeObject! as ActiveSelection,
      currentActiveObjects = activeSelection.getObjects();
    if (target.group === activeSelection) {
      activeSelection.remove(target);
      this._hoveredTarget = target;
      this._hoveredTargets = this.targets.concat();
      if (activeSelection.size() === 1) {
        // activate last remaining object
        this._setActiveObject(activeSelection.item(0) as FabricObject, e);
      }
    } else {
      activeSelection.add(target);
      this._hoveredTarget = activeSelection;
      this._hoveredTargets = this.targets.concat();
    }
    this._fireSelectionEvents(currentActiveObjects as FabricObject[], e);
  }

  /**
   * Generates and set as active the active selection from user events
   * @private
   */
  _createActiveSelection(e: TPointerEvent, target: FabricObject) {
    const currentActive = this.getActiveObject()!;
    const groupObjects = target.isInFrontOf(currentActive)
      ? [currentActive, target]
      : [target, currentActive];
    // @ts-ignore
    currentActive.isEditing && currentActive.exitEditing();
    //  handle case: target is nested
    const newActiveSelection = new ActiveSelection(groupObjects, {
      canvas: this,
    });
    this._hoveredTarget = newActiveSelection;
    // ISSUE 4115: should we consider subTargets here?
    // this._hoveredTargets = [];
    // this._hoveredTargets = this.targets.concat();
    this._setActiveObject(newActiveSelection, e);
    this._fireSelectionEvents([currentActive], e);
  }

  /**
   * Finds objects inside the selection rectangle and group them
   * @private
   * @param {Event} e mouse event
   */
  _groupSelectedObjects(e: TPointerEvent) {
    const group = this._collectObjects(e);
    // do not create group for 1 element only
    if (group.length === 1) {
      this.setActiveObject(group[0], e);
    } else if (group.length > 1) {
      const aGroup = new ActiveSelection(group.reverse(), {
        canvas: this,
      });
      this.setActiveObject(aGroup, e);
    }
  }

  /**
   * @private
   */
  _collectObjects(e: TPointerEvent) {
    const group: FabricObject[] = [],
      _groupSelector = this._groupSelector,
      point1 = new Point(_groupSelector.ex, _groupSelector.ey),
      point2 = point1.add(new Point(_groupSelector.left, _groupSelector.top)),
      selectionX1Y1 = point1.min(point2),
      selectionX2Y2 = point1.max(point2),
      allowIntersect = !this.selectionFullyContained,
      isClick = point1.eq(point2);
    // we iterate reverse order to collect top first in case of click.
    for (let i = this._objects.length; i--; ) {
      const currentObject = this._objects[i];

      if (
        !currentObject ||
        !currentObject.selectable ||
        !currentObject.visible
      ) {
        continue;
      }

      if (
        (allowIntersect &&
          currentObject.intersectsWithRect(
            selectionX1Y1,
            selectionX2Y2,
            true
          )) ||
        currentObject.isContainedWithinRect(
          selectionX1Y1,
          selectionX2Y2,
          true
        ) ||
        (allowIntersect &&
          currentObject.containsPoint(selectionX1Y1, undefined, true)) ||
        (allowIntersect &&
          currentObject.containsPoint(selectionX2Y2, undefined, true))
      ) {
        group.push(currentObject);
        // only add one object if it's a click
        if (isClick) {
          break;
        }
      }
    }

    if (group.length > 1) {
      return group.filter((object) => !object.onSelect({ e }));
    }

    return group;
  }

  /**
   * @private
   */
  _maybeGroupObjects(e: TPointerEvent) {
    if (this.selection && this._groupSelector) {
      this._groupSelectedObjects(e);
    }
    this.setCursor(this.defaultCursor);
    // clear selection and current transformation
    this._groupSelector = null;
  }

  exitTextEditing() {
    this.textEditingManager.exitTextEditing();
  }

  /**
   * @override clear {@link textEditingManager}
   */
  clear() {
    this.textEditingManager.dispose();
    super.clear();
  }

  /**
   * @override clear {@link textEditingManager}
   */
  destroy() {
    this.removeListeners();
    super.destroy();
    this.textEditingManager.dispose();
  }
}
