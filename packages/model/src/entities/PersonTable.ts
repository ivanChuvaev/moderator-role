import { v4 as uuidv4 } from 'uuid'

import { Person } from '../types/Person'
import { Prettify } from '../types/utils'

export class PersonTable {
    private persons: Map<string, Person>

    constructor() {
        this.persons = new Map()
    }

    createPerson(person: Prettify<Omit<Person, 'id'>>): Person {
        const newPerson = {
            ...person,
            id: uuidv4(),
        }
        this.persons.set(newPerson.id, newPerson)
        return newPerson
    }

    getPersons(): Person[] {
        return Array.from(this.persons.values())
    }

    getPersonById(id: string): Person | undefined {
        return this.persons.get(id)
    }

    removePerson(id: string): void {
        this.persons.delete(id)
    }

    serialize() {
        return Array.from(this.persons.values())
    }

    parse(persons: Person[]) {
        this.persons = new Map(persons.map((person) => [person.id, person]))
    }
}
