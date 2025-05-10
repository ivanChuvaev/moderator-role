import { Chat } from '@view/components/Chat'
import { useParams } from 'react-router-dom'

export const ChatPageChat = () => {
    const { productId } = useParams()

    if (!productId) {
        return <div>Выберите чат</div>
    }

    return <Chat productId={parseInt(productId)} />
}
