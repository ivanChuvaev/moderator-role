import { FC } from 'react'

import { ChatCard } from '../ChatCard'
import { useGameData } from '@view/hooks/useGameData'
import styles from './ChatsList.module.scss'

type ChatsListProps = {
    selectedProductId?: string
}

export const ChatsList: FC<ChatsListProps> = (props) => {
    const { selectedProductId } = props
    const chats = useGameData((engine) => engine.getChats())

    if (chats.length === 0) {
        return (
            <div className={styles.message}>
                <div>Список чатов пуст</div>
            </div>
        )
    }

    return (
        <>
            {chats.map((chat) => (
                <ChatCard
                    key={chat.fullProduct.id}
                    chat={chat}
                    selected={selectedProductId === chat.fullProduct.id}
                />
            ))}
        </>
    )
}
