import { PersonType } from '../enums/PersonType'

import { Admin } from './Admin'
import { Person } from './Person'
import { Prettify } from './utils'

export type PersonAdmin = Prettify<
    Omit<Person, 'type'> & { type: PersonType.ADMIN } & Omit<Admin, 'personId'>
>
