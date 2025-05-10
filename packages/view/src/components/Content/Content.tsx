import { FC } from 'react'

import Chat from '../Chat/Chat'
import ProductsList from '../ProductsList/ProductsList'

import styles from './Content.module.scss'

interface ContentProps {
    showChat: boolean
    productId?: number
    onOpenChat: (productId: number) => void
}

const Content: FC<ContentProps> = ({ showChat, onOpenChat, productId }) => {
    return (
        <div className={styles.main_content}>
            {showChat && productId ? (
                <Chat productId={productId} />
            ) : (
                <ProductsList onOpenChat={onOpenChat} />
            )}
        </div>
    )
}

export default Content
