import type { Canvas } from '../canvas/Canvas';
import { CanvasEvents, TEvent } from '../EventTypeDefs';
import { Observable } from '../Observable';
import type { Point } from '../Point';
import { Shadow } from '../Shadow';
import type { FabricObject } from '../shapes/Object/FabricObject';
export type TBrushEventData = TEvent & {
    pointer: Point;
};
/**
 * @see {@link http://fabricjs.com/freedrawing|Freedrawing demo}
 */
export declare abstract class BaseBrush<T extends FabricObject = FabricObject, EventSpec extends CanvasEvents = CanvasEvents> extends Observable<EventSpec> {
    /**
     * Color of a brush
     * @type String
     * @default
     */
    color: string;
    /**
     * Width of a brush, has to be a Number, no string literals
     * @type Number
     * @default
     */
    width: number;
    /**
     * Shadow object representing shadow of this shape.
     * <b>Backwards incompatibility note:</b> This property replaces "shadowColor" (String), "shadowOffsetX" (Number),
     * "shadowOffsetY" (Number) and "shadowBlur" (Number) since v1.2.12
     * @type Shadow
     * @default
     */
    shadow: Shadow | null;
    /**
     * Line endings style of a brush (one of "butt", "round", "square")
     * @type String
     * @default
     */
    strokeLineCap: CanvasLineCap;
    /**
     * Corner style of a brush (one of "bevel", "round", "miter")
     * @type String
     * @default
     */
    strokeLineJoin: CanvasLineJoin;
    /**
     * Maximum miter length (used for strokeLineJoin = "miter") of a brush's
     * @type Number
     * @default
     */
    strokeMiterLimit: number;
    /**
     * Stroke Dash Array.
     * @type Array
     * @default
     */
    strokeDashArray: number[] | null;
    /**
     * Same as FabricObject `clipPath` property.
     * The clip path is positioned relative to the top left corner of the viewport.
     * The `absolutePositioned` property renders the clip path w/o viewport transform.
     * The clip path is prone to the `setCoords` gotcha.
     */
    clipPath?: FabricObject;
    /**
     * Cursor value used during free drawing
     * @type String
     * @default crosshair
     */
    cursor: CSSStyleDeclaration['cursor'];
    readonly canvas: Canvas;
    active: boolean;
    enabled: boolean;
    private _disposer?;
    constructor(canvas: Canvas);
    /**
     * This method wires the internal lifecycle to canvas events,
     * making it very easy to change the hooks that the brush responds to.
     * @returns an array of disposers
     */
    protected subscribe(): VoidFunction[];
    protected unsubscribe(): void;
    enable(): void;
    disable(): void;
    protected abstract _render(ctx: CanvasRenderingContext2D): void;
    protected abstract finalizeShape(): T | undefined;
    protected start(): void;
    /**
     * Sets brush styles
     * @private
     * @param {CanvasRenderingContext2D} ctx
     */
    protected _setBrushStyles(ctx?: CanvasRenderingContext2D): void;
    transform(ctx: CanvasRenderingContext2D): void;
    protected needsFullRender(): boolean | undefined;
    /**
     * Sets brush shadow styles
     * @private
     */
    protected _setShadow(): void;
    /**
     * Removes brush shadow styles
     * @private
     */
    protected _resetShadow(ctx?: CanvasRenderingContext2D): void;
    /**
     * Check is pointer is outside canvas boundaries
     * @param {Object} pointer
     * @private
     */
    protected _isOutSideCanvas(pointer: Point): boolean;
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx
     * @param {FabricObject} clipPath
     */
    private drawClipPathOnCache;
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx
     * @param {FabricObject} clipPath
     */
    protected _drawClipPath(ctx: CanvasRenderingContext2D, clipPath?: FabricObject): void;
    /**
     * clones the brush's clip path and prepares it for the resulting object
     */
    protected createClipPath(result: FabricObject): Promise<FabricObject<import("../EventTypeDefs").ObjectEvents> | undefined>;
    /**
     * Render the full state of the brush
     */
    render(ctx?: CanvasRenderingContext2D): void;
    protected onEnd(result?: T): void;
    protected finalize(): Promise<void>;
}
//# sourceMappingURL=BaseBrush.d.ts.map