import { PersonType } from '../enums/PersonType'

import { Person } from './Person'
import { Seller } from './Seller'
import { Prettify } from './utils'

export type PersonSeller = Prettify<
    Omit<Person, 'type'> & { type: PersonType.SELLER } & Omit<
            Seller,
            'person_id'
        >
>
