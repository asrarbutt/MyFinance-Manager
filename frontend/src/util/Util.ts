export const dateFromInstant = (instant: number | null, locale: string) => {

    if (instant !== null) {
        const date = new Date(instant);
        const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'numeric', day: 'numeric'};
        return date.toLocaleDateString((locale) ? locale : undefined, options)
    }
}

export const stringToNumberWithDot = (input: string) => {
    return Number(input.replaceAll(",", "."));
}

export const convertDateToNumber = (date: Date | null) => {

    let dateInstant = null
    if (!!date && !!date.getTime()) {
        dateInstant = date.getTime();
    }
    return dateInstant;
}

export const convertAmountToGermanCurrencyStyle = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(amount);

}

export const getFirstLetters = (word: string) => {
    return word
        .split(' ')
        .map(w => w[0])
        .join('');
}

export const incomeExpanseList: string[] = ["Strom/Gas", "Essen", "Einkauf", "Miete", "Kleidung", "Lebensmittel", "Geschenke", "Bildung", "Gesundheit", "Gehalt", "Andere"];