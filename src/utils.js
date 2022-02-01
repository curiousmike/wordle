export const maxWordLength = 5;
export const maxRows = 6;

export const doesLetterExistInWord = (word, letter) => {
    for (let column = 0; column < word.length; column++) {
      if (word[column] === letter.toLowerCase()) {
        return true;
      }
    }
    return false;
  }
