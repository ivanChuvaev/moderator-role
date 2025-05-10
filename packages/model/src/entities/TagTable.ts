import { v4 as uuidv4 } from 'uuid'

import { Tag } from '../types/Tag'
import { Prettify } from '../types/utils'

export class TagTable {
    private tags: Map<string, Tag>

    constructor() {
        this.tags = new Map()
    }

    createTag(tag: Prettify<Omit<Tag, 'id'>>): Tag {
        const newTag = {
            ...tag,
            id: uuidv4(),
        }
        this.tags.set(newTag.id, newTag)
        return newTag
    }

    getTags(): Tag[] {
        return Array.from(this.tags.values())
    }

    getTagById(id: string): Tag | undefined {
        return this.tags.get(id)
    }

    removeTag(id: string): void {
        this.tags.delete(id)
    }

    serialize() {
        return Array.from(this.tags.values())
    }

    parse(tags: Tag[]) {
        this.tags = new Map(tags.map((tag) => [tag.id, tag]))
    }
}
