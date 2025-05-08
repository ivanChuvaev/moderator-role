import { Admin } from '../types/Admin'

export class AdminTable {
    private admins: Map<string, Admin>

    constructor() {
        this.admins = new Map()
    }

    createAdmin(admin: Admin) {
        this.admins.set(admin.person_id, admin)
    }

    getAdmin(person_id: string) {
        return this.admins.get(person_id)
    }

    removeAdmin(person_id: string) {
        this.admins.delete(person_id)
    }
}
