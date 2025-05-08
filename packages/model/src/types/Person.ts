import { PersonType } from '../enums/PersonType'
import { Sex } from '../enums/Sex'

export type Person = {
    id: string
    type: PersonType
    avatar_src: string
    first_name: string
    last_name: string
    middle_name: string
    sex: Sex
}
