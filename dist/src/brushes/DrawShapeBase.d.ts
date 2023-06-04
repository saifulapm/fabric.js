import type { FabricObject } from '../shapes/Object/FabricObject';
import { SimpleBrush } from './SimpleBrush';
/**
 * Declarative shape drawing using pointer events
 */
export declare abstract class DrawShapeBase<T extends FabricObject> extends SimpleBrush<T> {
    shape: T | undefined;
    stroke: string;
    fill: string;
    abstract create(): T;
    protected build(): void;
    setStyles(): void;
    protected finalizeShape(): T | undefined;
    protected _setBrushStyles(): void;
    protected _render(ctx: CanvasRenderingContext2D): void;
}
//# sourceMappingURL=DrawShapeBase.d.ts.map