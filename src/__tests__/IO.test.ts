import { areValidFileNames, extractContent, fileExists } from '../IO';

import { containsPersian } from '../languageDetectors';

describe('fileExists', () => {
  test('should return true if file exists', () => {
    fileExists('./src/__tests__/testData/englishAndPersian.txt').then(result =>
      expect(result).toEqual(true)
    );
  });

  test('should return false if file exists', () => {
    fileExists('NotAFileName').then(result => expect(result).toEqual(false));
  });
});

describe('areValidFileNames', () => {
  test('should return true if all filenames are valid', () => {
    const input = './src/__tests__/testData/englishAndPersian.txt';
    const output1 = 'output1.txt';
    const output2 = 'output2.txt';
    areValidFileNames(input, output1, output2).then(valid =>
      expect(valid).toEqual(true)
    );
  });

  test('should return false if input filename is a file that does not exist', () => {
    const input = 'NotAFileName.txt';
    const output1 = 'output1.txt';
    const output2 = 'output2.txt';
    areValidFileNames(input, output1, output2).then(valid =>
      expect(valid).toEqual(false)
    );
  });

  test('should return false if output1 filename is an empty string', () => {
    const input = 'NotAFileName.txt';
    const output1 = '';
    const output2 = 'output2.txt';
    areValidFileNames(input, output1, output2).then(valid =>
      expect(valid).toEqual(false)
    );
  });

  test('should return false if output2 filename is an empty string', () => {
    const input = 'NotAFileName.txt';
    const output1 = 'output1.txt';
    const output2 = '';
    areValidFileNames(input, output1, output2).then(valid =>
      expect(valid).toEqual(false)
    );
  });
});

describe('extractContent', () => {
  test('should return a Result object if all filenames are valid', () => {
    const input = './src/__tests__/testData/englishAndPersian.txt';
    const output1 = '/tmp/out1.txt';
    const output2 = '/tmp/out2.txt';
    extractContent(input, output1, output2, containsPersian).then(result => {
      expect(result.message).toEqual(
        'Successfully wrote to files. Group1: /tmp/out1.txt. Group2: /tmp/out2.txt.'
      );
    });
  });

  test('should create output files if all filenames are valid', () => {
    const input = './src/__tests__/testData/englishAndPersian.txt';
    const output1 = '/tmp/out1.txt';
    const output2 = '/tmp/out2.txt';
    extractContent(input, output1, output2, containsPersian).then(result => {
      fileExists(output1).then(result => expect(result).toEqual(true));
      fileExists(output2).then(result => expect(result).toEqual(true));
    });
  });

  test('should complete successfully and return a Result object when reading in an empty file', () => {
    const input = './src/__tests__/testData/empty.txt';
    const output1 = '/tmp/out1.txt';
    const output2 = '/tmp/out2.txt';
    extractContent(input, output1, output2, containsPersian).then(result =>
      expect(result.message).toEqual(
        'Successfully wrote to files. Group1: /tmp/out1.txt. Group2: /tmp/out2.txt.'
      )
    );
  });

  test('should throw error if read file does not exist', async () => {
    try {
      await extractContent(
        'NotAFileName.txt',
        'file1.txt',
        'file2.txt',
        containsPersian
      );
    } catch (e) {
      expect(e).toEqual(
        'One or more of the filenames specified is not valid: NotAFileName.txt, file1.txt, file2.txt.'
      );
    }
  });

  test('should throw error if first output file name is an empty string', async () => {
    try {
      await extractContent(
        './src/__tests__/testData/englishAndPersian.txt',
        '',
        'file.txt',
        containsPersian
      );
    } catch (e) {
      expect(e).toEqual(
        'One or more of the filenames specified is not valid: ./src/__tests__/testData/englishAndPersian.txt, , file.txt.'
      );
    }
  });

  test('should throw error if second output file name is an empty string', async () => {
    try {
      await extractContent(
        './src/__tests__/testData/englishAndPersian.txt',
        'file.txt',
        '',
        containsPersian
      );
    } catch (e) {
      expect(e).toEqual(
        'One or more of the filenames specified is not valid: ./src/__tests__/testData/englishAndPersian.txt, file.txt, .'
      );
    }
  });
});
