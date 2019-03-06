const alphaRegEx: RegExp = new RegExp(/[a-z]|[A-Z]/, 'g');

const containsOnlyAlphaCharacters = (text: string): boolean => {
  const alphaCharacters: RegExpMatchArray = text.match(alphaRegEx) || [];
  return alphaCharacters.length === text.length;
};

export { containsOnlyAlphaCharacters };
