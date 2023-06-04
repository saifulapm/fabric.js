import { Group } from '../../shapes/Group';
import { TClassProperties } from '../../typedefs';
/**
 * An object's Eraser
 */
export declare class Eraser extends Group {
    drawObject(ctx: CanvasRenderingContext2D): void;
    /**
     * Returns svg representation of an instance
     * use <mask> to achieve erasing for svg, credit: https://travishorn.com/removing-parts-of-shapes-in-svg-b539a89e5649
     * for masking we need to add a white rect before all paths
     *
     * @param {Function} [reviver] Method for further parsing of svg representation.
     * @return {String} svg representation of an instance
     */
    _toSVG(reviver?: (markup: string) => string): string[];
    static fromObject({ objects, ...options }: {
        [x: string]: any;
        objects?: never[] | undefined;
    }): Promise<Eraser>;
}
export declare const eraserDefaultValues: Partial<TClassProperties<Eraser>>;
//# sourceMappingURL=Eraser.d.ts.map