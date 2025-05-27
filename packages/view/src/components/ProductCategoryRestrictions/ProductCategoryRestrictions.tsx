import {
    getRestrictionsByCategory,
    ProductCategory,
} from '@model'
import { Paper } from '@view/ui/Paper'

import styles from './ProductCategoryRestrictions.module.scss'

type ProductCategoryRestrictionsProps = {
    category: ProductCategory
}

export const ProductCategoryRestrictions = ({
    category,
}: ProductCategoryRestrictionsProps) => {
    const restrictions = getRestrictionsByCategory(category)
    return (
        <Paper className={styles['restrictions-paper']}>
            <restrictions-renderer data={JSON.stringify(restrictions)} />
        </Paper>
    )
}
