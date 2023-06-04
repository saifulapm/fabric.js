import { TPointerEventInfo } from '../EventTypeDefs';
import { TFabricEvent } from '../FabricEvent';
import { Polygon } from '../shapes/Polygon';
import { Polyline } from '../shapes/Polyline';
import { DrawShapeBase } from './DrawShapeBase';
export declare class DrawPoly extends DrawShapeBase<Polyline> {
    builder: typeof Polygon;
    protected subscribe(): VoidFunction[];
    private addPoint;
    private replacePoint;
    create(): Polygon;
    protected finalizeShape(): Polyline | undefined;
    down(ev: TFabricEvent<TPointerEventInfo>): void;
    move(ev: TFabricEvent<TPointerEventInfo>): void;
    up(ev: TFabricEvent<TPointerEventInfo>): boolean;
    end(ev: TFabricEvent<TPointerEventInfo>): void;
}
//# sourceMappingURL=DrawPoly.d.ts.map