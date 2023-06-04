import type { Observable } from './Observable';
export type TFabricEvent<T> = FabricEvent<T> & T;
export declare enum PropagationState {
    propagate = 1,
    stop = 0,
    stopImmediately = -1
}
export declare class FabricEvent<T> {
    defaultPrevented: boolean;
    propagate: PropagationState;
    path: Observable<any>[];
    static init<T>(data?: T): TFabricEvent<T>;
    private constructor();
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
     */
    preventDefault(): void;
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
     */
    stopPropagation(): void;
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation
     */
    stopImmediatePropagation(): void;
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
     */
    composedPath(): Observable<any>[];
}
//# sourceMappingURL=FabricEvent.d.ts.map