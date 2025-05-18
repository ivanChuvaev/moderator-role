import { PageLayout } from '@view/layouts/PageLayout'
import { Paper } from '@view/ui/Paper'

import styles from './ProductsPage.module.scss'
import { Protected } from '@view/components/Protected'
import { ProductFilter } from '@view/components/ProductFilter/ProductFilter'
import { ProductsList } from '@view/components/ProductList'

export const ProductsPage = () => {
    return (
        <Protected>
            <PageLayout fullHeight>
                <div className={styles.wrapper}>
                    <Paper className={styles.sidebar}>
                        <ProductFilter className={styles.filter} />
                    </Paper>
                    <ProductsList className={styles.products} />
                </div>
            </PageLayout>
        </Protected>
    )
}
