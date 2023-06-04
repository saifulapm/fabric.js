import { CanvasEvents, DragEventData, ObjectEvents, TPointerEvent, TPointerEventInfo, TPointerEventNames, Transform } from '../EventTypeDefs';
import { TFabricEvent } from '../FabricEvent';
import { Point } from '../Point';
import type { FabricObject } from '../shapes/Object/FabricObject';
import { TSize } from '../typedefs';
import { SelectableCanvas } from './SelectableCanvas';
import { TCanvasSizeOptions } from './StaticCanvas';
import { TextEditingManager } from './TextEditingManager';
type TSyntheticEventContext = {
    mouse: {
        e: TPointerEvent;
    };
    drag: DragEventData;
};
export declare class Canvas extends SelectableCanvas {
    /**
     * Contains the id of the touch event that owns the fabric transform
     * @type Number
     * @private
     */
    mainTouchId: null | number;
    /**
     * When the option is enabled, PointerEvent is used instead of TPointerEvent.
     * @type Boolean
     * @default
     */
    enablePointerEvents: boolean;
    /**
     * Holds a reference to a setTimeout timer for event synchronization
     * @type number
     * @private
     */
    private _willAddMouseDown;
    /**
     * Holds a reference to an object on the canvas that is receiving the drag over event.
     * @type FabricObject
     * @private
     */
    private _draggedoverTarget?;
    /**
     * Holds a reference to an object on the canvas from where the drag operation started
     * @type FabricObject
     * @private
     */
    private _dragSource?;
    /**
     * Holds a reference to an object on the canvas that is the current drop target
     * May differ from {@link _draggedoverTarget}
     * @todo inspect whether {@link _draggedoverTarget} and {@link _dropTarget} should be merged somehow
     * @type FabricObject
     * @private
     */
    private _dropTarget;
    currentTarget?: FabricObject;
    currentSubTargets?: FabricObject[];
    private _isClick;
    textEditingManager: TextEditingManager;
    constructor(el: string | HTMLCanvasElement, options?: {});
    protected _setDimensionsImpl(dimensions: TSize, options?: TCanvasSizeOptions): void;
    /**
     * return an event prefix pointer or mouse.
     * @private
     */
    private _getEventPrefix;
    addOrRemove(functor: any, eventjsFunctor: 'add' | 'remove'): void;
    /**
     * Removes all event listeners
     */
    removeListeners(): void;
    /**
     * @private
     * @param {Event} [e] Event object fired on wheel event
     */
    private _onMouseWheel;
    /**
     * @private
     * @param {Event} e Event object fired on mousedown
     */
    private _onMouseOut;
    /**
     * @private
     * @param {Event} e Event object fired on mouseenter
     */
    private _onMouseEnter;
    /**
     * supports native like text dragging
     * @private
     * @param {DragEvent} e
     */
    private _onDragStart;
    /**
     * First we clear top context where the effects are being rendered.
     * Then we render the effects.
     * Doing so will render the correct effect for all cases including an overlap between `source` and `target`.
     * @private
     */
    private _renderDragEffects;
    /**
     * supports native like text dragging
     * https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#finishing_a_drag
     * @private
     * @param {DragEvent} e
     */
    private _onDragEnd;
    /**
     * fire `drag` event on canvas and drag source
     * @private
     * @param {DragEvent} e
     */
    private _onDragProgress;
    /**
     * As opposed to {@link findTarget} we want the top most object to be returned w/o the active object cutting in line.
     * Override at will
     */
    protected findDragTargets(e: DragEvent): {
        target: FabricObject<ObjectEvents> | undefined;
        targets: FabricObject<ObjectEvents>[];
    };
    /**
     * prevent default to allow drop event to be fired
     * https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#specifying_drop_targets
     * @private
     * @param {DragEvent} [e] Event object fired on Event.js shake
     */
    private _onDragOver;
    /**
     * fire `dragleave` on `dragover` targets
     * @private
     * @param {Event} [e] Event object fired on Event.js shake
     */
    private _onDragEnter;
    /**
     * fire `dragleave` on `dragover` targets
     * @private
     * @param {Event} [e] Event object fired on Event.js shake
     */
    private _onDragLeave;
    /**
     * `drop:before` is a an event that allows you to schedule logic
     * before the `drop` event. Prefer `drop` event always, but if you need
     * to run some drop-disabling logic on an event, since there is no way
     * to handle event handlers ordering, use `drop:before`
     * @private
     * @param {Event} e
     */
    private _onDrop;
    private _onContextMenu;
    private _onDoubleClick;
    /**
     * Return a the id of an event.
     * returns either the pointerId or the identifier or 0 for the mouse event
     * @private
     * @param {Event} evt Event object
     */
    getPointerId(evt: TouchEvent | PointerEvent): number;
    /**
     * Determines if an event has the id of the event that is considered main
     * @private
     * @param {evt} event Event object
     */
    _isMainEvent(evt: TPointerEvent): boolean;
    /**
     * @private
     * @param {Event} e Event object fired on mousedown
     */
    _onTouchStart(e: TouchEvent): void;
    /**
     * @private
     * @param {Event} e Event object fired on mousedown
     */
    _onMouseDown(e: TPointerEvent): void;
    /**
     * @private
     * @param {Event} e Event object fired on mousedown
     */
    _onTouchEnd(e: TouchEvent): void;
    /**
     * @private
     * @param {Event} e Event object fired on mouseup
     */
    _onMouseUp(e: TPointerEvent): void;
    /**
     * @private
     * @param {Event} e Event object fired on mousemove
     */
    _onMouseMove(e: TPointerEvent): void;
    /**
     * @private
     */
    _onWindowResize(): void;
    /**
     * Decides whether the canvas should be redrawn in mouseup and mousedown events.
     * @private
     * @param {Object} target
     */
    _shouldRender(target: FabricObject | undefined): boolean;
    protected shouldHandleDefaultEvent(e: TPointerEvent, beforeEvent?: TFabricEvent<TPointerEventInfo<TPointerEvent>>): boolean;
    /**
     * Method that defines the actions when mouse is released on canvas.
     * The method resets the currentTransform parameters, store the image corner
     * position in the image object and render the canvas on top.
     * @private
     * @param {Event} e Event object fired on mouseup
     */
    __onMouseUp(e: TPointerEvent): void;
    protected performDefaultUp(e: TPointerEvent): boolean;
    _basicEventHandler<T extends keyof (CanvasEvents | ObjectEvents)>(eventType: T, options: (CanvasEvents & ObjectEvents)[T]): TFabricEvent<CanvasEvents[T] & ObjectEvents[T]>;
    /**
     * @private
     * Handle event firing for target and subtargets
     * @param {Event} e event from mouse
     * @param {String} eventType event to fire (up, down or move)
     * @param {fabric.Object} targetObj receiving event
     * @param {Boolean} isClick for left button only, indicates that the mouse up happened without move.
     */
    _handleEvent(e: TPointerEvent, eventType: TPointerEventNames, isClick?: boolean): TFabricEvent<TPointerEventInfo<TPointerEvent>> | undefined;
    /**
     * End the current transform.
     * You don't usually need to call this method unless you are interrupting a user initiated transform
     * because of some other event ( a press of key combination, or something that block the user UX )
     * @param {Event} [e] send the mouse event that generate the finalize down, so it can be used in the event
     */
    endCurrentTransform(e: TPointerEvent): void;
    /**
     * @private
     * @param {Event} e send the mouse event that generate the finalize down, so it can be used in the event
     */
    _finalizeCurrentTransform(e: TPointerEvent): void;
    /**
     * Method that defines the actions when mouse is clicked on canvas.
     * The method inits the currentTransform parameters and renders all the
     * canvas so the current image can be placed on the top canvas and the rest
     * in on the container one.
     * @private
     * @param {Event} e Event object fired on mousedown
     */
    __onMouseDown(e: TPointerEvent): void;
    protected performDefaultDown(e: TPointerEvent): boolean;
    /**
     * reset cache form common information needed during event processing
     * @private
     */
    _resetTransformEventData(): void;
    /**
     * Cache common information needed during event processing
     * @private
     * @param {Event} e Event object fired on event
     */
    _cacheTransformEventData(e: TPointerEvent): void;
    /**
     * @private
     */
    _beforeTransform(e: TPointerEvent): void;
    /**
     * Method that defines the actions when mouse is hovering the canvas.
     * The currentTransform parameter will define whether the user is rotating/scaling/translating
     * an image or neither of them (only hovering). A group selection is also possible and would cancel
     * all any other type of action.
     * In case of an image transformation only the top canvas will be rendered.
     * @private
     * @param {Event} e Event object fired on mousemove
     */
    __onMouseMove(e: TPointerEvent): void;
    protected performDefaultMove(e: TPointerEvent): void;
    /**
     * Manage the mouseout, mouseover events for the fabric object on the canvas
     * @param {Fabric.Object} target the target where the target from the mousemove event
     * @param {Event} e Event object fired on mousemove
     * @private
     */
    _fireOverOutEvents(e: TPointerEvent, target?: FabricObject): void;
    /**
     * Manage the dragEnter, dragLeave events for the fabric objects on the canvas
     * @param {Fabric.Object} target the target where the target from the onDrag event
     * @param {Object} data Event object fired on dragover
     * @private
     */
    _fireEnterLeaveEvents(target: FabricObject | undefined, data: DragEventData): void;
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
    fireSyntheticInOutEvents<T extends keyof TSyntheticEventContext>(type: T, { target, oldTarget, fireCanvas, e, ...data }: TSyntheticEventContext[T] & {
        target?: FabricObject;
        oldTarget?: FabricObject;
        fireCanvas?: boolean;
    }): void;
    /**
     * Method that defines actions when an Event Mouse Wheel
     * @param {Event} e Event object fired on mouseup
     */
    __onMouseWheel(e: TPointerEvent): void;
    /**
     * @private
     * @param {Event} e Event fired on mousemove
     */
    _transformObject(e: TPointerEvent): void;
    /**
     * @private
     */
    _performTransformAction(e: TPointerEvent, transform: Transform, pointer: Point): void;
    /**
     * Sets the cursor depending on where the canvas is being hovered.
     * Note: very buggy in Opera
     * @param {Event} e Event object
     * @param {Object} target Object that the mouse is hovering, if so.
     */
    _setCursorFromEvent(e: TPointerEvent, target?: FabricObject): void;
    /**
     * Return true if the current mouse event that generated a new selection should generate a group
     * @private
     * @param {TPointerEvent} e Event object
     * @param {FabricObject} target
     * @return {Boolean}
     */
    _shouldGroup(e: TPointerEvent, target?: FabricObject): boolean;
    /**
     * Handles active selection creation for user event
     * @private
     * @param {TPointerEvent} e Event object
     * @param {FabricObject} target
     */
    _handleGrouping(e: TPointerEvent, target: FabricObject): void;
    /**
     * @private
     */
    _updateActiveSelection(e: TPointerEvent, target: FabricObject): void;
    /**
     * Generates and set as active the active selection from user events
     * @private
     */
    _createActiveSelection(e: TPointerEvent, target: FabricObject): void;
    /**
     * Finds objects inside the selection rectangle and group them
     * @private
     * @param {Event} e mouse event
     */
    _groupSelectedObjects(e: TPointerEvent): void;
    /**
     * @private
     */
    _collectObjects(e: TPointerEvent): FabricObject<ObjectEvents>[];
    /**
     * @private
     */
    _maybeGroupObjects(e: TPointerEvent): void;
    exitTextEditing(): void;
    /**
     * @override clear {@link textEditingManager}
     */
    clear(): void;
    /**
     * @override clear {@link textEditingManager}
     */
    destroy(): void;
}
export {};
//# sourceMappingURL=Canvas.d.ts.map