import { containsPersian } from '../index';

describe('Check containsPersian', () => {
  test('should return true if the string contains Persian', () => {
    const input: string =
      'سال ۲۰۱۹ با نمایشگاه بین‌المللی سی ای اس در لاس‌وگاس آغاز شد';
    const expectedResult: boolean = true;
    expect(containsPersian(input)).toEqual(expectedResult);
  });

  test('should return true if the string contains Arabic question mark', () => {
    const input: string = '؟';
    const expectedResult: boolean = true;
    expect(containsPersian(input)).toEqual(expectedResult);
  });

  test('should return true if the string contains Arabic semi colon', () => {
    const input: string = '؛';
    const expectedResult: boolean = true;
    expect(containsPersian(input)).toEqual(expectedResult);
  });

  test('should return true if the string contains Arabic comma', () => {
    const input: string = '،';
    const expectedResult: boolean = true;
    expect(containsPersian(input)).toEqual(expectedResult);
  });

  test('should return false if string does not contain Persian', () => {
    const input: string = 'This is English';
    const expectedResult: boolean = false;
    expect(containsPersian(input)).toEqual(expectedResult);
  });

  test('should return true if string contains a mixture of Persian and another language', () => {
    const input: string =
      'ما تلاش می کنیم چند و چون نمایشگاه سی ای اس English Text را با شما در میان بذاریم با...';
    const expectedResult: boolean = true;
    expect(containsPersian(input)).toEqual(expectedResult);
  });

  test('should return false if passed an empty string', () => {
    const input: string = '';
    const expectedResult: boolean = false;
    expect(containsPersian(input)).toEqual(expectedResult);
  });

  test('should return false if string contains only numbers', () => {
    const input: string = '1234';
    const expectedResult: boolean = false;
    expect(containsPersian(input)).toEqual(expectedResult);
  });
});
