import { FC } from 'react'
import { Link } from 'react-router-dom'

import styles from './GlobalHeader.module.scss'
import { Container } from '@view/ui/Container'
import { useGameData } from '@view/hooks/useGameData'
import { Button } from '@view/components/Button'
import { useAuthorizationStorage } from '@view/storageModule/useAuthorizationStorage'

export const GlobalHeader: FC = () => {
    const time = useGameData((engine) => engine.getTime())
    const maxTime = useGameData((engine) => engine.getMaxTime())
    const stopGame = useGameData((engine) => engine.stop)

    const [, setAuthorizationStorage] = useAuthorizationStorage()

    const handleEnd = () => {
        stopGame()
    }

    const handleLogout = () => {
        setAuthorizationStorage(null)
    }

    return (
        <Container
            className={styles['header-container']}
            classNameContent={styles.header}
        >
            <div>Moderator role game</div>
            <div className={styles['right-side']}>
                <Button variant="secondary" onClick={handleEnd}>
                    Завершить
                </Button>
                <span>
                    {time}/{maxTime}
                </span>
                <nav className={styles.header_nav}>
                    <ul>
                        <Link to="/moderators">
                            <li>Модераторы</li>
                        </Link>
                        <Link to="/chats">
                            <li>Чаты</li>
                        </Link>
                        <Link to="/products">
                            <li>Товары</li>
                        </Link>
                    </ul>
                </nav>
                <Button variant="secondary" onClick={handleLogout}>
                    Выйти
                </Button>
            </div>
        </Container>
    )
}
