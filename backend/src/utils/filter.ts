const BAD_WORDS = ['abused', 'killed', 'murdered', 'suicide', 'die', 'death']; // Basic list

export const cleanContent = (text: string): string => {
    let cleaned = text;
    BAD_WORDS.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        cleaned = cleaned.replace(regex, '*'.repeat(word.length));
    });
    return cleaned;
};

export const isProfane = (text: string): boolean => {
    return BAD_WORDS.some(word => new RegExp(`\\b${word}\\b`, 'gi').test(text));
};
