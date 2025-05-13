import { SetStateAction, useEffect, useState } from 'react'
import { StorageSynchronizer } from './StorageSynchronizer'
import { AuthorizationStore } from './types'
import { authorizationStorage } from './authorizationStorage'

export const useAuthorizationStorage = () => {
    const [value, setValue] = useState<AuthorizationStore | null>(
        authorizationStorage.get()
    )

    useEffect(() => {
        const handler = (storage: StorageSynchronizer<AuthorizationStore | null>) => {
            setValue(storage.get())
        }

        authorizationStorage.subscribe(handler)
        return () => {
            authorizationStorage.unsubscribe(handler)
        }
    }, [])

    const setAuthorizationStorage = (
        value: SetStateAction<AuthorizationStore | null>
    ) => {
        if (typeof value === 'function') {
            authorizationStorage.set(value(authorizationStorage.get()))
        } else {
            authorizationStorage.set(value)
        }
    }

    return [value, setAuthorizationStorage] as const
}
