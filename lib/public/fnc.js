export const KapitalTeks = (sentence = null) => {
    if (!sentence) {
        return ''
    } else {
        const words = sentence.split(' ');
        const capitalizedWords = words.map((word, index) => {
            const isFirstLetterCapital = /^[A-Z]/.test(word);
            if (index === 0 || !isFirstLetterCapital) {
                const firstLetter = word.charAt(0).toUpperCase();
                const restOfWord = word.slice(1).toLowerCase();
                return firstLetter + restOfWord;
            }
            return word;
        });
        const capitalizedSentence = capitalizedWords.join(' ');
        return capitalizedSentence;
    }
}

export const pageprivasi = () => {
    const semuanama = [
        'kebijakan privasi',
        'syarat dan ketentuan',
        'disklaimer',
        'tentang kami',
        'kontak kami',
        'deskripsi'
    ]
    return semuanama
}
