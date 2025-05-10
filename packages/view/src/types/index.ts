export interface Product {
    id: number
    name: string
    img: string
    category: string
    tags: string[]
    seller: string
    price: number
    status: string
}

export interface Seller {
    person_id: number
    dispute_factor: number
}

export interface Moderator {
    person_id: number
    salary: number
    birthdate: number
    employment_date: number
    correct_factor: number
}

export interface Admin {
    person_id: number
    login: string
    password: string
}

export interface Person {
    id: number
    type: 'seller' | 'moderator' | 'admin'
    avatar_src: string
    first_name: string
    last_name: string
    middle_name: string
    sex: 'male' | 'female'
}

export interface ChatMessage {
    id: number
    product_id: number
    person_id: number
    text: string
    date: number
}
