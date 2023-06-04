import type { Canvas } from '../canvas/Canvas';
import { TPointerEventInfo } from '../EventTypeDefs';
import { TFabricEvent } from '../FabricEvent';
import { Point } from '../Point';
import { Group } from '../shapes/Group';
import type { FabricObject } from '../shapes/Object/FabricObject';
import { SimpleBrush } from './SimpleBrush';
export type CircleBrushPoint = {
    x: number;
    y: number;
    radius: number;
    fill: string;
};
export declare class CircleBrush extends SimpleBrush<FabricObject> {
    /**
     * Width of a brush
     * @type Number
     * @default
     */
    width: number;
    points: CircleBrushPoint[];
    constructor(canvas: Canvas);
    /**
     * @param {Object} pointer
     * @return {Point} Just added pointer point
     */
    addPoint({ x, y }: Point): CircleBrushPoint;
    /**
     * Invoked inside on mouse down and mouse move
     * @param {Point} pointer
     */
    drawDot(pointer: Point): void;
    dot(ctx: CanvasRenderingContext2D, point: CircleBrushPoint): void;
    protected finalizeShape(): Group;
    down(ev: TFabricEvent<TPointerEventInfo>): void;
    protected _render(ctx: CanvasRenderingContext2D): void;
    move(ev: TFabricEvent<TPointerEventInfo>): void;
    up(ev: TFabricEvent<TPointerEventInfo>): void;
}
//# sourceMappingURL=CircleBrush.d.ts.map