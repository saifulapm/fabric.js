import { Point } from '../Point';
import { Ellipse } from '../shapes/Ellipse';
import { DrawShape } from './DrawShape';
export declare class DrawOval extends DrawShape<Ellipse> {
    builder: typeof Ellipse;
    protected setBounds(a: Point, b: Point): void;
}
//# sourceMappingURL=DrawOval.d.ts.map