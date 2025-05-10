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

    getChatMessages(productId: string) {
        return this.messages.filter(
            (message) => message.productId === productId
        )
    }

    serialize() {
        return this.messages
    }

    parse(messages: ChatMessage[]) {
        this.messages = messages
    }
}
