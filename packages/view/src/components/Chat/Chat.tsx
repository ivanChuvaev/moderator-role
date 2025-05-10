import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import {
    products,
    sellerData,
    moderatorData,
    personData,
    chatMessageData,
} from '@view/mockData'

import { Button } from '../Button'

import styles from './Chat.module.scss'

interface ChatProps {
    productId?: number
}

export const Chat: FC<ChatProps> = ({ productId }) => {
    const navigate = useNavigate()

    const currentProduct = products.find((p) => p.id === productId)

    const seller = sellerData[0]
    const sellerPerson = personData.find((p) => p.id === seller.person_id)

    const moderator = moderatorData[0]
    const moderatorPerson = personData.find((p) => p.id === moderator.person_id)

    const messages = chatMessageData
        .filter((msg) => msg.product_id === productId || msg.product_id === 101)
        .map((msg) => {
            const sender = personData.find((p) => p.id === msg.person_id)
            return {
                ...msg,
                senderName: sender
                    ? `${sender.first_name} ${sender.last_name}`
                    : 'Неизвестный',
                isReply: msg.person_id !== seller.person_id,
                date: new Date(msg.date * 1000).toLocaleString('ru-RU'),
            }
        })

    const handleBack = () => {
        navigate(-1)
    }

    if (!currentProduct) {
        return (
            <div className={styles.notFound}>
                Товар с ID {productId} не найден
            </div>
        )
    }

    return (
        <main className={styles.chat_container}>
            <div className={styles.chat_header}>
                <button className={styles.back_button} onClick={handleBack}>
                    ← Назад
                </button>
                <div className={styles.user_info}>
                    <div className={styles.seller_info}>
                        <span className={styles.name}>
                            {sellerPerson?.first_name} {sellerPerson?.last_name}
                        </span>
                        <span className={styles.id}>
                            ID: {seller.person_id}
                        </span>
                        <span className={styles.status}>
                            {currentProduct.status}
                        </span>
                    </div>

                    {moderatorPerson && (
                        <div className={styles.moderator_info}>
                            <span className={styles.name}>
                                Модератор: {moderatorPerson.first_name}{' '}
                                {moderatorPerson.last_name}
                            </span>
                            <span className={styles.id}>
                                ID: {moderator.person_id}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.product_info}>
                <h3>{currentProduct.name}</h3>
                <p>Категория: {currentProduct.category}</p>
                <p>Цена: ${currentProduct.price}</p>
            </div>

            <div className={styles.messages_container}>
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={`${styles.message} ${
                                message.isReply ? styles.reply : ''
                            }`}
                        >
                            <div className={styles.message_meta}>
                                <span className={styles.sender}>
                                    {message.senderName}
                                </span>
                                <span className={styles.date}>
                                    {message.date}
                                </span>
                            </div>
                            <div className={styles.message_text}>
                                {message.text}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.noMessages}>
                        Нет сообщений в этом чате
                    </div>
                )}
            </div>
            <div className={styles.product_actions}>
                <Button label="Отстаивать позицию" />
                <Button label="Признать ошибку" variant="secondary" />
            </div>
        </main>
    )
}
