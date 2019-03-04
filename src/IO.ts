import {
  ReadStream,
  WriteStream,
  access,
  createReadStream,
  createWriteStream,
} from 'fs';

import { Result } from './models';
import { createInterface } from 'readline';

const extractContent = (
  filePathInput: string,
  group1FilePathOutput: string,
  group2FilePathOutput: string,
  group1Filter: (s: string) => boolean
): Promise<Result> => {
  return new Promise<Result>((resolve, reject) => {
    areValidFileNames(
      filePathInput,
      group1FilePathOutput,
      group2FilePathOutput
    ).then(validFilenames => {
      if (validFilenames) {
        const readStream = createReadStream(filePathInput);
        const group1WriteStream = createWriteStream(group1FilePathOutput);
        const group2WriteStream = createWriteStream(group2FilePathOutput);

        readStream.on('open', () => {
          spiltContentIntoTwoFiles(
            readStream,
            group1WriteStream,
            group2WriteStream,
            group1Filter
          );
        });

        readStream.on('end', () => {
          return resolve(
            new Result(
              `Successfully wrote to files. Group1: ${group1FilePathOutput}. Group2: ${group2FilePathOutput}.`
            )
          );
        });

        readStream.on('error', reject);
      } else {
        return reject(
          `One or more of the filenames specified is not valid: ${filePathInput}, ${group1FilePathOutput}, ${group2FilePathOutput}.`
        );
      }
    });
  });
};

const spiltContentIntoTwoFiles = (
  stream: ReadStream,
  group1WriteStream: WriteStream,
  group2WriteStream: WriteStream,
  group1Filter: (s: string) => boolean
): void => {
  const streamInterface = createInterface(stream);

  streamInterface.on('line', input => {
    if (group1Filter(input)) {
      group1WriteStream.write(`${input}\n`, 'utf-8');
    } else {
      group2WriteStream.write(`${input}\n`, 'utf-8');
    }
  });

  streamInterface.on('close', () => {
    group1WriteStream.end();
    group2WriteStream.end();
  });
};

const fileExists = (filePath: string): Promise<boolean> => {
  return new Promise<boolean>((res, rej) => {
    access(filePath, error => (error ? res(false) : res(true)));
  });
};

const areValidFileNames = (
  input: string,
  output1: string,
  output2: string
): Promise<boolean> => {
  return fileExists(input).then(exists => {
    return exists && output1.length > 0 && output2.length > 0;
  });
};

export { extractContent, fileExists, areValidFileNames };
