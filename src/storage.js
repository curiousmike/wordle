export const readLevel = () => {
    const value = window.localStorage.getItem('level');
    if (value) {
        return parseInt(value, 10);
    }
    return null;
}

export const setLevel = (level) => {
    return window.localStorage.setItem('level', level);
}

export const readGameState = () => {
    const gameState = window.localStorage.getItem('gameState');
    if (gameState) {
        return JSON.parse(gameState);
    }
    return null;
}

export const saveGameState = (currentMapValues, keyboardData, currentRow, hint, longestStreak, currentStreak) => {
    const gameState = JSON.stringify({
        map: currentMapValues,
        keyboard: keyboardData,
        row: currentRow,
        hintStep: hint,
        longestStreak: longestStreak,
        currentStreak: currentStreak,
    });
    return window.localStorage.setItem('gameState', gameState);
}

export const saveGameResult = (gameData, index) => {
    const gameResult = JSON.stringify({
        map: gameData,
    });

    const currentResultIndices = window.localStorage.getItem('resultIndices');
    if (currentResultIndices) {
        const indices = JSON.parse(currentResultIndices);
        let bExists = false;
        for (let i = 0; i < indices.length; i++){
            if (indices[i] === index) {
                bExists = true;
                console.log('already exists');
            }
        }
        if (!bExists) {
            indices.push(index);
            const newIndices = JSON.stringify(indices);
            window.localStorage.setItem('resultIndices', newIndices);
        }
    } else {
        const indices = [];
        indices.push(index);
        const newIndices = JSON.stringify(indices);
        window.localStorage.setItem('resultIndices', newIndices);
    }
    return window.localStorage.setItem(`gameResult${index}`, gameResult);

}

export const loadGameResultIndices = () => {
    const indices = window.localStorage.getItem('resultIndices');
    if (indices) {
        return JSON.parse(indices);
    }
    return null;

}
