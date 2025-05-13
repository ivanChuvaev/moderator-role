export const pluralize = (
    count: number,
    one: string,
    two: string,
    five: string
) => {
    let str = ''
    if (count % 10 === 1 && count % 100 !== 11) {
        str = one
    } else if (
        count % 10 >= 2 &&
        count % 10 <= 4 &&
        (count % 100 < 10 || count % 100 >= 20)
    ) {
        str = two
    } else {
        str = five
    }

    return str.replace('&_', count.toString())
}
