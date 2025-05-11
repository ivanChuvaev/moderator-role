import * as React from 'react'
import { Dialog } from '@base-ui-components/react/dialog'
import styles from './GameOverModal.module.scss'
import { Button } from '../Button'

interface GameOverModalProps {
    isOpen: boolean
    onClose: () => void
    isWinner: boolean
    score?: number
    onRestart?: () => void
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
    isOpen,
    onClose,
    isWinner,
    score = 100,
    onRestart,
}) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
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
                        {onRestart && (
                            <Button
                                className={styles.restart_button}
                                onClick={onRestart}
                                label="Играть снова"
                            />
                        )}
                        <Dialog.Close>
                            <Button label="Закрыть" />
                        </Dialog.Close>
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
