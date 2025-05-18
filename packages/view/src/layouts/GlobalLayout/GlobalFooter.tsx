import { FC } from 'react'

import styles from './GlobalFooter.module.scss'
import { Container } from '@view/ui/Container'

export const GlobalFooter: FC = () => {
    return (
        <footer className={styles.footer}>
            <Container classNameContent={styles.content}>
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
        </footer>
    )
}
