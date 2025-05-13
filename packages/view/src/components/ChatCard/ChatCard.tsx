import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './ChatCard.module.scss'
import { Chat } from '@model'
import { translateProductStatus } from '@model'
import cn from 'classnames'

interface ChatCardProps {
    chat: Chat
    selected?: boolean
}

export const ChatCard: FC<ChatCardProps> = (props) => {
    const { chat, selected } = props
    const navigate = useNavigate()

    const handleClick = () => {
        if (selected) {
            navigate('/chats')
        } else {
            navigate(`/chats/${chat.fullProduct.id}`)
        }
    }

    return (
        <div
            className={cn(styles['chat-card'], {
                [styles['chat-card--selected']]: selected,
            })}
            onClick={handleClick}
        >
            <div className={styles.header}>
                <div className={styles['seller-info']}>
                    <span className={styles['seller-name']}>
                        {chat.fullProduct.seller.firstName}{' '}
                        {chat.fullProduct.seller.lastName}
                    </span>
                    <span className={styles.status}>
                        {translateProductStatus(chat.fullProduct.status)}
                    </span>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.avatar}>
                    <img
                        src={
                            chat.fullProduct.seller.avatarSrc ??
                            '/images/empty.png'
                        }
                        alt="seller avatar"
                    />
                </div>

                <div className={styles['message-info']}>
                    <div className={styles['message-author']}>
                        {chat.lastMessage.person.firstName}
                        &nbsp;
                        {chat.lastMessage.person.lastName}
                    </div>
                    <div className={styles['message-text']}>
                        {chat.lastMessage.text}
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <span className={styles['moderator-badge']}>Модератор</span>
            </div>
        </div>
    )
}
