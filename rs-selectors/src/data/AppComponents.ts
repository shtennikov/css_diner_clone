import { Components } from "../types";

/**
 * Object to store dynamically generated DOM elements
 *
 * Example:
 * {
 *     headerComponent: {
 *         header: BaseComponent,
 *         navBar: BaseComponent,
 *         ...
 *     },
 *     ...,
 * }
 *
 */
export const AppComponents: Record<string, Components> = {};
