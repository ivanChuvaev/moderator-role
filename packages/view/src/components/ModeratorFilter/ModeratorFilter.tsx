import { FC } from 'react'

import styles from './ModeratorFilter.module.scss'
import cn from 'classnames'

type ModeratorFilterProps = {
    className?: string
}

export const ModeratorFilter: FC<ModeratorFilterProps> = (props) => {
    const { className } = props

    return (
        <div className={cn(styles['moderator-filter'], className)}>
            <div className={styles['message']}>Filters</div>
        </div>
    )
}
