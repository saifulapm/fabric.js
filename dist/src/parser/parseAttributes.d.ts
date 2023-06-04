/**
 * Returns an object of attributes' name/value, given element and an array of attribute names;
 * Parses parent "g" nodes recursively upwards.
 * @param {SVGElement | HTMLElement} element Element to parse
 * @param {Array} attributes Array of attributes to parse
 * @return {Object} object containing parsed attributes' names/values
 */
export declare function parseAttributes(element: SVGElement | HTMLElement, attributes: string[], svgUid?: string): Record<string, any>;
//# sourceMappingURL=parseAttributes.d.ts.map