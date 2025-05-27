import { PageLayout } from '@view/layouts/PageLayout'
import { Paper } from '@view/ui/Paper'

import styles from './ProductsPage.module.scss'
import { Protected } from '@view/components/Protected'
import { ProductFilter } from '@view/components/ProductFilter/ProductFilter'
import { ProductsList } from '@view/components/ProductList'
import { useState } from 'react'
import { FilterProductFilters } from '@view/helpers/filterProducts'
import { useRenderCount } from '@view/hooks/useRenderCount'

export const ProductsPage = () => {
    const [filters, setFilters] = useState<FilterProductFilters>({
        category: 'ALL',
        price_range: [0, 800],
    })

    useRenderCount()

    return (
        <Protected>
            <PageLayout fullHeight>
                <div className={styles.wrapper}>
                    <Paper className={styles.sidebar}>
                        <ProductFilter
                            className={styles.filter}
                            defaultFilters={filters}
                            onChangeFilters={setFilters}
                        />
                    </Paper>
                    <ProductsList
                        className={styles.products}
                        filters={filters}
                    />
                </div>
            </PageLayout>
        </Protected>
    )
}
