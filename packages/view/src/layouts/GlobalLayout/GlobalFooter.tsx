import { FC, useEffect, useRef } from 'react'

import styles from './GlobalFooter.module.scss'
import { Container } from '@view/ui/Container'
import { useGlobalLayout } from './hooks/useGlobalLayout'

export const GlobalFooter: FC = () => {
    const { setFooterHeight } = useGlobalLayout()

    const footerRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const footer = footerRef.current

        if (!footer) {
            return
        }

        const handleResize = () => {
            setFooterHeight(footer.clientHeight)
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [footerRef.current])

    return (
        <Container
            as="footer"
            ref={footerRef}
            className={styles.footer}
            classNameContent={styles.content}
            aria-atomic="true"
        >
            <div className={styles.logo}>Лого</div>
            <nav className={styles.navigation}>
                <ul>
                    <li>
                        <a href="#">Главная</a>
                    </li>
                    <li>
                        <a href="#">О нас</a>
                    </li>
                    <li>
                        <a href="#">Услуги</a>
                    </li>
                    <li>
                        <a href="#">Контакты</a>
                    </li>
                </ul>
            </nav>
            <div className={styles.copyright}>
                &copy; 2025 Моя Компания. Все права защищены.
            </div>
        </Container>
    )
}
