export function isSelectorValid(selector: string): boolean {
    const selectorRegex = /^([a-zA-Z0-9\s.#_-]+|\[.*?\]|:.*?)+$/;

    const isValid = selectorRegex.test(selector);

    return isValid;
}
