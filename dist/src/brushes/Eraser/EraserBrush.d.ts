import type { Canvas } from '../../canvas/Canvas';
import { TPointerEventInfo } from '../../EventTypeDefs';
import { TFabricEvent } from '../../FabricEvent';
import type { Group } from '../../shapes/Group';
import { FabricObject } from '../../shapes/Object/FabricObject';
import type { Path } from '../../shapes/Path';
import { PencilBrush } from '../PencilBrush';
import type { Eraser } from './Eraser';
import { ErasingEventContext } from './types';
type RestorationContext = {
    visibility: [FabricObject, number][];
    eraser: [FabricObject, Eraser][];
    collection: FabricObject[];
};
/**
 * Supports **selective** erasing: only erasable objects are affected by the eraser brush.
 *
 * Supports **inverted** erasing: the brush can "undo" erasing.
 *
 * Supports **alpha** erasing: setting the alpha channel of the `color` property controls the eraser intensity.
 *
 * In order to support selective erasing, the brush clips the entire canvas
 * after drawing all non-erasable objects over the erased path using a pattern {@link preparePattern} brush so to speak (masking).
 * Rendering Logic:
 * 1. Render brush with pattern on top context
 * 2. Use the top context to clip the main context
 *
 * If **{@link inverted}** draws all objects, erasable objects without their eraser, over the erased path.
 * This achieves the desired effect of seeming to erase or undo erasing only on erasable objects.
 *
 * After erasing is done the created path is added to all intersected objects' `eraser` property {@link finalizeErasing}.
 *
 * The {@link updating} flag controls whether the pattern updates while drawing (performance may suffer).
 * It is crucial in order to reflect visual changes made to canvas after erasing started (i.e animations).
 *
 * @tutorial http://fabricjs.com/erasing
 */
export declare class EraserBrush extends PencilBrush {
    /**
     * When set to `true` the brush will create a visual effect of undoing erasing
     */
    inverted: boolean;
    /**
     * Indicates whether the eraser updates continuously on canvas rendering
     * Performance may suffer, handle manually if so
     */
    updating: boolean;
    protected patternCanvas: HTMLCanvasElement;
    private __disposer?;
    private blockUpdating;
    private dirty;
    protected setImageSmoothing(ctx: CanvasRenderingContext2D): void;
    /**
     * This is designed to support erasing a collection with both erasable and non-erasable objects while maintaining object stacking.\
     * Iterates over collections to allow nested selective erasing.\
     * Prepares objects before rendering the pattern brush.\
     * If brush is **NOT** inverted render all non-erasable objects.\
     * If brush is inverted render all objects, erasable objects without their eraser.
     * This will render the erased parts as if they were not erased in the first place, achieving an undo effect.
     *
     * @param {Canvas | Group} collection
     * @param {FabricObject[]} objects
     * @param {CanvasRenderingContext2D} ctx
     * @param {RestorationContext} restorationContext
     */
    protected prepareCollectionTraversal(collection: Canvas | Group, objects: FabricObject[], restorationContext: RestorationContext): void;
    /**
     * Prepare the pattern for the erasing brush
     * This pattern will be drawn on the top context after clipping the main context,
     * achieving a visual effect of erasing only erasable objects
     * @param {FabricObject[]} [objects]  override default behavior by passing objects to render on pattern
     */
    preparePattern(objects?: FabricObject[]): void;
    /**
     * @override
     */
    protected _setBrushStyles(ctx?: CanvasRenderingContext2D): void;
    /**
     * @override eraser isn't degraded by the alpha channel of {@link color}
     */
    protected needsFullRender(): boolean;
    /**
     * called from the `after:render` event subscriber
     */
    protected onUpdate(): void;
    /**
     * @override prepare pattern, subscribe for updates and fire `erasing:start`
     */
    down(ev: TFabricEvent<TPointerEventInfo>): void;
    /**
     * @override when drawing a straight line we need to redraw canvas so it won't be clipped by the previous straight line
     */
    protected onPointAdded(): void;
    /**
     * @override dispose of update subscriber {@link __disposer}
     */
    up(ev: TFabricEvent<TPointerEventInfo>): void;
    /**
     * render pattern on top context
     */
    protected renderPattern(ctx?: CanvasRenderingContext2D): void;
    /**
     * clip main context with top context after brush has been drawn onto it
     */
    protected clipContext(destination?: CanvasRenderingContext2D, source?: CanvasRenderingContext2D): void;
    protected finalizeRendering(ctx?: CanvasRenderingContext2D): void;
    /**
     * @override mask brush with pattern and clip main context
     */
    protected _renderCurve(ctx?: CanvasRenderingContext2D): void;
    /**
     * @override mask brush with pattern and clip main context
     */
    render(ctx?: CanvasRenderingContext2D): void;
    protected finalizeShape(): Path | undefined;
    /**
     * Add the eraser path to a canvas drawable's eraser
     *
     * @param {Path} path
     * @param {ErasingEventContext} [context] context to assign erased objects to
     * @returns {Promise<Path[]|void>} eraser paths
     */
    protected addPathToDrawableEraser(key: 'background' | 'overlay', path: Path, context: ErasingEventContext): false | Promise<void>;
    /**
     * propagate eraser path to all affected {@link FabricObject}
     * @param path eraser path
     */
    protected finalizeErasing(path: Path): Promise<ErasingEventContext>;
    /**
     * @override finalize erasing and fire `erasing:end`
     */
    protected onEnd(result?: Path): Promise<void>;
}
export {};
//# sourceMappingURL=EraserBrush.d.ts.map