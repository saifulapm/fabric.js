import type { Canvas } from '../canvas/Canvas';
import { PencilBrush } from './PencilBrush';
export declare class PatternBrush extends PencilBrush {
    source?: CanvasImageSource;
    constructor(canvas: Canvas);
    getPatternSrc(): HTMLCanvasElement;
    /**
     * Creates "pattern" instance property
     * @param {CanvasRenderingContext2D} ctx
     */
    protected getPattern(ctx: CanvasRenderingContext2D): CanvasPattern | null;
    /**
     * Sets brush styles
     * @param {CanvasRenderingContext2D} ctx
     */
    protected _setBrushStyles(ctx?: CanvasRenderingContext2D): void;
    /**
     * Creates path
     */
    protected finalizeShape(): import("../..").Path | undefined;
}
//# sourceMappingURL=PatternBrush.d.ts.map