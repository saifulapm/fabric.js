import { TPointerEventInfo } from '../EventTypeDefs';
import { TFabricEvent } from '../FabricEvent';
import type { FabricObject } from '../shapes/Object/FabricObject';
import { BaseBrush } from './BaseBrush';
export declare abstract class SimpleBrush<T extends FabricObject = FabricObject> extends BaseBrush<T> {
    /**
     * When `true`, free drawing is limited to the canvas size
     * @type Boolean
     * @default false
     */
    limitedToCanvasSize: boolean;
    protected subscribe(): VoidFunction[];
    protected extractPointer(ev: TFabricEvent<TPointerEventInfo>): import("../Point").Point;
    protected shouldHandleEvent({ e }: TPointerEventInfo, mustBeActive: boolean): boolean;
    protected shouldHandleMoveEvent(ev: TPointerEventInfo): boolean;
    protected down(ev: TFabricEvent<TPointerEventInfo>): void;
    protected move(ev: TFabricEvent<TPointerEventInfo>): void;
    protected up(ev: TFabricEvent<TPointerEventInfo>): void;
}
//# sourceMappingURL=SimpleBrush.d.ts.map