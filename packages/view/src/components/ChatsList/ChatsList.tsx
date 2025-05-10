import { FC } from 'react'

import styles from './ChatsList.module.scss'

interface ContentProps {
    width?: string
}

const ChatsList: FC<ContentProps> = () => {
    return (
        <div className={styles.main_content}>
            <h2>Список чатов</h2>
            <div className={styles.products_container}>
                <ul>
                    <li>чат 1</li>
                    <li>чат 2</li>
                    <li>чат 3</li>
                </ul>
            </div>
        </div>
    )
}

export default ChatsList
