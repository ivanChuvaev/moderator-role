import { Admin } from '../types/Admin'

export class AdminTable {
    private admins: Map<string, Admin>

    constructor() {
        this.admins = new Map()
    }

    createAdmin(admin: Admin) {
        this.admins.set(admin.personId, admin)
    }

    getAdmin(personId: string) {
        return this.admins.get(personId)
    }

    removeAdmin(personId: string) {
        this.admins.delete(personId)
    }

    serialize() {
        return Array.from(this.admins.values())
    }

    parse(admins: Admin[]) {
        this.admins = new Map(admins.map((admin) => [admin.personId, admin]))
    }
}
