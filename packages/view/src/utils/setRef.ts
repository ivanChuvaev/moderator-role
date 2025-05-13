import { RefCallback, MutableRefObject } from 'react'

export const setRef = <T>(
    ref: RefCallback<T> | MutableRefObject<T> | null,
    value: T
) => {
    if (!ref) {
        return
    }

    if (typeof ref === 'function') {
        ref(value)
    } else if (ref) {
        ref.current = value
    }
}
