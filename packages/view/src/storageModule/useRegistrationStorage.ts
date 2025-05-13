import { SetStateAction, useEffect, useState } from 'react'
import { StorageSynchronizer } from './StorageSynchronizer'
import { RegistrationStore } from './types'
import { registrationStorage } from './registrationStorage'

export const useRegistrationStorage = () => {
    const [value, setValue] = useState<RegistrationStore | null>(
        registrationStorage.get()
    )

    useEffect(() => {
        const handler = (storage: StorageSynchronizer<RegistrationStore>) => {
            setValue(storage.get())
        }

        registrationStorage.subscribe(handler)
        return () => {
            registrationStorage.unsubscribe(handler)
        }
    }, [])

    const setRegistrationStorage = (
        value: SetStateAction<RegistrationStore | null>
    ) => {
        if (typeof value === 'function') {
            registrationStorage.set(value(registrationStorage.get()))
        } else {
            registrationStorage.set(value)
        }
    }

    return [value, setRegistrationStorage] as const
}
