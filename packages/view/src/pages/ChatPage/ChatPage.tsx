import { Chat } from '@view/components/Chat'
import { useParams } from 'react-router-dom'
import styles from './ChatPage.module.scss'
import { Paper } from '@view/ui/Paper'

export const ChatPage = () => {
    const { productId } = useParams()

    if (!productId) {
        return <Paper className={styles.message}>Выберите чат</Paper>
    }

    return <Chat productId={productId} />
}
