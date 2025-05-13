import { ChatMessage } from './ChatMessage'
import { FullPerson } from './FullPerson'
import { FullProduct } from './FullProduct'

export type FullChatMessage = ChatMessage & {
    person: FullPerson
    product: FullProduct
}
