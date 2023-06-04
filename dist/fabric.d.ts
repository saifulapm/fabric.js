import { BaseFilter } from './src/filters/BaseFilter';
import { BlendColor } from './src/filters/BlendColor';
import { BlendImage } from './src/filters/BlendImage';
import { Blur } from './src/filters/Blur';
import { Brightness } from './src/filters/Brightness';
import { ColorMatrix } from './src/filters/ColorMatrix';
import { Composed } from './src/filters/Composed';
import { Contrast } from './src/filters/Contrast';
import { Convolute } from './src/filters/Convolute';
import { Gamma } from './src/filters/Gamma';
import { Grayscale } from './src/filters/Grayscale';
import { HueRotation } from './src/filters/HueRotation';
import { Invert } from './src/filters/Invert';
import { Noise } from './src/filters/Noise';
import { Pixelate } from './src/filters/Pixelate';
import { RemoveColor } from './src/filters/RemoveColor';
import { Resize } from './src/filters/Resize';
import { Saturation } from './src/filters/Saturation';
import { Vibrance } from './src/filters/Vibrance';
declare const filters: {
    BaseFilter: typeof BaseFilter;
    BlendColor: typeof BlendColor;
    BlendImage: typeof BlendImage;
    Blur: typeof Blur;
    Brightness: typeof Brightness;
    ColorMatrix: typeof ColorMatrix;
    Composed: typeof Composed;
    Contrast: typeof Contrast;
    Convolute: typeof Convolute;
    Sepia: {
        new (options?: Partial<import("./src/filters/BaseFilter").AbstractBaseFilterOptions<string>> & Record<string, any>): {
            type: string;
            matrix: number[];
            mainParameter: undefined;
            colorsOnly: boolean;
            setOptions({ matrix, ...options }: Record<string, any>): void;
            applyTo2d(options: import("./src/filters/typedefs").T2DPipelineState): void;
            getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLUniformLocationMap;
            sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap): void;
            getFragmentSource(): string;
            vertexSource: string;
            fragmentSource: string;
            createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            };
            getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLAttributeLocationMap;
            sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
            _setupFrameBuffer(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            _swapTextures(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            isNeutralState(options?: any): boolean;
            applyTo(options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState): void;
            getCacheKey(): string;
            retrieveShader(options: import("./src/filters/typedefs").TWebGLPipelineState): import("./src/filters/typedefs").TWebGLProgramCacheItem;
            applyToWebGL(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
            unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
            getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined) | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined;
            setMainParameter(value: any): void;
            createHelpLayer(options: import("./src/filters/typedefs").T2DPipelineState): void;
            toObject(): {
                type: string;
            };
            toJSON(): {
                type: string;
            };
        };
        fromObject(object: any): Promise<{
            type: string;
            matrix: number[];
            mainParameter: undefined;
            colorsOnly: boolean;
            setOptions({ matrix, ...options }: Record<string, any>): void;
            applyTo2d(options: import("./src/filters/typedefs").T2DPipelineState): void;
            getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLUniformLocationMap;
            sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap): void;
            getFragmentSource(): string;
            vertexSource: string;
            fragmentSource: string;
            createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            };
            getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLAttributeLocationMap;
            sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
            _setupFrameBuffer(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            _swapTextures(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            isNeutralState(options?: any): boolean;
            applyTo(options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState): void;
            getCacheKey(): string;
            retrieveShader(options: import("./src/filters/typedefs").TWebGLPipelineState): import("./src/filters/typedefs").TWebGLProgramCacheItem;
            applyToWebGL(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
            unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
            getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined) | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined;
            setMainParameter(value: any): void;
            createHelpLayer(options: import("./src/filters/typedefs").T2DPipelineState): void;
            toObject(): {
                type: string;
            };
            toJSON(): {
                type: string;
            };
        }>;
    };
    Brownie: {
        new (options?: Partial<import("./src/filters/BaseFilter").AbstractBaseFilterOptions<string>> & Record<string, any>): {
            type: string;
            matrix: number[];
            mainParameter: undefined;
            colorsOnly: boolean;
            setOptions({ matrix, ...options }: Record<string, any>): void;
            applyTo2d(options: import("./src/filters/typedefs").T2DPipelineState): void;
            getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLUniformLocationMap;
            sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap): void;
            getFragmentSource(): string;
            vertexSource: string;
            fragmentSource: string;
            createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            };
            getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLAttributeLocationMap;
            sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
            _setupFrameBuffer(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            _swapTextures(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            isNeutralState(options?: any): boolean;
            applyTo(options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState): void;
            getCacheKey(): string;
            retrieveShader(options: import("./src/filters/typedefs").TWebGLPipelineState): import("./src/filters/typedefs").TWebGLProgramCacheItem;
            applyToWebGL(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
            unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
            getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined) | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined;
            setMainParameter(value: any): void;
            createHelpLayer(options: import("./src/filters/typedefs").T2DPipelineState): void;
            toObject(): {
                type: string;
            };
            toJSON(): {
                type: string;
            };
        };
        fromObject(object: any): Promise<{
            type: string;
            matrix: number[];
            mainParameter: undefined;
            colorsOnly: boolean;
            setOptions({ matrix, ...options }: Record<string, any>): void;
            applyTo2d(options: import("./src/filters/typedefs").T2DPipelineState): void;
            getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLUniformLocationMap;
            sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap): void;
            getFragmentSource(): string;
            vertexSource: string;
            fragmentSource: string;
            createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            };
            getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLAttributeLocationMap;
            sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
            _setupFrameBuffer(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            _swapTextures(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            isNeutralState(options?: any): boolean;
            applyTo(options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState): void;
            getCacheKey(): string;
            retrieveShader(options: import("./src/filters/typedefs").TWebGLPipelineState): import("./src/filters/typedefs").TWebGLProgramCacheItem;
            applyToWebGL(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
            unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
            getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined) | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined;
            setMainParameter(value: any): void;
            createHelpLayer(options: import("./src/filters/typedefs").T2DPipelineState): void;
            toObject(): {
                type: string;
            };
            toJSON(): {
                type: string;
            };
        }>;
    };
    Vintage: {
        new (options?: Partial<import("./src/filters/BaseFilter").AbstractBaseFilterOptions<string>> & Record<string, any>): {
            type: string;
            matrix: number[];
            mainParameter: undefined;
            colorsOnly: boolean;
            setOptions({ matrix, ...options }: Record<string, any>): void;
            applyTo2d(options: import("./src/filters/typedefs").T2DPipelineState): void;
            getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLUniformLocationMap;
            sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap): void;
            getFragmentSource(): string;
            vertexSource: string;
            fragmentSource: string;
            createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            };
            getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLAttributeLocationMap;
            sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
            _setupFrameBuffer(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            _swapTextures(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            isNeutralState(options?: any): boolean;
            applyTo(options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState): void;
            getCacheKey(): string;
            retrieveShader(options: import("./src/filters/typedefs").TWebGLPipelineState): import("./src/filters/typedefs").TWebGLProgramCacheItem;
            applyToWebGL(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
            unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
            getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined) | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined;
            setMainParameter(value: any): void;
            createHelpLayer(options: import("./src/filters/typedefs").T2DPipelineState): void;
            toObject(): {
                type: string;
            };
            toJSON(): {
                type: string;
            };
        };
        fromObject(object: any): Promise<{
            type: string;
            matrix: number[];
            mainParameter: undefined;
            colorsOnly: boolean;
            setOptions({ matrix, ...options }: Record<string, any>): void;
            applyTo2d(options: import("./src/filters/typedefs").T2DPipelineState): void;
            getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLUniformLocationMap;
            sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap): void;
            getFragmentSource(): string;
            vertexSource: string;
            fragmentSource: string;
            createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            };
            getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLAttributeLocationMap;
            sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
            _setupFrameBuffer(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            _swapTextures(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            isNeutralState(options?: any): boolean;
            applyTo(options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState): void;
            getCacheKey(): string;
            retrieveShader(options: import("./src/filters/typedefs").TWebGLPipelineState): import("./src/filters/typedefs").TWebGLProgramCacheItem;
            applyToWebGL(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
            unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
            getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined) | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined;
            setMainParameter(value: any): void;
            createHelpLayer(options: import("./src/filters/typedefs").T2DPipelineState): void;
            toObject(): {
                type: string;
            };
            toJSON(): {
                type: string;
            };
        }>;
    };
    Kodachrome: {
        new (options?: Partial<import("./src/filters/BaseFilter").AbstractBaseFilterOptions<string>> & Record<string, any>): {
            type: string;
            matrix: number[];
            mainParameter: undefined;
            colorsOnly: boolean;
            setOptions({ matrix, ...options }: Record<string, any>): void;
            applyTo2d(options: import("./src/filters/typedefs").T2DPipelineState): void;
            getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLUniformLocationMap;
            sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap): void;
            getFragmentSource(): string;
            vertexSource: string;
            fragmentSource: string;
            createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            };
            getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLAttributeLocationMap;
            sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
            _setupFrameBuffer(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            _swapTextures(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            isNeutralState(options?: any): boolean;
            applyTo(options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState): void;
            getCacheKey(): string;
            retrieveShader(options: import("./src/filters/typedefs").TWebGLPipelineState): import("./src/filters/typedefs").TWebGLProgramCacheItem;
            applyToWebGL(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
            unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
            getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined) | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined;
            setMainParameter(value: any): void;
            createHelpLayer(options: import("./src/filters/typedefs").T2DPipelineState): void;
            toObject(): {
                type: string;
            };
            toJSON(): {
                type: string;
            };
        };
        fromObject(object: any): Promise<{
            type: string;
            matrix: number[];
            mainParameter: undefined;
            colorsOnly: boolean;
            setOptions({ matrix, ...options }: Record<string, any>): void;
            applyTo2d(options: import("./src/filters/typedefs").T2DPipelineState): void;
            getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLUniformLocationMap;
            sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap): void;
            getFragmentSource(): string;
            vertexSource: string;
            fragmentSource: string;
            createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            };
            getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLAttributeLocationMap;
            sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
            _setupFrameBuffer(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            _swapTextures(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            isNeutralState(options?: any): boolean;
            applyTo(options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState): void;
            getCacheKey(): string;
            retrieveShader(options: import("./src/filters/typedefs").TWebGLPipelineState): import("./src/filters/typedefs").TWebGLProgramCacheItem;
            applyToWebGL(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
            unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
            getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined) | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined;
            setMainParameter(value: any): void;
            createHelpLayer(options: import("./src/filters/typedefs").T2DPipelineState): void;
            toObject(): {
                type: string;
            };
            toJSON(): {
                type: string;
            };
        }>;
    };
    Technicolor: {
        new (options?: Partial<import("./src/filters/BaseFilter").AbstractBaseFilterOptions<string>> & Record<string, any>): {
            type: string;
            matrix: number[];
            mainParameter: undefined;
            colorsOnly: boolean;
            setOptions({ matrix, ...options }: Record<string, any>): void;
            applyTo2d(options: import("./src/filters/typedefs").T2DPipelineState): void;
            getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLUniformLocationMap;
            sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap): void;
            getFragmentSource(): string;
            vertexSource: string;
            fragmentSource: string;
            createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            };
            getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLAttributeLocationMap;
            sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
            _setupFrameBuffer(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            _swapTextures(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            isNeutralState(options?: any): boolean;
            applyTo(options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState): void;
            getCacheKey(): string;
            retrieveShader(options: import("./src/filters/typedefs").TWebGLPipelineState): import("./src/filters/typedefs").TWebGLProgramCacheItem;
            applyToWebGL(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
            unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
            getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined) | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined;
            setMainParameter(value: any): void;
            createHelpLayer(options: import("./src/filters/typedefs").T2DPipelineState): void;
            toObject(): {
                type: string;
            };
            toJSON(): {
                type: string;
            };
        };
        fromObject(object: any): Promise<{
            type: string;
            matrix: number[];
            mainParameter: undefined;
            colorsOnly: boolean;
            setOptions({ matrix, ...options }: Record<string, any>): void;
            applyTo2d(options: import("./src/filters/typedefs").T2DPipelineState): void;
            getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLUniformLocationMap;
            sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap): void;
            getFragmentSource(): string;
            vertexSource: string;
            fragmentSource: string;
            createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            };
            getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLAttributeLocationMap;
            sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
            _setupFrameBuffer(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            _swapTextures(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            isNeutralState(options?: any): boolean;
            applyTo(options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState): void;
            getCacheKey(): string;
            retrieveShader(options: import("./src/filters/typedefs").TWebGLPipelineState): import("./src/filters/typedefs").TWebGLProgramCacheItem;
            applyToWebGL(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
            unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
            getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined) | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined;
            setMainParameter(value: any): void;
            createHelpLayer(options: import("./src/filters/typedefs").T2DPipelineState): void;
            toObject(): {
                type: string;
            };
            toJSON(): {
                type: string;
            };
        }>;
    };
    Polaroid: {
        new (options?: Partial<import("./src/filters/BaseFilter").AbstractBaseFilterOptions<string>> & Record<string, any>): {
            type: string;
            matrix: number[];
            mainParameter: undefined;
            colorsOnly: boolean;
            setOptions({ matrix, ...options }: Record<string, any>): void;
            applyTo2d(options: import("./src/filters/typedefs").T2DPipelineState): void;
            getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLUniformLocationMap;
            sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap): void;
            getFragmentSource(): string;
            vertexSource: string;
            fragmentSource: string;
            createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            };
            getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLAttributeLocationMap;
            sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
            _setupFrameBuffer(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            _swapTextures(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            isNeutralState(options?: any): boolean;
            applyTo(options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState): void;
            getCacheKey(): string;
            retrieveShader(options: import("./src/filters/typedefs").TWebGLPipelineState): import("./src/filters/typedefs").TWebGLProgramCacheItem;
            applyToWebGL(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
            unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
            getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined) | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined;
            setMainParameter(value: any): void;
            createHelpLayer(options: import("./src/filters/typedefs").T2DPipelineState): void;
            toObject(): {
                type: string;
            };
            toJSON(): {
                type: string;
            };
        };
        fromObject(object: any): Promise<{
            type: string;
            matrix: number[];
            mainParameter: undefined;
            colorsOnly: boolean;
            setOptions({ matrix, ...options }: Record<string, any>): void;
            applyTo2d(options: import("./src/filters/typedefs").T2DPipelineState): void;
            getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLUniformLocationMap;
            sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap): void;
            getFragmentSource(): string;
            vertexSource: string;
            fragmentSource: string;
            createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            };
            getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLAttributeLocationMap;
            sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
            _setupFrameBuffer(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            _swapTextures(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            isNeutralState(options?: any): boolean;
            applyTo(options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState): void;
            getCacheKey(): string;
            retrieveShader(options: import("./src/filters/typedefs").TWebGLPipelineState): import("./src/filters/typedefs").TWebGLProgramCacheItem;
            applyToWebGL(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
            unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
            getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined) | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined;
            setMainParameter(value: any): void;
            createHelpLayer(options: import("./src/filters/typedefs").T2DPipelineState): void;
            toObject(): {
                type: string;
            };
            toJSON(): {
                type: string;
            };
        }>;
    };
    BlackWhite: {
        new (options?: Partial<import("./src/filters/BaseFilter").AbstractBaseFilterOptions<string>> & Record<string, any>): {
            type: string;
            matrix: number[];
            mainParameter: undefined;
            colorsOnly: boolean;
            setOptions({ matrix, ...options }: Record<string, any>): void;
            applyTo2d(options: import("./src/filters/typedefs").T2DPipelineState): void;
            getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLUniformLocationMap;
            sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap): void;
            getFragmentSource(): string;
            vertexSource: string;
            fragmentSource: string;
            createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            };
            getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLAttributeLocationMap;
            sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
            _setupFrameBuffer(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            _swapTextures(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            isNeutralState(options?: any): boolean;
            applyTo(options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState): void;
            getCacheKey(): string;
            retrieveShader(options: import("./src/filters/typedefs").TWebGLPipelineState): import("./src/filters/typedefs").TWebGLProgramCacheItem;
            applyToWebGL(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
            unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
            getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined) | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined;
            setMainParameter(value: any): void;
            createHelpLayer(options: import("./src/filters/typedefs").T2DPipelineState): void;
            toObject(): {
                type: string;
            };
            toJSON(): {
                type: string;
            };
        };
        fromObject(object: any): Promise<{
            type: string;
            matrix: number[];
            mainParameter: undefined;
            colorsOnly: boolean;
            setOptions({ matrix, ...options }: Record<string, any>): void;
            applyTo2d(options: import("./src/filters/typedefs").T2DPipelineState): void;
            getUniformLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLUniformLocationMap;
            sendUniformData(gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap): void;
            getFragmentSource(): string;
            vertexSource: string;
            fragmentSource: string;
            createProgram(gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string): {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            };
            getAttributeLocations(gl: WebGLRenderingContext, program: WebGLProgram): import("./src/filters/typedefs").TWebGLAttributeLocationMap;
            sendAttributeData(gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array): void;
            _setupFrameBuffer(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            _swapTextures(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            isNeutralState(options?: any): boolean;
            applyTo(options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState): void;
            getCacheKey(): string;
            retrieveShader(options: import("./src/filters/typedefs").TWebGLPipelineState): import("./src/filters/typedefs").TWebGLProgramCacheItem;
            applyToWebGL(options: import("./src/filters/typedefs").TWebGLPipelineState): void;
            bindAdditionalTexture(gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number): void;
            unbindAdditionalTexture(gl: WebGLRenderingContext, textureUnit: number): void;
            getMainParameter(): string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | (() => string | boolean | number[] | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLAttributeLocationMap) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => import("./src/filters/typedefs").TWebGLProgramCacheItem) | ((options?: any) => boolean) | ((gl: WebGLRenderingContext, program: WebGLProgram) => import("./src/filters/typedefs").TWebGLUniformLocationMap) | (({ matrix, ...options }: Record<string, any>) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | ((gl: WebGLRenderingContext, uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap) => void) | (() => string) | ((gl: WebGLRenderingContext, fragmentSource?: string, vertexSource?: string) => {
                program: WebGLProgram;
                attributeLocations: import("./src/filters/typedefs").TWebGLAttributeLocationMap;
                uniformLocations: import("./src/filters/typedefs").TWebGLUniformLocationMap;
            }) | ((gl: WebGLRenderingContext, attributeLocations: Record<string, number>, aPositionData: Float32Array) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((options: import("./src/filters/typedefs").TWebGLPipelineState | import("./src/filters/typedefs").T2DPipelineState) => void) | (() => string) | ((options: import("./src/filters/typedefs").TWebGLPipelineState) => void) | ((gl: WebGLRenderingContext, texture: WebGLTexture, textureUnit: number) => void) | ((gl: WebGLRenderingContext, textureUnit: number) => void) | any | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined) | (() => {
                type: string;
            }) | (() => {
                type: string;
            }) | ((value: any) => void) | ((options: import("./src/filters/typedefs").T2DPipelineState) => void) | undefined;
            setMainParameter(value: any): void;
            createHelpLayer(options: import("./src/filters/typedefs").T2DPipelineState): void;
            toObject(): {
                type: string;
            };
            toJSON(): {
                type: string;
            };
        }>;
    };
    Gamma: typeof Gamma;
    Grayscale: typeof Grayscale;
    HueRotation: typeof HueRotation;
    Invert: typeof Invert;
    Noise: typeof Noise;
    Pixelate: typeof Pixelate;
    RemoveColor: typeof RemoveColor;
    Resize: typeof Resize;
    Saturation: typeof Saturation;
    Vibrance: typeof Vibrance;
};
import { getBoundsOfCurve } from './src/util/path';
import { setStyle } from './src/util/dom_style';
import { getElementOffset, makeElementUnselectable, makeElementSelectable } from './src/util/dom_misc';
import { animate, animateColor } from './src/util/animation/animate';
import * as ease from './src/util/animation/easing';
import { requestAnimFrame, cancelAnimFrame } from './src/util/animation/AnimationFrameProvider';
import { wrapElement } from './src/util/dom_misc';
import { request } from './src/util/dom_request';
import { parseFontDeclaration } from './src/parser/parseFontDeclaration';
declare const util: {
    rotatePoint: (point: Point, origin: Point, radians: import("./src/typedefs").TRadian) => Point;
    removeFromArray: <T>(array: T[], value: T) => T[];
    getRandomInt: (min: number, max: number) => number;
    wrapElement: typeof wrapElement;
    parsePreserveAspectRatioAttribute: (attribute: string) => import("./src/util/misc/svgParsing").TPreserveArParsed;
    pick: <T_1 extends Record<string, any>>(source: T_1, keys?: (keyof T_1)[]) => Partial<T_1>;
    setStyle: typeof setStyle;
    getSvgAttributes: (type: import("./src/typedefs").SVGElementName) => string[];
    cos: (angle: import("./src/typedefs").TRadian) => number;
    sin: (angle: import("./src/typedefs").TRadian) => number;
    rotateVector: (vector: Point, radians: import("./src/typedefs").TRadian) => Point;
    createVector: (from: import("./src/Point").IPoint, to: import("./src/Point").IPoint) => Point;
    calcAngleBetweenVectors: (a: Point, b: Point) => import("./src/typedefs").TRadian;
    getUnitVector: (v: Point) => Point;
    getBisector: (A: Point, B: Point, C: Point) => {
        vector: Point;
        angle: import("./src/typedefs").TRadian;
    };
    degreesToRadians: (degrees: import("./src/typedefs").TDegree) => import("./src/typedefs").TRadian;
    radiansToDegrees: (radians: import("./src/typedefs").TRadian) => import("./src/typedefs").TDegree;
    projectStrokeOnPoints: (points: import("./src/Point").IPoint[], options: import("./src/util/misc/projectStroke/types").TProjectStrokeOnPointsOptions, openPath?: boolean) => import("./src/util/misc/projectStroke/types").TProjection[];
    transformPoint: (p: import("./src/Point").IPoint, t: import("./src/typedefs").TMat2D, ignoreOffset?: boolean | undefined) => Point;
    invertTransform: (t: import("./src/typedefs").TMat2D) => import("./src/typedefs").TMat2D;
    composeMatrix: ({ translateX, translateY, angle, ...otherOptions }: import("./src/util/misc/matrix").TComposeMatrixArgs) => import("./src/typedefs").TMat2D;
    qrDecompose: (a: import("./src/typedefs").TMat2D) => Required<Omit<import("./src/util/misc/matrix").TComposeMatrixArgs, "flipX" | "flipY">>;
    calcDimensionsMatrix: ({ scaleX, scaleY, flipX, flipY, skewX, skewY, }: import("./src/util/misc/matrix").TScaleMatrixArgs) => import("./src/typedefs").TMat2D;
    calcRotateMatrix: ({ angle }: {
        angle?: import("./src/typedefs").TDegree | undefined;
    }) => import("./src/typedefs").TMat2D;
    multiplyTransformMatrices: (a: import("./src/typedefs").TMat2D, b: import("./src/typedefs").TMat2D, is2x2?: boolean | undefined) => import("./src/typedefs").TMat2D;
    multiplyTransformMatrices2: (matrices: import("./src/typedefs").TMat2D[], is2x2?: boolean | undefined) => import("./src/typedefs").TMat2D;
    isIdentityMatrix: (mat: import("./src/typedefs").TMat2D) => boolean;
    stylesFromArray: (styles: import("./src/shapes/Text/StyledText").TextStyle | import("./src/util/misc/textStyles").TextStyleArray, text: string) => import("./src/shapes/Text/StyledText").TextStyle;
    stylesToArray: (styles: import("./src/shapes/Text/StyledText").TextStyle, text: string) => import("./src/util/misc/textStyles").TextStyleArray;
    hasStyleChanged: (prevStyle: import("./src/shapes/Text/StyledText").TextStyleDeclaration, thisStyle: import("./src/shapes/Text/StyledText").TextStyleDeclaration, forTextSpans?: boolean) => boolean;
    getElementOffset: typeof getElementOffset;
    createCanvasElement: () => HTMLCanvasElement;
    createImage: () => HTMLImageElement;
    copyCanvasElement: (canvas: HTMLCanvasElement) => HTMLCanvasElement;
    toDataURL: (canvasEl: HTMLCanvasElement, format: import("./src/typedefs").ImageFormat, quality: number) => string;
    toFixed: (number: string | number, fractionDigits: number) => number;
    matrixToSVG: (transform: import("./src/typedefs").TMat2D) => string;
    groupSVGElements: (elements: Object<import("./src/EventTypeDefs").ObjectEvents>[]) => Object<import("./src/EventTypeDefs").ObjectEvents>;
    parseUnit: (value: string, fontSize: number) => number;
    findScaleToFit: (source: import("./src/util/misc/findScaleTo").IWithDimensions, destination: import("./src/util/misc/findScaleTo").IWithDimensions) => number;
    findScaleToCover: (source: import("./src/util/misc/findScaleTo").IWithDimensions, destination: import("./src/util/misc/findScaleTo").IWithDimensions) => number;
    capValue: (min: number, value: number, max: number) => number;
    saveObjectTransform: (target: import("./src/shapes/Object/Object").FabricObject<import("./src/EventTypeDefs").ObjectEvents>) => {
        scaleX: number;
        scaleY: number;
        skewX: number;
        skewY: number;
        angle: import("./src/typedefs").TDegree;
        left: number;
        flipX: boolean;
        flipY: boolean;
        top: number;
    };
    resetObjectTransform: (target: import("./src/shapes/Object/Object").FabricObject<import("./src/EventTypeDefs").ObjectEvents>) => void;
    addTransformToObject: (object: import("./src/shapes/Object/Object").FabricObject<import("./src/EventTypeDefs").ObjectEvents>, transform: import("./src/typedefs").TMat2D) => void;
    applyTransformToObject: (object: import("./src/shapes/Object/Object").FabricObject<import("./src/EventTypeDefs").ObjectEvents>, transform: import("./src/typedefs").TMat2D) => void;
    removeTransformFromObject: (object: import("./src/shapes/Object/Object").FabricObject<import("./src/EventTypeDefs").ObjectEvents>, transform: import("./src/typedefs").TMat2D) => void;
    makeBoundingBoxFromPoints: (points: import("./src/Point").IPoint[]) => import("./src/typedefs").TBBox;
    calcPlaneChangeMatrix: (from?: import("./src/typedefs").TMat2D, to?: import("./src/typedefs").TMat2D) => import("./src/typedefs").TMat2D;
    sendPointToPlane: (point: Point, from?: import("./src/typedefs").TMat2D, to?: import("./src/typedefs").TMat2D) => Point;
    transformPointRelativeToCanvas: (point: Point, canvas: StaticCanvas<import("./src/EventTypeDefs").StaticCanvasEvents>, relationBefore: import("./src/util/misc/planeChange").ObjectRelation, relationAfter: import("./src/util/misc/planeChange").ObjectRelation) => Point;
    sendObjectToPlane: (object: Object<import("./src/EventTypeDefs").ObjectEvents>, from?: import("./src/typedefs").TMat2D | undefined, to?: import("./src/typedefs").TMat2D | undefined) => import("./src/typedefs").TMat2D;
    string: {
        graphemeSplit: (textstring: string) => string[];
        capitalize: <S extends string, FirstOnly extends boolean = false>(string: S, firstLetterOnly?: FirstOnly) => Capitalize<FirstOnly extends true ? S : Lowercase<S>>;
        escapeXml: (string: string) => string;
    };
    loadImage: (url: string, { signal, crossOrigin }?: import("./src/util/misc/objectEnlive").LoadImageOptions) => Promise<HTMLImageElement>;
    enlivenObjects: (objects: any[], { signal, reviver }?: import("./src/util/misc/objectEnlive").EnlivenObjectOptions) => Promise<Object<import("./src/EventTypeDefs").ObjectEvents>[]>;
    enlivenObjectEnlivables: <R = Record<string, Object<import("./src/EventTypeDefs").ObjectEvents> | import("./src/typedefs").TFiller | null>>(serializedObject: any, { signal }?: {
        signal?: AbortSignal | undefined;
    }) => Promise<R>;
    joinPath: (pathData: any) => any;
    parsePath: (pathString: any) => any[];
    makePathSimpler: (path: import("./src/typedefs").PathData) => import("./src/typedefs").PathData;
    getSmoothPathFromPoints: (points: any, correction?: number) => import("./src/typedefs").PathData;
    getPathSegmentsInfo: (path: import("./src/typedefs").PathData) => import("./src/util/path").TPathSegmentsInfo[];
    getBoundsOfCurve: typeof getBoundsOfCurve;
    getPointOnPath: (path: import("./src/typedefs").PathData, distance: number, infos?: import("./src/util/path").TPathSegmentsInfo[]) => Point | {
        x: number;
        y: number;
        angle: number;
    } | undefined;
    transformPath: (path: import("./src/typedefs").PathData, transform: import("./src/typedefs").TMat2D, pathOffset: Point) => (string | number)[][];
    getRegularPolygonPath: (numVertexes: any, radius: any) => any[];
    isTouchEvent: (event: any) => boolean;
    getPointer: (event: any) => Point;
    makeElementUnselectable: typeof makeElementUnselectable;
    makeElementSelectable: typeof makeElementSelectable;
    isTransparent: (ctx: CanvasRenderingContext2D, x: number, y: number, tolerance: number) => boolean;
    sizeAfterTransform: (width: number, height: number, options: import("./src/util/misc/matrix").TScaleMatrixArgs) => Point;
    mergeClipPaths: (c1: Object<import("./src/EventTypeDefs").ObjectEvents>, c2: Object<import("./src/EventTypeDefs").ObjectEvents>) => Group;
    request: typeof request;
    ease: typeof ease;
    animateColor: typeof animateColor;
    animate: typeof animate;
    requestAnimFrame: typeof requestAnimFrame;
    cancelAnimFrame: typeof cancelAnimFrame;
    classRegistry: import("./src/util/class_registry").ClassRegistry;
    removeTransformMatrixForSvgParsing: (object: Object<import("./src/EventTypeDefs").ObjectEvents> & {
        transformMatrix?: import("./src/typedefs").TMat2D | undefined;
    }, preserveAspectRatioOptions?: any) => void;
};
import { renderCircleControl, renderSquareControl } from './src/controls/controls.render';
import { createPolyControls } from './src/controls/polyControl';
import { getLocalPoint } from './src/controls/util';
import { wrapWithFixedAnchor } from './src/controls/wrapWithFixedAnchor';
/**
 * @todo remove as unused
 */
declare const controlsUtils: {
    scaleCursorStyleHandler: import("./src/EventTypeDefs").ControlCursorCallback;
    skewCursorStyleHandler: import("./src/EventTypeDefs").ControlCursorCallback;
    scaleSkewCursorStyleHandler: import("./src/EventTypeDefs").ControlCursorCallback;
    rotationWithSnapping: import("./src/EventTypeDefs").TransformActionHandler<import("./src/EventTypeDefs").Transform>;
    scalingEqually: import("./src/EventTypeDefs").TransformActionHandler<import("./src/EventTypeDefs").Transform & {
        gestureScale?: number | undefined;
        signX?: number | undefined;
        signY?: number | undefined;
    }>;
    scalingX: import("./src/EventTypeDefs").TransformActionHandler<import("./src/EventTypeDefs").Transform & {
        gestureScale?: number | undefined;
        signX?: number | undefined;
        signY?: number | undefined;
    }>;
    scalingY: import("./src/EventTypeDefs").TransformActionHandler<import("./src/EventTypeDefs").Transform & {
        gestureScale?: number | undefined;
        signX?: number | undefined;
        signY?: number | undefined;
    }>;
    scalingYOrSkewingX: import("./src/EventTypeDefs").TransformActionHandler<import("./src/EventTypeDefs").Transform>;
    scalingXOrSkewingY: import("./src/EventTypeDefs").TransformActionHandler<import("./src/EventTypeDefs").Transform>;
    changeWidth: import("./src/EventTypeDefs").TransformActionHandler<import("./src/EventTypeDefs").Transform>;
    skewHandlerX: import("./src/EventTypeDefs").TransformActionHandler<import("./src/EventTypeDefs").Transform>;
    skewHandlerY: import("./src/EventTypeDefs").TransformActionHandler<import("./src/EventTypeDefs").Transform>;
    dragHandler: import("./src/EventTypeDefs").TransformActionHandler<import("./src/EventTypeDefs").Transform>;
    createPolyControls: typeof createPolyControls;
    scaleOrSkewActionName: import("./src/EventTypeDefs").ControlCallback<"" | "scaleX" | "scaleY" | "skewX" | "skewY">;
    rotationStyleHandler: import("./src/EventTypeDefs").ControlCursorCallback;
    wrapWithFixedAnchor: typeof wrapWithFixedAnchor;
    wrapWithFireEvent: <T extends import("./src/EventTypeDefs").Transform>(eventName: import("./src/EventTypeDefs").TModificationEvents, actionHandler: import("./src/EventTypeDefs").TransformActionHandler<T>) => import("./src/EventTypeDefs").TransformActionHandler<T>;
    getLocalPoint: typeof getLocalPoint;
    renderCircleControl: typeof renderCircleControl;
    renderSquareControl: typeof renderSquareControl;
};
import { cache } from './src/cache';
import { VERSION as version, iMatrix } from './src/constants';
import { StaticCanvas } from './src/canvas/StaticCanvas';
import { Canvas } from './src/canvas/Canvas';
import { config } from './src/config';
import { loadSVGFromURL } from './src/parser/loadSVGFromURL';
import { loadSVGFromString } from './src/parser/loadSVGFromString';
import { initFilterBackend } from './src/filters/FilterBackend';
import { Canvas2dFilterBackend } from './src/filters/Canvas2dFilterBackend';
import { WebGLFilterBackend } from './src/filters/WebGLFilterBackend';
import { runningAnimations } from './src/util/animation/AnimationRegistry';
import { Observable } from './src/Observable';
import { FabricEvent as Event } from './src/FabricEvent';
import { Point } from './src/Point';
import { Intersection } from './src/Intersection';
import { Color } from './src/color/Color';
import { Control } from './src/controls/Control';
import { Gradient } from './src/gradient/Gradient';
import { Pattern } from './src/Pattern';
import { Shadow } from './src/Shadow';
import { BaseBrush } from './src/brushes/BaseBrush';
import { SimpleBrush } from './src/brushes/SimpleBrush';
import { PencilBrush } from './src/brushes/PencilBrush';
import { CircleBrush } from './src/brushes/CircleBrush';
import { SprayBrush } from './src/brushes/SprayBrush';
import { PatternBrush } from './src/brushes/PatternBrush';
import { DrawOval } from './src/brushes/DrawOval';
import { DrawPoly } from './src/brushes/DrawPoly';
import { DrawShape } from './src/brushes/DrawShape';
import { DrawShapeBase } from './src/brushes/DrawShapeBase';
import { EraserBrush, applyEraser } from './src/brushes/Eraser';
import { FabricObject as Object } from './src/shapes/Object/FabricObject';
import { Line } from './src/shapes/Line';
import { Circle } from './src/shapes/Circle';
import { Triangle } from './src/shapes/Triangle';
import { Ellipse } from './src/shapes/Ellipse';
import { Rect } from './src/shapes/Rect';
import { Path } from './src/shapes/Path';
import { Polyline } from './src/shapes/Polyline';
import { Polygon } from './src/shapes/Polygon';
import { Text } from './src/shapes/Text/Text';
import { IText } from './src/shapes/IText/IText';
import { Textbox } from './src/shapes/Textbox';
import { Group } from './src/shapes/Group';
import { ActiveSelection } from './src/shapes/ActiveSelection';
import { Image } from './src/shapes/Image';
import { getEnv, getDocument, getWindow, setEnvForTests } from './src/env';
import { createCollectionMixin } from './src/Collection';
import { parseAttributes } from './src/parser/parseAttributes';
import { parseElements } from './src/parser/parseElements';
import { getFilterBackend } from './src/filters/FilterBackend';
import { parseStyleAttribute } from './src/parser/parseStyleAttribute';
import { parsePointsAttribute } from './src/parser/parsePointsAttribute';
import { parseTransformAttribute } from './src/parser/parseTransformAttribute';
import { getCSSRules } from './src/parser/getCSSRules';
import './src/controls/default_controls';
export { parseElements, parseAttributes, cache, version, iMatrix, createCollectionMixin, StaticCanvas, Canvas, config, loadSVGFromURL, loadSVGFromString, initFilterBackend, Canvas2dFilterBackend, WebGLFilterBackend, runningAnimations, Point, Intersection, Color, Control, Observable, Event, Gradient, Pattern, Shadow, BaseBrush, SimpleBrush, PencilBrush, CircleBrush, SprayBrush, PatternBrush, DrawOval, DrawPoly, DrawShape, DrawShapeBase, EraserBrush, applyEraser, Object, Line, Circle, Triangle, Ellipse, Rect, Path, Polyline, Polygon, Text, IText, Textbox, Group, ActiveSelection, Image, controlsUtils, util, filters, getFilterBackend, getEnv, getDocument, getWindow, setEnvForTests, parseStyleAttribute, parsePointsAttribute, parseFontDeclaration, parseTransformAttribute, getCSSRules, };
//# sourceMappingURL=fabric.d.ts.map