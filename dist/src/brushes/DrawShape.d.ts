import { ModifierKey, TPointerEventInfo } from '../EventTypeDefs';
import { TFabricEvent } from '../FabricEvent';
import { Point } from '../Point';
import type { FabricObject } from '../shapes/Object/FabricObject';
import { Rect } from '../shapes/Rect';
import { Constructor } from '../typedefs';
import { DrawShapeBase } from './DrawShapeBase';
export declare class DrawShape<T extends FabricObject = Rect> extends DrawShapeBase<T> {
    /**
     * class to build shape from
     */
    builder: Constructor<T>;
    /**
     * set to `true` for the shape to be centered on mouse/touch down
     */
    centered: boolean;
    /**
     * The event modifier key that makes the brush symmetric.
     */
    modifierKey?: ModifierKey;
    /**
     * set to `true` for the shape to be symmetric
     */
    symmetric?: boolean;
    protected pointerStart: Point;
    create(): T;
    protected setBounds(a: Point, b: Point): void;
    down(ev: TFabricEvent<TPointerEventInfo>): void;
    move(ev: TFabricEvent<TPointerEventInfo>): void;
    up(ev: TFabricEvent<TPointerEventInfo>): void;
}
//# sourceMappingURL=DrawShape.d.ts.map