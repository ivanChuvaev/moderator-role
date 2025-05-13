import { Engine } from '@model/Engine'
import { ProductCategory } from '@model/enums/ProductCategory'
import { ScenarioEntryType } from '@model/enums/ScenarioEntryType'
import { Sex } from '@model/enums/Sex'
import { PersonType } from '@model/enums/PersonType'
import { registrationStorage } from '@view/storageModule'

export const initialize = (engine: Engine) => {
    engine.reset()

    const seller = engine.createPerson({
        type: PersonType.SELLER,
        firstName: 'Adam',
        lastName: 'Smith',
        middleName: 'Alexandrovich',
        sex: Sex.MALE,
        disputeFactor: 1,
        avatarSrc: null,
    })

    engine.createPerson({
        type: PersonType.MODERATOR,
        firstName: 'John',
        lastName: 'Doe',
        middleName: 'Alexandrovich',
        sex: Sex.MALE,
        avatarSrc: null,
        salary: 10000,
        birthdate: new Date().getTime() - 315360000000 * 2.1,
        employmentDate: new Date().getTime() - 315360000000 * 0.3,
        correctFactor: 0.5,
    })

    engine.createPerson({
        type: PersonType.MODERATOR,
        firstName: 'Sarah',
        lastName: 'Johnson',
        middleName: 'Petrovna',
        sex: Sex.FEMALE,
        avatarSrc: null,
        salary: 12000,
        birthdate: new Date().getTime() - 315360000000 * 2.5,
        employmentDate: new Date().getTime() - 315360000000 * 0.4,
        correctFactor: 0.7,
    })

    engine.createPerson({
        type: PersonType.MODERATOR,
        firstName: 'Michael',
        lastName: 'Brown',
        middleName: 'Ivanovich',
        sex: Sex.MALE,
        avatarSrc: null,
        salary: 11000,
        birthdate: new Date().getTime() - 315360000000 * 3.2,
        employmentDate: new Date().getTime() - 315360000000 * 0.6,
        correctFactor: 0.6,
    })

    engine.createPerson({
        type: PersonType.MODERATOR,
        firstName: 'Emma',
        lastName: 'Wilson',
        middleName: 'Sergeevna',
        sex: Sex.FEMALE,
        avatarSrc: null,
        salary: 11500,
        birthdate: new Date().getTime() - 315360000000 * 2.9,
        employmentDate: new Date().getTime() - 315360000000 * 0.7,
        correctFactor: 0.65,
    })

    const adminsFromRegistrationStorage = registrationStorage.get()

    if (adminsFromRegistrationStorage) {
        Object.values(adminsFromRegistrationStorage).forEach((admin) => {
            engine.createPerson({
                type: PersonType.ADMIN,
                firstName: admin.firstName,
                lastName: admin.lastName,
                middleName: admin.middleName,
                sex: Sex.MALE,
                login: admin.login,
                password: admin.password,
                avatarSrc: null,
            })
        })
    }

    engine.createProduct({
        category: ProductCategory.REFRIGERATOR,
        name: 'Refrigerator 1',
        price: 100,
        sellerId: seller.id,
        width: 100,
        height: 100,
        depth: 100,
        volume: 100,
        mass: 100,
        dispute: {
            type: ScenarioEntryType.SELLER_DEFEND,
            text: 'Ты чего меня отменил?',
            children: [],
        },
    })

    engine.createProduct({
        category: ProductCategory.REFRIGERATOR,
        name: 'Refrigerator 2',
        price: 100,
        sellerId: seller.id,
        width: 100,
        height: 100,
        depth: 100,
        volume: 100,
        mass: 100,
        dispute: {
            type: ScenarioEntryType.SELLER_DEFEND,
            text: 'Почему вы отменили мою заявку? Я уже подготовил все документы и оплатил комиссию.',
            children: [
                {
                    type: ScenarioEntryType.MODERATOR_ADMIT,
                    text: 'Прошу прощения за неудобства. Ошибка будет исправлена.',
                    children: [],
                },
                {
                    type: ScenarioEntryType.MODERATOR_DEFEND,
                    text: 'Вы уверены, что все документы были заполнены корректно?',
                    children: [
                        {
                            type: ScenarioEntryType.SELLER_DEFEND,
                            text: 'Да, я проверил все документы несколько раз. Можете объяснить, в чем проблема?',
                            children: [
                                {
                                    type: ScenarioEntryType.MODERATOR_ADMIT,
                                    text: 'Прошу прощения за неудобства. Ошибка будет исправлена.',
                                    children: [],
                                },
                                {
                                    type: ScenarioEntryType.MODERATOR_DEFEND,
                                    text: 'В вашей заявке отсутствует подпись на странице 3. Пожалуйста, заполните документ полностью и отправьте повторно.',
                                    children: [
                                        {
                                            type: ScenarioEntryType.SELLER_IGNORE,
                                            text: '',
                                            children: [],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    })
}
