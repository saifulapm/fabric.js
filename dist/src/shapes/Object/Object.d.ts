import type { Eraser } from '../../brushes/Eraser';
import { ObjectEvents } from '../../EventTypeDefs';
import { AnimatableObject } from './AnimatableObject';
import { Point } from '../../Point';
import { Shadow } from '../../Shadow';
import type { TCacheCanvasDimensions, TClassProperties, TDegree, TFiller, TSize } from '../../typedefs';
import type { Group } from '../Group';
import type { Image } from '../Image';
export type TCachedFabricObject = FabricObject & Required<Pick<FabricObject, 'zoomX' | 'zoomY' | '_cacheCanvas' | '_cacheContext' | 'cacheTranslationX' | 'cacheTranslationY'>> & {
    _cacheContext: CanvasRenderingContext2D;
};
/**
 * Root object class from which all 2d shape classes inherit from
 * @tutorial {@link http://fabricjs.com/fabric-intro-part-1#objects}
 *
 * @fires added
 * @fires removed
 *
 * @fires selected
 * @fires deselected
 *
 * @fires rotating
 * @fires scaling
 * @fires moving
 * @fires skewing
 * @fires modified
 *
 * @fires mousedown
 * @fires mouseup
 * @fires mouseover
 * @fires mouseout
 * @fires mousewheel
 * @fires mousedblclick
 *
 * @fires dragover
 * @fires dragenter
 * @fires dragleave
 * @fires drop
 *
 * @fires erasing:end
 */
export declare class FabricObject<EventSpec extends ObjectEvents = ObjectEvents> extends AnimatableObject<EventSpec> {
    type: string;
    /**
     * Opacity of an object
     * @type Number
     * @default 1
     */
    opacity: number;
    /**
     * Size of object's controlling corners (in pixels)
     * @type Number
     * @default 13
     */
    cornerSize: number;
    /**
     * Size of object's controlling corners when touch interaction is detected
     * @type Number
     * @default 24
     */
    touchCornerSize: number;
    /**
     * When true, object's controlling corners are rendered as transparent inside (i.e. stroke instead of fill)
     * @type Boolean
     * @default true
     */
    transparentCorners: boolean;
    /**
     * Default cursor value used when hovering over this object on canvas
     * @type CSSStyleDeclaration['cursor'] | null
     * @default null
     */
    hoverCursor: CSSStyleDeclaration['cursor'] | null;
    /**
     * Default cursor value used when moving this object on canvas
     * @type CSSStyleDeclaration['cursor'] | null
     * @default null
     */
    moveCursor: CSSStyleDeclaration['cursor'] | null;
    /**
     * Color of controlling borders of an object (when it's active)
     * @type String
     * @default rgb(178,204,255)
     */
    borderColor: string;
    /**
     * Array specifying dash pattern of an object's borders (hasBorder must be true)
     * @since 1.6.2
     * @type Array | null
     * default null;
     */
    borderDashArray: number[] | null;
    /**
     * Color of controlling corners of an object (when it's active)
     * @type String
     * @default rgb(178,204,255)
     */
    cornerColor: string;
    /**
     * Color of controlling corners of an object (when it's active and transparentCorners false)
     * @since 1.6.2
     * @type String
     * @default null
     */
    cornerStrokeColor: string;
    /**
     * Specify style of control, 'rect' or 'circle'
     * This is deprecated. In the futuer there will be a standard control render
     * And you can swap it with one of the alternative proposed with the control api
     * @since 1.6.2
     * @type 'rect' | 'circle'
     * @default rect
     * @deprecated
     */
    cornerStyle: 'rect' | 'circle';
    /**
     * Array specifying dash pattern of an object's control (hasBorder must be true)
     * @since 1.6.2
     * @type Array | null
     */
    cornerDashArray: number[] | null;
    /**
     * When true, this object will use center point as the origin of transformation
     * when being scaled via the controls.
     * <b>Backwards incompatibility note:</b> This property replaces "centerTransform" (Boolean).
     * @since 1.3.4
     * @type Boolean
     * @default
     */
    centeredScaling: false;
    /**
     * When true, this object will use center point as the origin of transformation
     * when being rotated via the controls.
     * <b>Backwards incompatibility note:</b> This property replaces "centerTransform" (Boolean).
     * @since 1.3.4
     * @type Boolean
     * @default
     */
    centeredRotation: true;
    /**
     * When defined, an object is rendered via stroke and this property specifies its color
     * takes css colors https://www.w3.org/TR/css-color-3/
     * @type String
     * @default null
     */
    stroke: string | TFiller | null;
    /**
     * Color of object's fill
     * takes css colors https://www.w3.org/TR/css-color-3/
     * @type String
     * @default rgb(0,0,0)
     */
    fill: string | TFiller | null;
    /**
     * Fill rule used to fill an object
     * accepted values are nonzero, evenodd
     * <b>Backwards incompatibility note:</b> This property was used for setting globalCompositeOperation until v1.4.12 (use `globalCompositeOperation` instead)
     * @type String
     * @default nonzero
     */
    fillRule: CanvasFillRule;
    /**
     * Composite rule used for canvas globalCompositeOperation
     * @type String
     * @default
     */
    globalCompositeOperation: GlobalCompositeOperation;
    /**
     * Background color of an object.
     * takes css colors https://www.w3.org/TR/css-color-3/
     * @type String
     * @default
     */
    backgroundColor: string;
    /**
     * Selection Background color of an object. colored layer behind the object when it is active.
     * does not mix good with globalCompositeOperation methods.
     * @type String
     * @deprecated
     * @default
     */
    selectionBackgroundColor: string;
    /**
     * Array specifying dash pattern of an object's stroke (stroke must be defined)
     * @type Array
     * @default null;
     */
    strokeDashArray: number[] | null;
    /**
     * Line offset of an object's stroke
     * @type Number
     * @default 0
     */
    strokeDashOffset: number;
    /**
     * Line endings style of an object's stroke (one of "butt", "round", "square")
     * @type String
     * @default butt
     */
    strokeLineCap: CanvasLineCap;
    /**
     * Corner style of an object's stroke (one of "bevel", "round", "miter")
     * @type String
     * @default
     */
    strokeLineJoin: CanvasLineJoin;
    /**
     * Maximum miter length (used for strokeLineJoin = "miter") of an object's stroke
     * @type Number
     * @default 4
     */
    strokeMiterLimit: number;
    /**
     * Shadow object representing shadow of this shape
     * @type Shadow
     * @default null
     */
    shadow: Shadow | null;
    /**
     * Indicates whether this object can be erased by the {@link EraserBrush}
     * @tutorial {@link http://fabricjs.com/erasing#erasable_property}
     * @type boolean
     * @default true
     */
    erasable: boolean | 'deep';
    /**
     * @tutorial {@link http://fabricjs.com/erasing#eraser}
     */
    eraser?: Eraser;
    /**
     * Opacity of object's controlling borders when object is active and moving
     * @type Number
     * @default 0.4
     */
    borderOpacityWhenMoving: number;
    /**
     * Scale factor of object's controlling borders
     * bigger number will make a thicker border
     * border is 1, so this is basically a border thickness
     * since there is no way to change the border itself.
     * @type Number
     * @default 1
     */
    borderScaleFactor: number;
    /**
     * Minimum allowed scale value of an object
     * @type Number
     * @default 0
     */
    minScaleLimit: number;
    /**
     * When set to `false`, an object can not be selected for modification (using either point-click-based or group-based selection).
     * But events still fire on it.
     * @type Boolean
     * @default
     */
    selectable: boolean;
    /**
     * When set to `false`, an object can not be a target of events. All events propagate through it. Introduced in v1.3.4
     * @type Boolean
     * @default
     */
    evented: boolean;
    /**
     * When set to `false`, an object is not rendered on canvas
     * @type Boolean
     * @default
     */
    visible: boolean;
    /**
     * When set to `false`, object's controls are not displayed and can not be used to manipulate object
     * @type Boolean
     * @default
     */
    hasControls: boolean;
    /**
     * When set to `false`, object's controlling borders are not rendered
     * @type Boolean
     * @default
     */
    hasBorders: boolean;
    /**
     * When set to `true`, objects are "found" on canvas on per-pixel basis rather than according to bounding box
     * @type Boolean
     * @default
     */
    perPixelTargetFind: boolean;
    /**
     * When `false`, default object's values are not included in its serialization
     * @type Boolean
     * @default
     */
    includeDefaultValues: boolean;
    /**
     * When `true`, object horizontal movement is locked
     * @type Boolean
     * @default
     */
    lockMovementX: boolean;
    /**
     * When `true`, object vertical movement is locked
     * @type Boolean
     * @default
     */
    lockMovementY: boolean;
    /**
     * When `true`, object rotation is locked
     * @type Boolean
     * @default
     */
    lockRotation: boolean;
    /**
     * When `true`, object horizontal scaling is locked
     * @type Boolean
     * @default
     */
    lockScalingX: boolean;
    /**
     * When `true`, object vertical scaling is locked
     * @type Boolean
     * @default
     */
    lockScalingY: boolean;
    /**
     * When `true`, object horizontal skewing is locked
     * @type Boolean
     * @default
     */
    lockSkewingX: boolean;
    /**
     * When `true`, object vertical skewing is locked
     * @type Boolean
     * @default
     */
    lockSkewingY: boolean;
    /**
     * When `true`, object cannot be flipped by scaling into negative values
     * @type Boolean
     * @default
     */
    lockScalingFlip: boolean;
    /**
     * When `true`, object is not exported in OBJECT/JSON
     * @since 1.6.3
     * @type Boolean
     * @default
     */
    excludeFromExport: boolean;
    /**
     * When `true`, object is cached on an additional canvas.
     * When `false`, object is not cached unless necessary ( clipPath )
     * default to true
     * @since 1.7.0
     * @type Boolean
     * @default true
     */
    objectCaching: boolean;
    /**
     * When set to `true`, object's cache will be rerendered next render call.
     * since 1.7.0
     * @type Boolean
     * @default true
     */
    dirty: boolean;
    /**
     * Determines if the fill or the stroke is drawn first (one of "fill" or "stroke")
     * @type String
     * @default
     */
    paintFirst: 'fill' | 'stroke';
    /**
     * When 'down', object is set to active on mousedown/touchstart
     * When 'up', object is set to active on mouseup/touchend
     * Experimental. Let's see if this breaks anything before supporting officially
     * @private
     * since 4.4.0
     * @type String
     * @default 'down'
     */
    activeOn: 'down' | 'up';
    /**
     * This list of properties is used to check if the state of an object is changed.
     * This state change now is only used for children of groups to understand if a group
     * needs its cache regenerated during a .set call
     * @type Array
     */
    stateProperties: string[];
    /**
     * List of properties to consider when checking if cache needs refresh
     * Those properties are checked by
     * calls to Object.set(key, value). If the key is in this list, the object is marked as dirty
     * and refreshed at the next render
     * @type Array
     */
    cacheProperties: string[];
    /**
     * a fabricObject that, without stroke define a clipping area with their shape. filled in black
     * the clipPath object gets used when the object has rendered, and the context is placed in the center
     * of the object cacheCanvas.
     * If you want 0,0 of a clipPath to align with an object center, use clipPath.originX/Y to 'center'
     * @type FabricObject
     */
    clipPath?: FabricObject;
    /**
     * Meaningful ONLY when the object is used as clipPath.
     * if true, the clipPath will make the object clip to the outside of the clipPath
     * since 2.4.0
     * @type boolean
     * @default false
     */
    inverted: boolean;
    /**
     * Meaningful ONLY when the object is used as clipPath.
     * if true, the clipPath will have its top and left relative to canvas, and will
     * not be influenced by the object transform. This will make the clipPath relative
     * to the canvas, but clipping just a particular object.
     * WARNING this is beta, this feature may change or be renamed.
     * since 2.4.0
     * @type boolean
     * @default false
     */
    absolutePositioned: boolean;
    /**
     * Quick access for the _cacheCanvas rendering context
     * This is part of the objectCaching feature
     * since 1.7.0
     * @type boolean
     * @default undefined
     * @private
     */
    _cacheContext: CanvasRenderingContext2D | null;
    /**
     * A reference to the HTMLCanvasElement that is used to contain the cache of the object
     * this canvas element is resized and cleared as needed
     * Is marked private, you can read it, don't use it since it is handled by fabric
     * since 1.7.0
     * @type HTMLCanvasElement
     * @default undefined
     * @private
     */
    _cacheCanvas?: HTMLCanvasElement;
    /**
     * Size of the cache canvas, width
     * since 1.7.0
     * @type number
     * @default undefined
     * @private
     */
    cacheWidth?: number;
    /**
     * Size of the cache canvas, height
     * since 1.7.0
     * @type number
     * @default undefined
     * @private
     */
    cacheHeight?: number;
    /**
     * zoom level used on the cacheCanvas to draw the cache, X axe
     * since 1.7.0
     * @type number
     * @default undefined
     * @private
     */
    zoomX?: number;
    /**
     * zoom level used on the cacheCanvas to draw the cache, Y axe
     * since 1.7.0
     * @type number
     * @default undefined
     * @private
     */
    zoomY?: number;
    /**
     * zoom level used on the cacheCanvas to draw the cache, Y axe
     * since 1.7.0
     * @type number
     * @default undefined
     * @private
     */
    cacheTranslationX?: number;
    /**
     * translation of the cacheCanvas away from the center, for subpixel accuracy and crispness
     * since 1.7.0
     * @type number
     * @default undefined
     * @private
     */
    cacheTranslationY?: number;
    /**
     * A reference to the parent of the object, usually a Group
     * @type number
     * @default undefined
     * @private
     */
    group?: Group;
    /**
     * A reference to the parent of the object
     * Used to keep the original parent ref when the object has been added to an ActiveSelection, hence loosing the `group` ref
     */
    __owningGroup?: Group;
    /**
     * Indicate if the object is sitting on a cache dedicated to it
     * or is part of a larger cache for many object ( a group for example)
     * @type number
     * @default undefined
     * @private
     */
    ownCaching?: boolean;
    /**
     * Private. indicates if the object inside a group is on a transformed context or not
     * or is part of a larger cache for many object ( a group for example)
     * @type boolean
     * @default undefined
     * @private
     */
    _transformDone?: boolean;
    /**
     * Constructor
     * @param {Object} [options] Options object
     */
    constructor(options?: Partial<TClassProperties<FabricObject>>);
    /**
     * Create a the canvas used to keep the cached copy of the object
     * @private
     */
    _createCacheCanvas(): void;
    /**
     * Limit the cache dimensions so that X * Y do not cross config.perfLimitSizeTotal
     * and each side do not cross fabric.cacheSideLimit
     * those numbers are configurable so that you can get as much detail as you want
     * making bargain with performances.
     * @param {Object} dims
     * @param {Object} dims.width width of canvas
     * @param {Object} dims.height height of canvas
     * @param {Object} dims.zoomX zoomX zoom value to unscale the canvas before drawing cache
     * @param {Object} dims.zoomY zoomY zoom value to unscale the canvas before drawing cache
     * @return {Object}.width width of canvas
     * @return {Object}.height height of canvas
     * @return {Object}.zoomX zoomX zoom value to unscale the canvas before drawing cache
     * @return {Object}.zoomY zoomY zoom value to unscale the canvas before drawing cache
     */
    _limitCacheSize(dims: TSize & {
        zoomX: number;
        zoomY: number;
        capped: boolean;
    } & any): any;
    /**
     * Return the dimension and the zoom level needed to create a cache canvas
     * big enough to host the object to be cached.
     * @private
     * @return {Object}.x width of object to be cached
     * @return {Object}.y height of object to be cached
     * @return {Object}.width width of canvas
     * @return {Object}.height height of canvas
     * @return {Object}.zoomX zoomX zoom value to unscale the canvas before drawing cache
     * @return {Object}.zoomY zoomY zoom value to unscale the canvas before drawing cache
     */
    _getCacheCanvasDimensions(): TCacheCanvasDimensions;
    /**
     * Update width and height of the canvas for cache
     * returns true or false if canvas needed resize.
     * @private
     * @return {Boolean} true if the canvas has been resized
     */
    _updateCacheCanvas(): boolean;
    /**
     * Sets object's properties from options, for class constructor only.
     * Needs to be overridden for different defaults.
     * @protected
     * @param {Object} [options] Options object
     */
    protected setOptions(options?: Record<string, any>): void;
    /**
     * Transforms context when rendering an object
     * @param {CanvasRenderingContext2D} ctx Context
     */
    transform(ctx: CanvasRenderingContext2D): void;
    /**
     * Returns an object representation of an instance
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} Object representation of an instance
     */
    toObject(propertiesToInclude?: string[]): Record<string, any>;
    /**
     * Returns (dataless) object representation of an instance
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} Object representation of an instance
     */
    toDatalessObject(propertiesToInclude?: string[]): Record<string, any>;
    /**
     * @private
     * @param {Object} object
     */
    _removeDefaultValues(object: Record<string, any>): Record<string, any>;
    /**
     * Returns a string representation of an instance
     * @return {String}
     */
    toString(): string;
    /**
     * Return the object scale factor counting also the group scaling
     * @return {Point}
     */
    getObjectScaling(): Point;
    /**
     * Return the object scale factor counting also the group scaling, zoom and retina
     * @return {Object} object with scaleX and scaleY properties
     */
    getTotalObjectScaling(): Point;
    /**
     * Return the object opacity counting also the group property
     * @return {Number}
     */
    getObjectOpacity(): number;
    /**
     * Makes sure the scale is valid and modifies it if necessary
     * @todo: this is a control action issue, not a geometry one
     * @private
     * @param {Number} value, unconstrained
     * @return {Number} constrained value;
     */
    _constrainScale(value: number): number;
    /**
     * @private
     * @param {String} key
     * @param {*} value
     */
    _set(key: string, value: any): this;
    isNotVisible(): boolean;
    /**
     * Renders an object on a specified context
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    render(ctx: CanvasRenderingContext2D): void;
    drawSelectionBackground(ctx: CanvasRenderingContext2D): void;
    renderCache(options?: any): void;
    /**
     * Remove cacheCanvas and its dimensions from the objects
     */
    _removeCacheCanvas(): void;
    /**
     * return true if the object will draw a stroke
     * Does not consider text styles. This is just a shortcut used at rendering time
     * We want it to be an approximation and be fast.
     * wrote to avoid extra caching, it has to return true when stroke happens,
     * can guess when it will not happen at 100% chance, does not matter if it misses
     * some use case where the stroke is invisible.
     * @since 3.0.0
     * @returns Boolean
     */
    hasStroke(): boolean | "" | null;
    /**
     * return true if the object will draw a fill
     * Does not consider text styles. This is just a shortcut used at rendering time
     * We want it to be an approximation and be fast.
     * wrote to avoid extra caching, it has to return true when fill happens,
     * can guess when it will not happen at 100% chance, does not matter if it misses
     * some use case where the fill is invisible.
     * @since 3.0.0
     * @returns Boolean
     */
    hasFill(): boolean | "" | null;
    /**
     * When set to `true`, force the object to have its own cache, even if it is inside a group
     * it may be needed when your object behave in a particular way on the cache and always needs
     * its own isolated canvas to render correctly.
     * Created to be overridden
     * since 1.7.12
     * @returns Boolean
     */
    needsItsOwnCache(): boolean;
    /**
     * Decide if the object should cache or not. Create its own cache level
     * objectCaching is a global flag, wins over everything
     * needsItsOwnCache should be used when the object drawing method requires
     * a cache step. None of the fabric classes requires it.
     * Generally you do not cache objects in groups because the group outside is cached.
     * Read as: cache if is needed, or if the feature is enabled but we are not already caching.
     * @return {Boolean}
     */
    shouldCache(): boolean;
    /**
     * Check if this object or a child object will cast a shadow
     * used by Group.shouldCache to know if child has a shadow recursively
     * @return {Boolean}
     * @deprecated
     */
    willDrawShadow(): boolean;
    /**
     * Execute the drawing operation for an object clipPath
     * @param {CanvasRenderingContext2D} ctx Context to render on
     * @param {FabricObject} clipPath
     */
    drawClipPathOnCache(ctx: CanvasRenderingContext2D, clipPath: TCachedFabricObject): void;
    /**
     * Execute the drawing operation for an object on a specified context
     * @param {CanvasRenderingContext2D} ctx Context to render on
     * @param {boolean} forClipping apply clipping styles
     */
    drawObject(ctx: CanvasRenderingContext2D, forClipping?: boolean): void;
    protected drawEraser(ctx: CanvasRenderingContext2D): void;
    /**
     * Prepare clipPath state and cache and draw it on instance's cache
     * @param {CanvasRenderingContext2D} ctx
     * @param {FabricObject} clipPath
     */
    _drawClipPath(ctx: CanvasRenderingContext2D, clipPath?: FabricObject): void;
    /**
     * Paint the cached copy of the object on the target context.
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    drawCacheOnCanvas(this: TCachedFabricObject, ctx: CanvasRenderingContext2D): void;
    /**
     * Check if cache is dirty
     * @param {Boolean} skipCanvas skip canvas checks because this object is painted
     * on parent canvas.
     */
    isCacheDirty(skipCanvas?: boolean): boolean;
    /**
     * Draws a background for the object big as its untransformed dimensions
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _renderBackground(ctx: CanvasRenderingContext2D): void;
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _setOpacity(ctx: CanvasRenderingContext2D): void;
    _setStrokeStyles(ctx: CanvasRenderingContext2D, decl: Pick<this, 'stroke' | 'strokeWidth' | 'strokeLineCap' | 'strokeDashOffset' | 'strokeLineJoin' | 'strokeMiterLimit'>): void;
    _setFillStyles(ctx: CanvasRenderingContext2D, { fill }: Pick<this, 'fill'>): void;
    _setClippingProperties(ctx: CanvasRenderingContext2D): void;
    /**
     * @private
     * Sets line dash
     * @param {CanvasRenderingContext2D} ctx Context to set the dash line on
     * @param {Array} dashArray array representing dashes
     */
    _setLineDash(ctx: CanvasRenderingContext2D, dashArray?: number[] | null): void;
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _setShadow(ctx: CanvasRenderingContext2D): void;
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _removeShadow(ctx: CanvasRenderingContext2D): void;
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     * @param {TFiller} filler {@link Pattern} or {@link Gradient}
     */
    _applyPatternGradientTransform(ctx: CanvasRenderingContext2D, filler: TFiller): {
        offsetX: number;
        offsetY: number;
    };
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _renderPaintInOrder(ctx: CanvasRenderingContext2D): void;
    /**
     * @private
     * function that actually render something on the context.
     * empty here to allow Obects to work on tests to benchmark fabric functionalites
     * not related to rendering
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _render(ctx: CanvasRenderingContext2D): void;
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _renderFill(ctx: CanvasRenderingContext2D): void;
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _renderStroke(ctx: CanvasRenderingContext2D): void;
    /**
     * This function try to patch the missing gradientTransform on canvas gradients.
     * transforming a context to transform the gradient, is going to transform the stroke too.
     * we want to transform the gradient but not the stroke operation, so we create
     * a transformed gradient on a pattern and then we use the pattern instead of the gradient.
     * this method has drawbacks: is slow, is in low resolution, needs a patch for when the size
     * is limited.
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     * @param {Gradient} filler
     */
    _applyPatternForTransformedGradient(ctx: CanvasRenderingContext2D, filler: TFiller): void;
    /**
     * This function is an helper for svg import. it returns the center of the object in the svg
     * untransformed coordinates
     * @private
     * @return {Point} center point from element coordinates
     */
    _findCenterFromElement(): Point;
    /**
     * Clones an instance.
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @returns {Promise<FabricObject>}
     */
    clone(propertiesToInclude?: string[]): Promise<this>;
    /**
     * Creates an instance of Image out of an object
     * makes use of toCanvasElement.
     * Once this method was based on toDataUrl and loadImage, so it also had a quality
     * and format option. toCanvasElement is faster and produce no loss of quality.
     * If you need to get a real Jpeg or Png from an object, using toDataURL is the right way to do it.
     * toCanvasElement and then toBlob from the obtained canvas is also a good option.
     * @todo fix the export type, it could not be Image but the type that getClass return for 'image'.
     * @param {Object} [options] for clone as image, passed to toDataURL
     * @param {Number} [options.multiplier=1] Multiplier to scale by
     * @param {Number} [options.left] Cropping left offset. Introduced in v1.2.14
     * @param {Number} [options.top] Cropping top offset. Introduced in v1.2.14
     * @param {Number} [options.width] Cropping width. Introduced in v1.2.14
     * @param {Number} [options.height] Cropping height. Introduced in v1.2.14
     * @param {Boolean} [options.enableRetinaScaling] Enable retina scaling for clone image. Introduce in 1.6.4
     * @param {Boolean} [options.withoutTransform] Remove current object transform ( no scale , no angle, no flip, no skew ). Introduced in 2.3.4
     * @param {Boolean} [options.withoutShadow] Remove current object shadow. Introduced in 2.4.2
     * @return {Image} Object cloned as image.
     */
    cloneAsImage(options: any): Image;
    /**
     * Converts an object into a HTMLCanvas element
     * @param {Object} options Options object
     * @param {Number} [options.multiplier=1] Multiplier to scale by
     * @param {Number} [options.left] Cropping left offset. Introduced in v1.2.14
     * @param {Number} [options.top] Cropping top offset. Introduced in v1.2.14
     * @param {Number} [options.width] Cropping width. Introduced in v1.2.14
     * @param {Number} [options.height] Cropping height. Introduced in v1.2.14
     * @param {Boolean} [options.enableRetinaScaling] Enable retina scaling for clone image. Introduce in 1.6.4
     * @param {Boolean} [options.withoutTransform] Remove current object transform ( no scale , no angle, no flip, no skew ). Introduced in 2.3.4
     * @param {Boolean} [options.withoutShadow] Remove current object shadow. Introduced in 2.4.2
     * @return {HTMLCanvasElement} Returns DOM element <canvas> with the FabricObject
     */
    toCanvasElement(options?: any): HTMLCanvasElement;
    /**
     * Converts an object into a data-url-like string
     * @param {Object} options Options object
     * @param {String} [options.format=png] The format of the output image. Either "jpeg" or "png"
     * @param {Number} [options.quality=1] Quality level (0..1). Only used for jpeg.
     * @param {Number} [options.multiplier=1] Multiplier to scale by
     * @param {Number} [options.left] Cropping left offset. Introduced in v1.2.14
     * @param {Number} [options.top] Cropping top offset. Introduced in v1.2.14
     * @param {Number} [options.width] Cropping width. Introduced in v1.2.14
     * @param {Number} [options.height] Cropping height. Introduced in v1.2.14
     * @param {Boolean} [options.enableRetinaScaling] Enable retina scaling for clone image. Introduce in 1.6.4
     * @param {Boolean} [options.withoutTransform] Remove current object transform ( no scale , no angle, no flip, no skew ). Introduced in 2.3.4
     * @param {Boolean} [options.withoutShadow] Remove current object shadow. Introduced in 2.4.2
     * @return {String} Returns a data: URL containing a representation of the object in the format specified by options.format
     */
    toDataURL(options?: any): string;
    /**
     * Returns true if specified type is identical to the type of an instance
     * @param {String} type Type to check against
     * @return {Boolean}
     */
    isType(...types: string[]): boolean;
    /**
     * Returns complexity of an instance
     * @return {Number} complexity of this instance (is 1 unless subclassed)
     */
    complexity(): number;
    /**
     * Returns a JSON representation of an instance
     * @return {Object} JSON
     */
    toJSON(): Record<string, any>;
    /**
     * Sets "angle" of an instance with centered rotation
     * @param {TDegree} angle Angle value (in degrees)
     */
    rotate(angle: TDegree): void;
    /**
     * This callback function is called by the parent group of an object every
     * time a non-delegated property changes on the group. It is passed the key
     * and value as parameters. Not adding in this function's signature to avoid
     * Travis build error about unused variables.
     */
    setOnGroup(): void;
    /**
     * Sets canvas globalCompositeOperation for specific object
     * custom composition operation for the particular object can be specified using globalCompositeOperation property
     * @param {CanvasRenderingContext2D} ctx Rendering canvas context
     */
    _setupCompositeOperation(ctx: CanvasRenderingContext2D): void;
    /**
     * cancel instance's running animations
     * override if necessary to dispose artifacts such as `clipPath`
     */
    dispose(): void;
    /**
     *
     * @param {Function} klass
     * @param {object} object
     * @param {object} [options]
     * @param {string} [options.extraParam] property to pass as first argument to the constructor
     * @param {AbortSignal} [options.signal] handle aborting, see https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal
     * @returns {Promise<FabricObject>}
     */
    static _fromObject(object: Record<string, unknown>, { extraParam, ...options }?: {
        extraParam?: string;
        signal?: AbortSignal;
    }): Promise<FabricObject>;
    /**
     *
     * @param {object} object
     * @param {object} [options]
     * @param {AbortSignal} [options.signal] handle aborting, see https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal
     * @returns {Promise<FabricObject>}
     */
    static fromObject(object: Record<string, unknown>, options?: {
        signal?: AbortSignal;
    }): Promise<FabricObject>;
}
//# sourceMappingURL=Object.d.ts.map