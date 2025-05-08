export type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}

export type TextSnakeToCamelCase<S extends string> =
    S extends `${infer P1}_${infer P2}${infer P3}`
        ? `${Lowercase<P1>}${Uppercase<P2>}${TextSnakeToCamelCase<P3>}`
        : Lowercase<S>

export type ObjectSnakeToCamelCase<T> = {
    [K in keyof T as TextSnakeToCamelCase<string & K>]: T[K]
}

export type TextCamelToSnakeCase<S extends string> =
    S extends `${infer T}${infer U}`
        ? `${T extends Capitalize<T>
              ? '_'
              : ''}${Lowercase<T>}${TextCamelToSnakeCase<U>}`
        : S

export type ObjectCamelToSnakeCase<T> = {
    [K in keyof T as TextCamelToSnakeCase<string & K>]: T[K]
}
