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