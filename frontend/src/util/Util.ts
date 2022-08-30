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

export const convertDateToNumber = (input: Date | null) => {
    return Number(input);
}