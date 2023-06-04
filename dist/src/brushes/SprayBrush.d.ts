import type { Canvas } from '../canvas/Canvas';
import { TPointerEventInfo } from '../EventTypeDefs';
import { TFabricEvent } from '../FabricEvent';
import { Point } from '../Point';
import { Group } from '../shapes/Group';
import { SimpleBrush } from './SimpleBrush';
export type SprayBrushPoint = {
    x: number;
    y: number;
    width: number;
    opacity: number;
};
export declare class SprayBrush extends SimpleBrush<Group> {
    /**
     * Width of a spray
     * @type Number
     * @default
     */
    width: number;
    /**
     * Density of a spray (number of dots per chunk)
     * @type Number
     * @default
     */
    density: number;
    /**
     * Width of spray dots
     * @type Number
     * @default
     */
    dotWidth: number;
    /**
     * Width variance of spray dots
     * @type Number
     * @default
     */
    dotWidthVariance: number;
    /**
     * Whether opacity of a dot should be random
     * @type Boolean
     * @default
     */
    randomOpacity: boolean;
    /**
     * Whether overlapping dots (rectangles) should be removed (for performance reasons)
     * @type Boolean
     * @default
     */
    optimizeOverlapping: boolean;
    private sprayChunks;
    private sprayChunk;
    /**
     * Constructor
     * @param {Canvas} canvas
     * @return {SprayBrush} Instance of a spray brush
     */
    constructor(canvas: Canvas);
    protected _setBrushStyles(ctx?: CanvasRenderingContext2D): void;
    protected finalizeShape(): Group;
    down(ev: TFabricEvent<TPointerEventInfo>): void;
    move(ev: TFabricEvent<TPointerEventInfo>): void;
    up(ev: TFabricEvent<TPointerEventInfo>): void;
    protected drawChunk(ctx: CanvasRenderingContext2D, sprayChunk: SprayBrushPoint[]): void;
    protected renderChunk(sprayChunk: SprayBrushPoint[]): void;
    /**
     * Render all spray chunks
     */
    protected _render(ctx: CanvasRenderingContext2D): void;
    /**
     * @param {Point} pointer
     */
    addSprayChunk(pointer: Point): void;
}
//# sourceMappingURL=SprayBrush.d.ts.map