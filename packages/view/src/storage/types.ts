import { PersonAdmin } from "@model/types/PersonAdmin"

export type RegistrationStore = Record<
    string,
    Omit<PersonAdmin, 'id' | 'type' | 'avatarSrc' | 'sex'>
>

export type AuthorizationStore = {
    login: string
    password: string
}
