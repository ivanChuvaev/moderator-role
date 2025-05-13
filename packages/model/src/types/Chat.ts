import { FullChatMessage } from './FullMessage'
import { FullProduct } from './FullProduct'

export type Chat = {
    fullProduct: FullProduct
    lastMessage: FullChatMessage
}
