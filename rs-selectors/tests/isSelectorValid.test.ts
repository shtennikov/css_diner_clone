import { isSelectorValid } from "../src/utils/isSelectorValid";

describe('isSelectorValid', () => {
  it('should return true for a valid selector', () => {
    const validSelector = 'div.my-class > span[data-test="123"]';
    expect(isSelectorValid(validSelector)).toBe(true);
  });

  it('should return true for a valid selector containing special characters', () => {
    const validSelector = 'div.#my-class ~ span[data-test="123"]:hover';
    expect(isSelectorValid(validSelector)).toBe(true);
  });

  it('should return false for an empty selector', () => {
    const emptySelector = '';
    expect(isSelectorValid(emptySelector)).toBe(false);
  });

  it('should return false for a selector with unsupported characters', () => {
    const invalidSelector = 'div#my-class$ > span[data-test="123"]';
    expect(isSelectorValid(invalidSelector)).toBe(false);
  });
});
