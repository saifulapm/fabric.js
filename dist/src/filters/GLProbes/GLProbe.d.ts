export declare enum GLPrecision {
    low = "lowp",
    medium = "mediump",
    high = "highp"
}
export declare abstract class GLProbe {
    GLPrecision: GLPrecision | undefined;
    abstract queryWebGL(): void;
    abstract isSupported(textureSize: number): boolean;
}
//# sourceMappingURL=GLProbe.d.ts.map