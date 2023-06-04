import type { JpegConfig, PngConfig } from 'canvas';
import { Canvas as CanvasBase, StaticCanvas as StaticCanvasBase } from './fabric';
export * from './fabric';
export declare class StaticCanvas extends StaticCanvasBase {
    getNodeCanvas(): import("canvas").Canvas;
    createPNGStream(opts?: PngConfig): import("canvas").PNGStream;
    createJPEGStream(opts?: JpegConfig): import("canvas").JPEGStream;
}
export declare class Canvas extends CanvasBase {
    getNodeCanvas(): import("canvas").Canvas;
    createPNGStream(opts?: PngConfig): import("canvas").PNGStream;
    createJPEGStream(opts?: JpegConfig): import("canvas").JPEGStream;
}
//# sourceMappingURL=index.node.d.ts.map