import { STORAGE_EVENT_KEY } from './constants'

export class StorageSynchronizer<T> {
    private key: string
    private listeners: Map<
        (storage: StorageSynchronizer<T>) => void,
        (event: Event) => void
    >

    constructor(key: string) {
        this.key = key
        this.listeners = new Map()
    }

    get() {
        const value = localStorage.getItem(this.key)
        if (!value) {
            return null
        }
        return JSON.parse(value) as T
    }

    set(value: T) {
        const event = new StorageEvent(STORAGE_EVENT_KEY, { key: this.key })

        localStorage.setItem(this.key, JSON.stringify(value))

        window.dispatchEvent(event)
    }

    clear() {
        localStorage.removeItem(this.key)
    }

    subscribe(callback: (storage: StorageSynchronizer<T>) => void) {
        const handler = (event: Event) => {
            if ((event as StorageEvent).key === this.key) {
                callback(this)
            }
        }

        this.listeners.set(callback, handler)

        window.addEventListener(STORAGE_EVENT_KEY, handler)
    }

    unsubscribe(callback: (storage: StorageSynchronizer<T>) => void) {
        const handler = this.listeners.get(callback)

        if (!handler) {
            return
        }

        window.removeEventListener(STORAGE_EVENT_KEY, handler)
    }
}
