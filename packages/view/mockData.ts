import { Admin, ChatMessage, Moderator, Person, Seller } from './src/types'

export const products = [
    {
        id: 1,
        name: 'Холодильник',
        category: 'Электроника',
        width: 50,
        height: 140,
        depth: 50,
        volume: 200,
        mass: 50,
        compressorType: 'Линейный',
        compressorId: 1,
        price: 1000,
        img: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
        status: 'Отклонен',
        tags: ['1', '2'],
        seller: 'DNS',
    },
    {
        id: 2,
        name: 'Ноутбук',
        category: 'Техника',
        diagonal: 15,
        ram: 16,
        storage: 512,
        ramType: 'DDR4',
        power: 60,
        width: 35,
        height: 2,
        mass: 2,
        price: 800,
        img: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
        status: 'Принят',
        tags: ['1', '2'],
        seller: 'DNS',
    },
    {
        id: 3,
        name: 'Микроволновая печь',
        category: 'Электроника',
        volume: 25,
        mass: 14,
        power: 1200,
        microwaveFrequency: 2450,
        width: 50,
        height: 35,
        depth: 30,
        price: 400,
        img: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg',
        status: 'Спор',
        tags: ['1', '2'],
        seller: 'DNS',
    },
]

export const sellerData: Seller[] = [
    {
        person_id: 1,
        dispute_factor: 3,
    },
    {
        person_id: 2,
        dispute_factor: 1,
    },
    {
        person_id: 3,
        dispute_factor: 2,
    },
]

export const moderatorData: Moderator[] = [
    {
        person_id: 4,
        salary: 5000,
        birthdate: 19900101,
        employment_date: 20150501,
        correct_factor: 0.95,
    },
    {
        person_id: 5,
        salary: 6000,
        birthdate: 19850301,
        employment_date: 20180201,
        correct_factor: 0.92,
    },
    {
        person_id: 6,
        salary: 4500,
        birthdate: 19920715,
        employment_date: 20200601,
        correct_factor: 0.98,
    },
]

export const adminData: Admin[] = [
    {
        person_id: 7,
        login: 'admin1',
        password: 'password1',
    },
    {
        person_id: 8,
        login: 'admin2',
        password: 'password2',
    },
    {
        person_id: 9,
        login: 'admin3',
        password: 'password3',
    },
]

export const personData: Person[] = [
    {
        id: 1,
        type: 'seller',
        avatar_src: 'seller1.jpg',
        first_name: 'John',
        last_name: 'Doe',
        middle_name: 'A.',
        sex: 'male',
    },
    {
        id: 2,
        type: 'seller',
        avatar_src: 'seller2.jpg',
        first_name: 'Jane',
        last_name: 'Smith',
        middle_name: 'B.',
        sex: 'female',
    },
    {
        id: 3,
        type: 'moderator',
        avatar_src: 'moderator1.jpg',
        first_name: 'Michael',
        last_name: 'Johnson',
        middle_name: 'C.',
        sex: 'male',
    },
    {
        id: 4,
        type: 'admin',
        avatar_src: 'admin1.jpg',
        first_name: 'Emily',
        last_name: 'Williams',
        middle_name: 'D.',
        sex: 'female',
    },
]

export const chatMessageData: ChatMessage[] = [
    {
        id: 1,
        product_id: 101,
        person_id: 1,
        text: 'Здравствуйте, у меня вопрос по этому товару.',
        date: 1652131200,
    },
    {
        id: 2,
        product_id: 101,
        person_id: 2,
        text: 'Отличный товар, я его уже купил. Рекомендую!',
        date: 1652217600,
    },
    {
        id: 3,
        product_id: 102,
        person_id: 3,
        text: 'Скажите, а есть ли возможность доставки в мой город?',
        date: 1652304000,
    },
    {
        id: 4,
        product_id: 102,
        person_id: 4,
        text: 'Товар выглядит интересно, но хотелось бы больше информации.',
        date: 1652390400,
    },
]
