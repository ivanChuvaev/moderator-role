import { Prettify, ObjectSnakeToCamelCase } from '../types/utils'

export const objectSnakeToCamelCase = <
    T extends Record<string, unknown>,
    R = Prettify<ObjectSnakeToCamelCase<T>>
>(
    object: T
): R => {
    return Object.fromEntries(
        Object.entries(object).map(([key, value]) => [
            key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
            value,
        ])
    ) as R
}
