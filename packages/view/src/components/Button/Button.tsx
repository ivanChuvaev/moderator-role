import React from 'react'

import styles from './Button.module.scss'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface ButtonProps {
    label: string
    className?: string
    variant?: ButtonVariant
    onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
    label,
    variant = 'primary',
    onClick,
}) => {
    const buttonClassName = `${styles.button} ${styles[`button--${variant}`]}`

    return (
        <button className={buttonClassName} onClick={onClick}>
            {label}
        </button>
    )
}

export default Button
