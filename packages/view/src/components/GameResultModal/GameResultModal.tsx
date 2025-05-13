import { Dialog } from '@base-ui-components/react/dialog'
import styles from './GameResultModal.module.scss'
import { Button } from '../Button'
import { useGameData } from '@view/hooks/useGameData'
import { FC } from 'react'
import { game } from '@view/game'

export const GameResultModal: FC = ({}) => {
    const isEnd = useGameData((engine) => engine.getIsEnd())

    const isWinner = true
    const score = 100

    const onRestart = () => {
        game.restart()
    }

    return (
        <Dialog.Root open={isEnd}>
            <Dialog.Portal>
                <Dialog.Backdrop className={styles.backdrop} />
                <Dialog.Popup className={styles.popup}>
                    {isWinner ? (
                        <>
                            <Dialog.Title className={styles.title}>
                                Поздравляем!
                            </Dialog.Title>
                            <div className={styles.winner_Content}>
                                <p className={styles.message}>
                                    Вы успешно завершили игру!
                                </p>
                                <div className={styles.score}>
                                    Ваш счет: <span>{score}</span>
                                </div>
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
                        <Dialog.Close>
                            <Button>Закрыть</Button>
                        </Dialog.Close>
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
