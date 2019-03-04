import {
  ReadStream,
  WriteStream,
  access,
  createReadStream,
  createWriteStream,
} from 'fs';

import { Result } from './models';
import { containsPersian } from './languageDetectors';
import { createInterface } from 'readline';

const extractContent = (
  filePath: string,
  notPersianFilePath: string,
  persianFilePath: string
): Promise<Result> => {
  return new Promise<Result>((resolve, reject) => {
    areValidFileNames(filePath, notPersianFilePath, persianFilePath).then(
      validFilenames => {
        if (validFilenames) {
          const readStream = createReadStream(filePath);
          const notPersianWriteStream = createWriteStream(notPersianFilePath);
          const persianWriteStream = createWriteStream(persianFilePath);

          readStream.on('open', () => {
            spiltContentIntoTwoFiles(
              readStream,
              notPersianWriteStream,
              persianWriteStream
            );
          });

          readStream.on('end', () => {
            return resolve(
              new Result(
                `Successfully wrote to files. Persian: ${persianFilePath}. Not Persian: ${notPersianFilePath}.`
              )
            );
          });

          readStream.on('error', reject);
        } else {
          return reject(
            `One or more of the filenames specified is not valid: ${filePath}, ${notPersianFilePath}, ${persianFilePath}.`
          );
        }
      }
    );
  });
};

const spiltContentIntoTwoFiles = (
  stream: ReadStream,
  notPersianWriteStream: WriteStream,
  persianWriteStream: WriteStream
): void => {
  const streamInterface = createInterface(stream);

  streamInterface.on('line', input => {
    if (containsPersian(input)) {
      persianWriteStream.write(`${input}\n`, 'utf-8');
    } else {
      notPersianWriteStream.write(`${input}\n`, 'utf-8');
    }
  });

  streamInterface.on('close', () => {
    persianWriteStream.end();
    notPersianWriteStream.end();
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
