import type { FabricObject } from '../../shapes/Object/FabricObject';
import { Path } from '../../shapes/Path';
import { TMat2D } from '../../typedefs';
import { ErasingEventContextData } from './types';
export declare function isObjectErasable(object: FabricObject): boolean;
/**
 * Utility to apply a clip path to a path.
 * Used to preserve clipping on eraser paths in nested objects.
 * Called when a group has a clip path that should be applied to the path before applying erasing on the group's objects.
 * @param {Path} path The eraser path in canvas coordinate plane
 * @param {FabricObject} clipPath The clipPath to apply to the path
 * @param {TMat2D} clipPathContainerTransformMatrix The transform matrix of the object that the clip path belongs to
 * @returns {Path} path with clip path
 */
export declare function applyClipPathToPath(path: Path, clipPath: FabricObject, clipPathContainerTransformMatrix: TMat2D): Path;
/**
 * Utility to apply a clip path to a path.
 * Used to preserve clipping on eraser paths in nested objects.
 * Called when a group has a clip path that should be applied to the path before applying erasing on the group's objects.
 * @param {Path} path The eraser path
 * @param {FabricObject} object The clipPath to apply to path belongs to object
 * @returns {Promise<Path>}
 */
export declare function clonePathWithClipPath(path: Path, object: FabricObject & Required<Pick<FabricObject, 'clipPath'>>): Promise<Path>;
/**
 * Adds path to object's eraser, walks down object's descendants if necessary
 *
 * @fires erasing:end on object
 * @param {FabricObject} object
 * @param {Path} path
 * @param {ErasingEventContextData} [context] context to assign erased objects to
 */
export declare function addPathToObjectEraser(object: FabricObject, path: Path, context?: ErasingEventContextData, applyTransform?: (t: TMat2D) => TMat2D, fireEvent?: boolean): Promise<void>;
/**
 * Clones an object's eraser paths into the canvas plane
 * @param object the owner of the eraser that you want to clone
 * @param [applyObjectClipPath] controls whether the cloned eraser's paths should be clipped by the object's clip path
 * @returns
 */
export declare function cloneEraserFromObject(object: FabricObject & Required<Pick<FabricObject, 'eraser'>>, applyObjectClipPath?: boolean): Promise<Path[]>;
/**
 * Use when:
 * 1. switching the {@link Group#erasable} property from `true` to `deep` if you wish descendants to be erased by existing paths
 * 2. when adding/removing objects from group with {@link Group#erasable} set to `true`
 */
export declare function applyEraser(from: FabricObject & Required<Pick<FabricObject, 'eraser'>>, to: FabricObject[], { unset, }: {
    /**
     * remove `from`'s eraser when done
     */
    unset: boolean;
}): Promise<(ErasingEventContextData & {
    path: Path;
})[]>;
//# sourceMappingURL=util.d.ts.map