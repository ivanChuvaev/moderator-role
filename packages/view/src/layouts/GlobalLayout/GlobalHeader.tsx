import { FC, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './GlobalHeader.module.scss'
import { Container } from '@view/ui/Container'
import { useGameData } from '@view/hooks/useGameData'
import { Button } from '@view/components/Button'
import { useAuthorizationStorage } from '@view/storage/useAuthorizationStorage'
import { useGlobalLayout } from './hooks/useGlobalLayout'
import { ProductStatus } from '@model'

export const GlobalHeader: FC = () => {
    const time = useGameData((engine) => engine.getTime())
    const maxTime = useGameData((engine) => engine.getMaxTime())
    const [productCount, checkedCount] = useGameData((engine) => {
        const products = engine.getFullProducts()
        const total = products.length
        const checked = products.filter(
            (product) => product.status !== ProductStatus.PENDING
        ).length
        return [total, checked]
    })
    const chatsCount = useGameData((engine) => {
        return engine
            .getChats()
            .filter(
                (chat) => chat.fullProduct.status === ProductStatus.DISPUTED
            ).length
    })

    const stopGame = useGameData((engine) => engine.stop)
    const headerRef = useRef<HTMLElement>(null)

    const [, setAuthorizationStorage] = useAuthorizationStorage()

    const { setHeaderHeight } = useGlobalLayout()

    const handleEnd = () => {
        stopGame()
    }

    const handleLogout = () => {
        setAuthorizationStorage(null)
    }

    // Set global layout header height
    useEffect(() => {
        const header = headerRef.current

        if (!header) {
            return
        }

        const handleResize = () => {
            setHeaderHeight(header.clientHeight)
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [headerRef.current])

    return (
        <Container
            as="header"
            ref={headerRef}
            className={styles['header-container']}
            classNameContent={styles.header}
        >
            <div>Moderator role game</div>
            <div className={styles['right-side']}>
                <span>
                    Проверено: {checkedCount}/{productCount}
                </span>
                <hr className={styles['vertical-separator']} />
                <span>
                    Время: {time}/{maxTime}
                </span>
                <hr className={styles['vertical-separator']} />
                <nav className={styles.header_nav}>
                    <ul>
                        <li>
                            <NavLink to="/moderators">Модераторы</NavLink>
                        </li>
                        <li>
                            <NavLink to="/chats">
                                Чаты{chatsCount > 0 ? ` (${chatsCount})` : null}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/products">Товары</NavLink>
                        </li>
                    </ul>
                </nav>
                <hr className={styles['vertical-separator']} />
                <Button variant="secondary" onClick={handleEnd}>
                    Завершить
                </Button>
                <Button variant="secondary" onClick={handleLogout}>
                    Выйти
                </Button>
            </div>
        </Container>
    )
}
