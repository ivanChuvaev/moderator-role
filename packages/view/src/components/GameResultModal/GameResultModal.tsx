import { Dialog } from '@base-ui-components/react/dialog'
import styles from './GameResultModal.module.scss'
import { Button } from '../Button'
import { useGameData } from '@view/hooks/useGameData'
import { FC } from 'react'
import { game } from '@view/game'
import { useNavigate } from 'react-router-dom'

export const GameResultModal: FC = ({}) => {
    const navigate = useNavigate()
    const isEnd = useGameData((engine) => engine.getIsEnd())
    const statistics = useGameData((engine) => engine.getGameStatistics())

    const onRestart = () => {
        navigate('/products')
        game.restart()
    }

    const statisticsNode = (
        <div className={styles.statistics}>
            <div>Принято: </div>
            <div>{statistics.approvedCount}</div>
            <div>Отклонено: </div>
            <div>{statistics.rejectedCount}</div>
            <div>На рассмотрении: </div>
            <div>{statistics.disputedCount}</div>
            <div>Неправильно: </div>
            <div>{statistics.wrongCount}</div>
        </div>
    )

    return (
        <Dialog.Root open={isEnd}>
            <Dialog.Portal>
                <Dialog.Backdrop className={styles.backdrop} />
                <Dialog.Popup className={styles.popup}>
                    {statistics.isWinner ? (
                        <>
                            <Dialog.Title className={styles.title}>
                                Поздравляем!
                            </Dialog.Title>
                            <div className={styles.winner_Content}>
                                <p className={styles.message}>
                                    Вы успешно завершили игру!
                                </p>
                                {statisticsNode}
                                <div className={styles.fireworks}>🎉</div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Dialog.Title className={styles.title}>
                                Игра окончена
                            </Dialog.Title>
                            <div className={styles.loser_content}>
                                <p className={styles.message}>
                                    К сожалению, вы не смогли победить...
                                </p>
                                <p className={styles.encouragement}>
                                    Но не расстраивайтесь! Попробуйте еще раз!
                                </p>
                                {statisticsNode}
                                <div className={styles.sadFace}>😢</div>
                            </div>
                        </>
                    )}

                    <div className={styles.actions}>
                        <Button
                            className={styles.restart_button}
                            onClick={onRestart}
                        >
                            Играть снова
                        </Button>
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
