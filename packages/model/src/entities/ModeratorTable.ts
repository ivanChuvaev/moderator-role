import { Moderator } from '../types/Moderator'

export class ModeratorTable {
    private moderators: Map<string, Moderator>

    constructor() {
        this.moderators = new Map()
    }

    createModerator(moderator: Moderator) {
        this.moderators.set(moderator.person_id, moderator)
    }

    getModerator(person_id: string) {
        return this.moderators.get(person_id)
    }

    removeModerator(person_id: string) {
        this.moderators.delete(person_id)
    }
}
