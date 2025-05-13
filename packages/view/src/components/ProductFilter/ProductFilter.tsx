import { FC } from 'react'

import styles from './ProductFilter.module.scss'
import cn from 'classnames'

type ProductFilterProps = {
    className?: string
}

export const ProductFilter: FC<ProductFilterProps> = (props) => {
    const { className } = props

    return (
        <div className={cn(styles['product-filter'], className)}>
            <div className={styles['message']}>Filters</div>
        </div>
    )
}
