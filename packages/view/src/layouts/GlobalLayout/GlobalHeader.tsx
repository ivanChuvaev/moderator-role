import { FC } from 'react'
import { Link } from 'react-router-dom'

import styles from './GlobalHeader.module.scss'
import { Container } from '@view/ui/Container'
import { useGameData } from '@view/hooks/useGameData'

export const GlobalHeader: FC = () => {
    const time = useGameData((engine) => engine.getTime())
    const maxTime = useGameData((engine) => engine.getMaxTime())

    return (
        <Container
            className={styles['header-container']}
            classNameContent={styles.header}
        >
            <div>Moderator role game</div>
            <div className={styles['right-side']}>
                <span>{time}/{maxTime}</span>
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
            </div>
        </Container>
    )
}
