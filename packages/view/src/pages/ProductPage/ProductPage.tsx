import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@view/components/Button/Button'
import { ProductCard } from '@view/components/ProductCard/ProductCard'

import styles from './ProductPage.module.scss'
import { PageLayout } from '@view/layouts/PageLayout'
import { Protected } from '@view/components/Protected'
import { useGameData } from '@view/hooks/useGameData'
import { ProductCharacteristics } from './ProductCharacteristics'
import { useAuthorizationStorage } from '@view/storageModule'
import { ProductStatus } from '@model/index'
import { Paper } from '@view/ui/Paper'

interface ProductPageProps {
    productId?: number
}

export const ProductPage: FC<ProductPageProps> = () => {
    const { id } = useParams<{ id: string }>()

    const [authorizationStore] = useAuthorizationStorage()

    const product = useGameData((engine) =>
        id ? engine.getFullProduct(id) : undefined
    )

    const admin = useGameData((engine) =>
        authorizationStore
            ? engine.getFullAdminByLogin(authorizationStore.login)
            : null
    )

    const approveProduct = useGameData((engine) => engine.approveProduct)
    const rejectProduct = useGameData((engine) => engine.rejectProduct)

    const handleApprove = () => {
        if (!product || !admin) return
        approveProduct(product.id, admin.id)
    }

    const handleReject = () => {
        if (!product || !admin) return
        rejectProduct(product.id, admin.id)
    }

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

                    {product.status === ProductStatus.PENDING && (
                        <Paper className={styles.actions}>
                            <Button variant="danger" onClick={handleReject}>
                                Отклонить
                            </Button>
                            <Button onClick={handleApprove}>Принять</Button>
                        </Paper>
                    )}
                </div>
            </PageLayout>
        </Protected>
    )
}
