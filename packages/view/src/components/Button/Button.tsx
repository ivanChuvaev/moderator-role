import {
    FC,
    ButtonHTMLAttributes,
    forwardRef,
    useRef,
    useCallback,
} from 'react'

import styles from './Button.module.scss'
import cn from 'classnames'
import { setRef } from '@view/utils/setRef'
import { useFreezeElementSize } from '@view/hooks/useFreezeElementSize'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

type ButtonProps = {
    variant?: ButtonVariant
    loading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonProps> = forwardRef<
    HTMLButtonElement,
    ButtonProps
>((props, ref) => {
    const {
        className,
        variant = 'primary',
        loading = false,
        children,
        ...restProps
    } = props

    const buttonRef = useRef<HTMLButtonElement>(null)

    const handleSetButtonRef = useCallback(
        (button: HTMLButtonElement) => {
            setRef(ref, button)
            setRef(buttonRef, button)
        },
        [ref]
    )

    useFreezeElementSize(buttonRef, loading)

    return (
        <button
            ref={handleSetButtonRef}
            className={cn(
                styles.button,
                styles[`button--${variant}`],
                className
            )}
            {...restProps}
        >
            {loading ? 'Loading...' : children}
        </button>
    )
})
