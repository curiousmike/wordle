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

export const saveGameState = (currentMapValues, keyboardData, currentRow) => {
    const gameState = JSON.stringify({ map: currentMapValues, keyboard: keyboardData, row: currentRow });
    return window.localStorage.setItem('gameState', gameState);
}

