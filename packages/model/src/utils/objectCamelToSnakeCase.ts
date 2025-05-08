import { Prettify, ObjectCamelToSnakeCase } from '../types/utils'

export const objectCamelToSnakeCase = <
    T extends Record<string, unknown>,
    R = Prettify<ObjectCamelToSnakeCase<T>>
>(
    object: T
): R => {
    return Object.fromEntries(
        Object.entries(object).map(([key, value]) => [
            key.replace(/([A-Z])/g, '_$1').toLowerCase(),
            value,
        ])
    ) as R
}
