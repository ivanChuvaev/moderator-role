import { FC } from 'react'

import { Chat } from '../Chat'
import { ProductsList } from '../ProductsList'

import styles from './Content.module.scss'

interface ContentProps {
    showChat: boolean
    productId?: number
    onOpenChat: (productId: number) => void
}

export const Content: FC<ContentProps> = (props) => {
    const { showChat, productId, onOpenChat } = props
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
