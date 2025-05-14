import { FC, useEffect, useMemo } from 'react'

import { Button } from '../Button'

import styles from './Chat.module.scss'
import { useGameData } from '@view/hooks/useGameData'
import cn from 'classnames'
import { ScenarioEntryType, translateProductStatus } from '@model'
import { useAuthorizationStorage } from '@view/storageModule'
import { Paper } from '@view/ui/Paper'

type ChatProps = {
    productId: string
}

export const Chat: FC<ChatProps> = ({ productId }) => {
    const product = useGameData(
        (engine) => engine.getFullProduct(productId),
        [productId]
    )
    const [authorizationStorage] = useAuthorizationStorage()

    const admin = useGameData(
        (engine) =>
            authorizationStorage
                ? engine.getFullAdminByLogin(authorizationStorage.login)
                : undefined,
        [authorizationStorage]
    )

    const currentScenarioEntry = useGameData(
        (engine) => engine.getProductCurrentScenarioEntry(productId),
        [productId]
    )

    const answerScenarioEntries = useGameData(
        (engine) => engine.getProductCurrentScenarioEntryChildren(productId),
        [productId]
    )

    const continueDisputeByModerator = useGameData(
        (engine) => {
            return engine.continueDisputeByModerator
        },
        [productId]
    )

    const defendScenarioEntry = useMemo(
        () =>
            answerScenarioEntries.find(
                (entry) => entry.type === ScenarioEntryType.MODERATOR_DEFEND
            ),
        [answerScenarioEntries]
    )

    const admitScenarioEntry = useMemo(
        () =>
            answerScenarioEntries.find(
                (entry) => entry.type === ScenarioEntryType.MODERATOR_ADMIT
            ),
        [answerScenarioEntries]
    )

    const canAdmit = Boolean(product && admin && admitScenarioEntry)
    const canDefend = Boolean(product && admin && defendScenarioEntry)

    const messages = useGameData(
        (engine) => engine.getProductMessages(productId),
        [productId]
    )

    const bottomStatus = useMemo(() => {
        if (!currentScenarioEntry) return null

        switch (currentScenarioEntry.type) {
            case ScenarioEntryType.SELLER_IGNORE:
                return 'Продавец вас игнорирует'
            case ScenarioEntryType.SELLER_ADMIT:
                return 'Продавец признал ошибку'
            case ScenarioEntryType.MODERATOR_ADMIT:
                return 'Модератор признал ошибку'
        }

        return null
    }, [currentScenarioEntry])

    const defend = () => {
        if (!product || !admin || !defendScenarioEntry) return undefined
        return continueDisputeByModerator(
            productId,
            admin.id,
            defendScenarioEntry.id
        )
    }

    const admit = () => {
        if (!product || !admin || !admitScenarioEntry) return undefined
        return continueDisputeByModerator(
            productId,
            admin.id,
            admitScenarioEntry.id
        )
    }

    if (!product) {
        return (
            <div className={styles.notFound}>
                Товар с ID {productId} не найден
            </div>
        )
    }

    return (
        <div className={styles.chat}>
            <Paper className={styles['user-info']}>
                <div className={styles['user-info__seller']}>
                    <span className={styles.name}>
                        {product.seller.firstName} {product.seller.lastName}
                    </span>
                    <span className={styles.id}>ID: {product.seller.id}</span>
                    <span className={styles.status}>
                        {translateProductStatus(product.status)}
                    </span>
                </div>

                {product.moderator && (
                    <div className={styles['user-info__moderator']}>
                        <span className={styles.name}>
                            Модератор: {product.moderator.firstName}
                            {product.moderator.lastName}
                        </span>
                        <span className={styles.id}>
                            ID: {product.moderator.id}
                        </span>
                    </div>
                )}
            </Paper>
            <Paper className={styles.info}>
                <h3>{product.name}</h3>
                <p>Категория: {product.category}</p>
                <p>Цена: ${product.price}</p>
            </Paper>
            <Paper className={styles['chat-content']}>
                {messages.length > 0 ? (
                    <div className={styles['chat-content-messages']}>
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={cn(styles.message, {
                                    [styles['message--seller']]:
                                        message.person.id === product.seller.id,
                                })}
                            >
                                <div className={styles['message-meta']}>
                                    <span
                                        className={
                                            styles['message-meta__sender']
                                        }
                                    >
                                        {message.person.firstName}
                                        &nbsp;
                                        {message.person.lastName}
                                    </span>
                                    <span
                                        className={styles['message-meta__date']}
                                    >
                                        {new Date(
                                            message.date
                                        ).toLocaleString()}
                                    </span>
                                </div>
                                <div className={styles['message-text']}>
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles['chat-content-empty-message']}>
                        Нет сообщений в этом чате
                    </div>
                )}
                {bottomStatus && (
                    <div className={styles['chat-content-status']}>
                        {bottomStatus}
                    </div>
                )}
            </Paper>
            {(canDefend || canAdmit) && (
                <Paper className={styles.actions}>
                    {canDefend && (
                        <Button onClick={defend}>Отстаивать позицию</Button>
                    )}
                    {canAdmit && (
                        <Button variant="secondary" onClick={admit}>
                            Признать ошибку
                        </Button>
                    )}
                </Paper>
            )}
        </div>
    )
}
