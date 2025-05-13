import { StorageSynchronizer } from './StorageSynchronizer'
import { AUTHORIZATION_STORAGE_KEY } from './constants'
import { AuthorizationStore } from './types'

export const authorizationStorage = new StorageSynchronizer<AuthorizationStore | null>(
    AUTHORIZATION_STORAGE_KEY
)
