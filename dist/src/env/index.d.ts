/**
 * This file is consumed by fabric.
 * The `./node` and `./browser` files define the env variable that is used by this module.
 * The `./node` module sets the env at import time.
 * The `./browser` module is defined to be the default env and doesn't set the env at all.
 * This is done in order to support isomorphic usage for browser and node applications
 * since window and document aren't defined at time of import in SSR, we can't set env so we avoid it by deferring to the default env.
 */
import { TFabricEnv } from './types';
import type { DOMWindow } from 'jsdom';
export declare const setEnv: (value: TFabricEnv) => void;
export declare const getEnv: () => TFabricEnv;
export declare const getDocument: () => Document;
export declare const getWindow: () => Window | DOMWindow;
export declare const setEnvForTests: (window: Window | DOMWindow) => void;
//# sourceMappingURL=index.d.ts.map