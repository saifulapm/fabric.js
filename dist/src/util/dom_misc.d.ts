/**
 * Wraps element with another element
 * @param {HTMLElement} element Element to wrap
 * @param {HTMLElement|String} wrapper Element to wrap with
 * @param {Object} [attributes] Attributes to set on a wrapper
 * @return {HTMLElement} wrapper
 */
export declare function wrapElement(element: HTMLElement, wrapper: HTMLDivElement): HTMLDivElement;
/**
 * Returns element scroll offsets
 * @param {HTMLElement} element Element to operate on
 * @return {Object} Object with left/top values
 */
export declare function getScrollLeftTop(element: HTMLElement): {
    left: number;
    top: number;
};
/**
 * Returns offset for a given element
 * @param {HTMLElement} element Element to get offset for
 * @return {Object} Object with "left" and "top" properties
 */
export declare function getElementOffset(element: HTMLElement): {
    left: number;
    top: number;
};
/**
 * Makes element unselectable
 * @param {HTMLElement} element Element to make unselectable
 * @return {HTMLElement} Element that was passed in
 */
export declare function makeElementUnselectable(element: HTMLElement): HTMLElement;
/**
 * Makes element selectable
 * @param {HTMLElement} element Element to make selectable
 * @return {HTMLElement} Element that was passed in
 */
export declare function makeElementSelectable(element: HTMLElement): HTMLElement;
//# sourceMappingURL=dom_misc.d.ts.map