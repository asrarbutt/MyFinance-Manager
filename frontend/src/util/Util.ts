export const dateFromInstant = (instant: number | null, locale: string) => {

    if (instant !== null) {
        const date = new Date(instant);
        console.log(instant)
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
