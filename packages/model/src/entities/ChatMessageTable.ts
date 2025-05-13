import { v4 as uuidv4 } from 'uuid'

import { ChatMessage } from '../types/ChatMessage'
export class ChatMessageTable {
    private messages: ChatMessage[] = []

    constructor() {
        this.messages = []
    }

    createChatMessage(productId: string, personId: string, text: string) {
        const message: ChatMessage = {
            id: uuidv4(),
            productId: productId,
            personId: personId,
            text,
            date: Date.now(),
        }

        this.messages.push(message)

        return message
    }

    getChatMessage(messageId: string): ChatMessage | undefined {
        return this.messages.find((message) => message.id === messageId)
    }

    getChatMessages(productId: string): ChatMessage[] {
        return this.messages.filter(
            (message) => message.productId === productId
        )
    }

    getLastChatMessage(productId: string): ChatMessage | undefined {
        const messages = this.getChatMessages(productId)
        return messages[messages.length - 1]
    }

    serialize() {
        return this.messages
    }

    parse(messages: ChatMessage[]) {
        this.messages = messages
    }
}
