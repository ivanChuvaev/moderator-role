import { FC, ReactNode } from 'react'

import { ChatCard } from '../ChatCard'
import { useGameData } from '@view/hooks/useGameData'
import styles from './ChatsList.module.scss'
import cn from 'classnames'

type ChatsListProps = {
    selectedProductId?: string
    className?: string
}

export const ChatsList: FC<ChatsListProps> = (props) => {
    const { selectedProductId, className } = props
    const chats = useGameData((engine) => engine.getChats())

    let content: ReactNode

    if (chats.length === 0) {
        content = (
            <div className={styles.message}>
                <div>Список чатов пуст</div>
            </div>
        )
    } else {
        content = (
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

    return <div className={cn(styles.list, className)}>{content}</div>
}
