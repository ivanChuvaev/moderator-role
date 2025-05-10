// eslint-disable-next-line import/no-unresolved
import { Avatar as BaseAvatar } from '@base-ui-components/react/avatar'
import { CSSProperties, FC } from 'react'

import styles from './Avatar.module.scss'

interface AvatarProps {
    src?: string
    alt?: string
    width?: number | string
    height?: number | string
    fallbackText?: string
    className?: string
    imageClassName?: string
    fallbackClassName?: string
    style?: CSSProperties
}

export const Avatar: FC<AvatarProps> = ({
    src,
    alt = 'User avatar',
    width = 48,
    height = 48,
    fallbackText,
    className = '',
    imageClassName = '',
    fallbackClassName = '',
    style = {},
}) => {
    const getFallback = () => {
        if (fallbackText) {
            return fallbackText
                .split(' ')
                .map((word) => word[0])
                .join('')
                .toUpperCase()
        }
        return 'US'
    }

    return (
        <BaseAvatar.Root
            className={`${styles.root} ${className}`}
            style={{ width, height, ...style }}
        >
            {src && (
                <BaseAvatar.Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className={`${styles.image} ${imageClassName}`}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                    }}
                />
            )}
            <BaseAvatar.Fallback
                className={`${styles.fallback} ${fallbackClassName}`}
            >
                {getFallback()}
            </BaseAvatar.Fallback>
        </BaseAvatar.Root>
    )
}
