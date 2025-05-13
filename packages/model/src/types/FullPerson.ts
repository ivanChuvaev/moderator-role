import { Prettify } from './utils'
import { PersonAdmin } from './PersonAdmin'
import { PersonModerator } from './PersonModerator'
import { PersonSeller } from './PersonSeller'

export type FullPerson =
    | Prettify<PersonAdmin>
    | Prettify<PersonModerator>
    | Prettify<PersonSeller>
