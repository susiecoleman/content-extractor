import { containsOnlyAlphaCharacters } from '../contentDetectors';

describe('containsOnlyAlphaCharacters', () => {
  test('should return true if string contains only lowercase alpha characters', () => {
    const input = 'abc';
    expect(containsOnlyAlphaCharacters(input)).toEqual(true);
  });

  test('should return true if string contains only uppercase alpha characters', () => {
    const input = 'ABC';
    expect(containsOnlyAlphaCharacters(input)).toEqual(true);
  });

  test('should return true if string contains only uppercase and lowercase alpha characters', () => {
    const input = 'AvC';
    expect(containsOnlyAlphaCharacters(input)).toEqual(true);
  });

  test('should return false if string contains numbers', () => {
    const input = '2abc1';
    expect(containsOnlyAlphaCharacters(input)).toEqual(false);
  });

  test('should return false if string contains full stops', () => {
    const input = 'abc.';
    expect(containsOnlyAlphaCharacters(input)).toEqual(false);
  });

  test('should return false if string contains spaces', () => {
    const input = 'ab c';
    expect(containsOnlyAlphaCharacters(input)).toEqual(false);
  });
});
