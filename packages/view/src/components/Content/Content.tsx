import { FC } from 'react'

import { Chat } from '../Chat'
import { ProductsList } from '../ProductList'

import styles from './Content.module.scss'

interface ContentProps {
    showChat: boolean
    productId?: number
}

export const Content: FC<ContentProps> = (props) => {
    const { showChat, productId } = props
    return (
        <div className={styles.main_content}>
            {showChat && productId ? (
                <Chat productId={productId} />
            ) : (
                <ProductsList />
            )}
        </div>
    )
}
