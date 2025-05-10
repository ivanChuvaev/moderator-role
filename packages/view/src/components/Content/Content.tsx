import { FC } from 'react'

import Chat from '../Chat/Chat'
import ProductsList from '../ProductsList/ProductsList'

import styles from './Content.module.scss'

interface ContentProps {
    showChat: boolean
    onOpenChat: () => void
}

const Content: FC<ContentProps> = ({ showChat, onOpenChat }) => {
    return (
        <div className={styles.main_content}>
            {showChat ? (
                <Chat productId={1} />
            ) : (
                <ProductsList onOpenChat={onOpenChat} />
            )}
        </div>
    )
}

export default Content
