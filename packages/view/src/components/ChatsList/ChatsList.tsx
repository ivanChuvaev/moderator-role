import { FC } from 'react'

import { ChatCard } from '../ChatCard'

import styles from './ChatsList.module.scss'

interface ContentProps {
    width?: string
}

export const ChatsList: FC<ContentProps> = () => {
    return (
        <div className={styles.main_content}>
            <h2 className={styles.title}>Список чатов</h2>
            <div className={styles.chats_container}>
                <div>
                    <ChatCard productId={1} />
                    <ChatCard productId={2} />
                    <ChatCard productId={3} />
                </div>
            </div>
        </div>
    )
}
