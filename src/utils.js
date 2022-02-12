export const maxWordLength = 5;
export const maxRows = 6;
export const keyboardConstants = { ENTER: 'ENTER', ESCAPE: 'ESCAPE', BACKSPACE: 'BACKSPACE' };

export const doesLetterExistInWord = (word, letter) => {
    for (let column = 0; column < word.length; column++) {
      if (word[column] === letter.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

export const buildDefaultMap = () => {
  const map = [];
  for (let row = 0; row < maxRows; row++) {
    map[row] = [];
    for (let col = 0; col < maxWordLength; col++) {
      map[row][col] = { value: '' };
    }
  }
  return map;
}
