import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
    products,
    sellerData,
    personData,
    chatMessageData,
} from '../../../mockData'

import styles from './ChatCard.module.scss'

interface ChatCardProps {
    productId: number
    onClick?: () => void
}

const ChatCard: React.FC<ChatCardProps> = ({ productId }) => {
    const navigate = useNavigate()
    const product = products.find((p) => p.id === productId)

    const seller = sellerData[0]
    const sellerPerson = personData.find((p) => p.id === seller.person_id)

    const lastMessage = chatMessageData
        .filter((msg) => msg.product_id === productId || msg.product_id === 101)
        .sort((a, b) => b.date - a.date)[0]

    const messageAuthor = personData.find(
        (p) => p.id === lastMessage?.person_id
    )

    const handleClick = () => {
        navigate(`/chat/${productId}`)
    }

    if (!product || !sellerPerson) {
        return <div className={styles.notFound}>Чат не найден</div>
    }

    return (
        <div className={styles.chat_card} onClick={handleClick}>
            <div className={styles.header}>
                <div className={styles.seller_info}>
                    <span className={styles.seller_name}>
                        {sellerPerson.first_name} {sellerPerson.last_name}
                    </span>
                    <span
                        className={`${styles.status} ${
                            styles[product.status.toLowerCase()]
                        }`}
                    >
                        {product.status}
                    </span>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.avatar}>
                    <img
                        src={sellerPerson.avatar_src}
                        alt={`${sellerPerson.first_name} ${sellerPerson.last_name}`}
                    />
                </div>

                <div className={styles.message_info}>
                    <div className={styles.message_author}>
                        {messageAuthor?.first_name} {messageAuthor?.last_name}
                    </div>
                    <div className={styles.message_text}>
                        {lastMessage?.text || 'Нет сообщений'}
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <span className={styles.moderator_badge}>Модератор</span>
            </div>
        </div>
    )
}

export default ChatCard
