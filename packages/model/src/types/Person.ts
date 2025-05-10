import { PersonType } from '../enums/PersonType'
import { Sex } from '../enums/Sex'

export type Person = {
    id: string
    type: PersonType
    avatarSrc: string | null
    firstName: string
    lastName: string
    middleName: string
    sex: Sex
}
