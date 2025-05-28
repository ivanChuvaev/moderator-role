import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { ProductCard } from '@view/components/ProductCard/ProductCard'

import styles from './ProductPage.module.scss'
import { PageLayout } from '@view/layouts/PageLayout'
import { Protected } from '@view/components/Protected'
import { useGameData } from '@view/hooks/useGameData'
import { ProductCharacteristics } from './ProductCharacteristics'
import { Paper } from '@view/ui/Paper'
import { ProductCategoryRestrictions } from '@view/components/ProductCategoryRestrictions'

interface ProductPageProps {
    productId?: number
}

export const ProductPage: FC<ProductPageProps> = () => {
    const { id } = useParams<{ id: string }>()

    const product = useGameData((engine) =>
        id ? engine.getFullProduct(id) : undefined
    )

    if (!product) {
        return <h3>Товар не найден</h3>
    }

    return (
        <Protected>
            <PageLayout>
                <div className={styles['product-page']}>
                    <ProductCard product={product} />

                    <Paper className={styles['characteristics-paper']}>
                        <h3>Характеристики товара</h3>
                        <ProductCharacteristics
                            product={product}
                            className={styles['characteristics']}
                        />
                    </Paper>

                    <Paper>
                        <ProductCategoryRestrictions
                            category={product.category}
                        />
                    </Paper>
                </div>
            </PageLayout>
        </Protected>
    )
}
