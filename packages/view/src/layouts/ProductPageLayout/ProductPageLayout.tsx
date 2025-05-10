import { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { products } from '../../../mockData'
import Button from '../../components/Button/Button'
import ProductCard from '../../components/ProductCard/ProductCard'

import styles from './ProductPageLayout.module.scss'

interface ProductPageLayoutProps {
    productId?: number
}

const ProductPageLayout: FC<ProductPageLayoutProps> = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const product = products.find((product) => product.id === Number(id))

    const handleClick = () => {
        navigate(`/chat/${product?.id}`)
    }
    if (!product) {
        return <h3>Товар не найден</h3>
    }

    return (
        <main className={styles.product_main}>
            <div className={styles.product_page}>
                <ProductCard product={product} onOpenChat={handleClick} />
                <div className={styles.product_description}>
                    <h3>Описание товара</h3>
                    <div>Описание товара</div>
                </div>
            </div>

            <div className={styles.product_description}>
                <h3>Характеристики товара</h3>
                <span>{product?.diagonal}</span>
                <span>{product?.depth}</span>
                <span>{product?.mass}</span>
                <span>{product?.volume}</span>
            </div>

            <div className={styles.product_actions}>
                <Button label="Отклонить" variant="danger" />
                <Button label="Принять" />
            </div>
        </main>
    )
}

export default ProductPageLayout
