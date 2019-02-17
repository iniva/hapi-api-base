/* global describe it expect */

import { slug, capitalize, camelize } from './string';

describe('Helpers: String', () => {
  it('should return a slugged version of a string', () => {
    const resultText = slug('the title is clear');

    expect(resultText).toBe('the-title-is-clear');
  });

  it('should return a capitalized version of a string', () => {
    const resultText = capitalize('the title is clear');

    expect(resultText).toBe('The title is clear');
  });

  it('should return a camelized version of a single word string', () => {
    const normalWord = camelize('greenhouse');
    const accentedWord = camelize('árbol');

    expect(normalWord).toBe('Greenhouse');
    expect(accentedWord).toBe('Árbol');
  });

  it('should return a camelized version of a multiple word string', () => {
    const normalString = camelize('the title is clear');
    const accentedString = camelize('el árbol es único');

    expect(normalString).toBe('The Title Is Clear');
    expect(accentedString).toBe('El Árbol Es Único');
  });
});
