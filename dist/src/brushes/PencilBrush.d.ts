import type { Canvas } from '../canvas/Canvas';
import { ModifierKey, TPointerEventInfo } from '../EventTypeDefs';
import { TFabricEvent } from '../FabricEvent';
import { Point } from '../Point';
import { Path } from '../shapes/Path';
import { PathData } from '../typedefs';
import { SimpleBrush } from './SimpleBrush';
export declare class PencilBrush extends SimpleBrush<Path> {
    /**
     * Discard points that are less than `decimate` pixel distant from each other
     * @type Number
     * @default 0.4
     */
    decimate: number;
    /**
     * Draws a straight line between last recorded point to current pointer
     * Used for `shift` functionality
     *
     * @type boolean
     * @default false
     */
    protected drawStraightLine: boolean;
    /**
     * The event modifier key that makes the brush draw a straight line.
     * If `null` or 'none' or any other string that is not a modifier key the feature is disabled.
     * @type {ModifierKey | undefined | null}
     */
    straightLineKey: ModifierKey | undefined | null;
    private _points;
    private _hasStraightLine;
    protected oldEnd?: Point;
    constructor(canvas: Canvas);
    protected needsFullRender(alphaShouldRedraw?: boolean): boolean;
    /**
     * we pick the point between p1 & p2 as the end point and p1 as our control point.
     */
    static drawSegment(ctx: CanvasRenderingContext2D, p1: Point, p2: Point): Point;
    down(ev: TFabricEvent<TPointerEventInfo>): void;
    move(ev: TFabricEvent<TPointerEventInfo>): void;
    up(ev: TFabricEvent<TPointerEventInfo>): void;
    /**
     * @param {Point} point Point to be added to points array
     */
    protected _addPoint(point: Point): boolean;
    protected onPointAdded(): void;
    /**
     * draw the curve update
     */
    protected _renderCurve(ctx?: CanvasRenderingContext2D): void;
    /**
     * Draw a smooth path on the topCanvas using quadraticCurveTo
     * @param {CanvasRenderingContext2D} ctx
     */
    protected _render(ctx: CanvasRenderingContext2D): void;
    /**
     * Decimate points array with the decimate value
     */
    protected decimatePoints(points: Point[], distance: number): Point[];
    /**
     * Converts points to path
     * @param {Point[]} points Array of points
     * @return {PathData} path commands
     */
    getPathFromPoints(points: Point[]): PathData;
    /**
     * Creates a Path object to add on canvas
     * @return {Path} Path to add on canvas
     */
    protected finalizeShape(): Path | undefined;
    protected finalize(): Promise<void>;
}
//# sourceMappingURL=PencilBrush.d.ts.map