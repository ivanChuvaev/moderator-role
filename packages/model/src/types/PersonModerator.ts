import { PersonType } from '../enums/PersonType'

import { Moderator } from './Moderator'
import { Person } from './Person'
import { Prettify } from './utils'

export type PersonModerator = Prettify<
    Omit<Person, 'type'> & { type: PersonType.MODERATOR } & Omit<
            Moderator,
            'person_id'
        >
>
