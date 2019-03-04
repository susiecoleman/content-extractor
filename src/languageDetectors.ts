const arabicCharacters = '[\u0600-\u06ff]';

const persianRegEx: RegExp = new RegExp(arabicCharacters, 'g');

const containsPersian = (text: string): boolean => {
  const persianCharacters: RegExpMatchArray = text.match(persianRegEx) || [];
  return persianCharacters.length > 0;
};

export { containsPersian };
