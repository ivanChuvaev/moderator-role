import { Moderator } from '../types/Moderator'

export class ModeratorTable {
    private moderators: Map<string, Moderator>

    constructor() {
        this.moderators = new Map()
    }

    createModerator(moderator: Moderator) {
        this.moderators.set(moderator.personId, moderator)
    }

    deleteModerator(personId: string) {
        this.moderators.delete(personId)
    }

    getModerator(personId: string) {
        return this.moderators.get(personId)
    }

    getModerators() {
        return Array.from(this.moderators.values())
    }

    removeModerator(personId: string) {
        this.moderators.delete(personId)
    }

    serialize() {
        return Array.from(this.moderators.values())
    }

    parse(moderators: Moderator[]) {
        this.moderators = new Map(
            moderators.map((moderator) => [moderator.personId, moderator])
        )
    }
}
