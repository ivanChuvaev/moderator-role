import { REGISTRATION_STORAGE_KEY } from './constants'
import { StorageSynchronizer } from './StorageSynchronizer'
import { RegistrationStore } from './types'

export const registrationStorage = new StorageSynchronizer<RegistrationStore | null>(
    REGISTRATION_STORAGE_KEY
)
