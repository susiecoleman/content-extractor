# Content Extractor

Node module that takes a text file and splits it into 2 files based on a filter. The split is done at the level of an individual line in the file.

## Usage

`yarn add content-extractor`

### Example

Filtering a text file based on a alpha filter. The filter will be fed the text file a line at a time and make a decision about if it matches the criteria or not.

```javascript
const languageExtractor = require('content-extractor');

const filter = languageExtractor.containsOnlyAlphaCharacters;

languageExtractor.extractContent(
  'input.txt',
  'alpha.txt',
  'everythingElse.txt',
  filter
);
```

#### Expected Input and Output

Input:
`input.txt`

```
ABC
!!!
```

Apply `containsOnlyAlphaCharacters` filter

Output:
`alpha.txt`

```
ABC
```

`everythingElse.txt`

```
!!!
```

### Providing your own filter

A filter is a function that takes a string and returns a boolean. Typescript example:

```typescript
const numberRegEx: RegExp = new RegExp(/[0-9]/, 'g');

const numberFilter = (s: string): boolean => {
  const chars = s.match(numberRegEx) || [];
  return chars.length === s.length;
};
```

## Provided Filters

### Persian Filter

- The Persian language filter is based on the Unicode Range for Arabic Script. The API will not be able to filter on different languages if they both use Arabic characters

- That a single line would not be expected to contain a mix of Persian and Non Persian and that the presence of Persian characters is an indicator of the line being in Persian

- That a line that contains only numbers ([Hindu-Arabic numerals](<https://en.wikipedia.org/wiki/Arabic_numerals_(disambiguation)>)) cannot be assumed to be Persian.

- That latin punctuation used in Persian, e.g. full stops, should not be used as an indicator of Persian

### Alpha Filter

- Extracts text that contains only the characters a-z. It is not case sensitive and rejects text that contains whitespace.
