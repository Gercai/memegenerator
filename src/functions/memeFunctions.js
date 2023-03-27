export const nextMeme = (setNumber,number) => {
    setNumber(number + 1);
}

export const lastMeme = (setNumber,number) => {
    setNumber(number - 1);
}

export const randomMeme = (setNumber, number) => {
    setNumber(Math.floor(Math.random() * 100));
} 