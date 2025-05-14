import { Engine } from '@model/Engine'
import { PersonType } from '@model/enums/PersonType'
import { Sex } from '@model/enums/Sex'
import { ScenarioEntryType } from '@model/enums/ScenarioEntryType'
import { ProductCategory } from '@model/enums/ProductCategory'
import { registrationStorage } from '@view/storageModule'

export const scenarioA = (engine: Engine) => {
    const seller = engine.createPerson({
        type: PersonType.SELLER,
        firstName: 'Adam',
        lastName: 'Smith',
        middleName: 'David',
        sex: Sex.MALE,
        disputeFactor: 1,
        avatarSrc: null,
    })

    engine.createPerson({
        type: PersonType.MODERATOR,
        firstName: 'John',
        lastName: 'Doe',
        middleName: 'William',
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
        middleName: 'Elizabeth',
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
        middleName: 'James',
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
        middleName: 'Katherine',
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
        category: ProductCategory.MICROWAVE,
        name: 'Samsung MC28H5013AK Smart Oven',
        price: 200,
        sellerId: seller.id,
        width: 50,
        height: 30,
        depth: 40,
        volume: 28,
        power: 900,
        mass: 15,
        microwaveFrequency: 2450,
        maxTemperature: 200,
        dispute: {
            type: ScenarioEntryType.SELLER_DEFEND,
            text: 'Почему мой товар отклонен? Все характеристики соответствуют официальным данным.',
            admit: {
                type: ScenarioEntryType.MODERATOR_ADMIT,
                text: 'Извините за ошибку, ваш товар действительно соответствует всем требованиям.',
            },
            defend: {
                type: ScenarioEntryType.MODERATOR_DEFEND,
                text: 'Нам требуется дополнительное подтверждение безопасности микроволновой печи.',
                reply: {
                    type: ScenarioEntryType.SELLER_DEFEND,
                    text: 'У меня есть все сертификаты безопасности. Куда их загрузить?',
                    admit: {
                        type: ScenarioEntryType.MODERATOR_ADMIT,
                        text: 'Спасибо за оперативный ответ. Теперь все в порядке.',
                    },
                    defend: {
                        type: ScenarioEntryType.MODERATOR_DEFEND,
                        text: 'Загрузите их в раздел сертификации товара.',
                        reply: {
                            type: ScenarioEntryType.SELLER_ADMIT,
                            text: 'Хорошо, сейчас загружу все необходимые сертификаты.',
                        },
                    },
                },
            },
        },
    })

    engine.createProduct({
        category: ProductCategory.FAN_HEATER,
        name: 'Dyson Pure Hot+Cool HP07',
        price: 180,
        sellerId: seller.id,
        width: 25,
        height: 76,
        depth: 25,
        power: 2000,
        mass: 5.9,
        maxTemperature: 37,
        area: 28,
        dispute: {
            type: ScenarioEntryType.SELLER_DEFEND,
            text: 'Добрый день! Не могу понять причину отказа в размещении товара.',
            admit: {
                type: ScenarioEntryType.MODERATOR_ADMIT,
                text: 'После проверки подтверждаю, что товар соответствует требованиям. Приносим извинения.',
            },
            defend: {
                type: ScenarioEntryType.MODERATOR_DEFEND,
                text: 'В описании отсутствует информация о системе безопасности от перегрева.',
                reply: {
                    type: ScenarioEntryType.SELLER_DEFEND,
                    text: 'Система безопасности указана в технических характеристиках - автоотключение при перегреве.',
                    admit: {
                        type: ScenarioEntryType.MODERATOR_ADMIT,
                        text: 'Да, теперь вижу. Товар одобрен.',
                    },
                    defend: {
                        type: ScenarioEntryType.MODERATOR_DEFEND,
                        text: 'Пожалуйста, добавьте эту информацию в основное описание.',
                        reply: {
                            type: ScenarioEntryType.SELLER_ADMIT,
                            text: 'Понятно, сейчас добавлю в основное описание.',
                        },
                    },
                },
            },
        },
    })

    engine.createProduct({
        category: ProductCategory.MICROWAVE,
        name: 'LG NeoChef MS2535GIS',
        price: 170,
        sellerId: seller.id,
        width: 45,
        height: 25,
        depth: 35,
        volume: 25,
        power: 1000,
        mass: 12,
        microwaveFrequency: 2450,
        maxTemperature: 220,
        dispute: {
            type: ScenarioEntryType.SELLER_DEFEND,
            text: 'Здравствуйте! Мой товар отклонен, хотя все характеристики указаны верно.',
            admit: {
                type: ScenarioEntryType.MODERATOR_ADMIT,
                text: 'Вы правы, все указано корректно. Товар одобрен.',
            },
            defend: {
                type: ScenarioEntryType.MODERATOR_DEFEND,
                text: 'Требуется уточнить информацию о типе управления и режимах работы.',
                reply: {
                    type: ScenarioEntryType.SELLER_DEFEND,
                    text: 'Все режимы работы указаны в спецификации, управление сенсорное.',
                    admit: {
                        type: ScenarioEntryType.MODERATOR_ADMIT,
                        text: 'Спасибо за уточнение. Товар одобрен.',
                    },
                    defend: {
                        type: ScenarioEntryType.MODERATOR_DEFEND,
                        text: 'Нужно также указать наличие функции защиты от детей.',
                        reply: {
                            type: ScenarioEntryType.SELLER_ADMIT,
                            text: 'Хорошо, добавлю информацию о защите от детей.',
                        },
                    },
                },
            },
        },
    })

    engine.createProduct({
        category: ProductCategory.LAPTOP,
        name: 'ASUS ROG Zephyrus G14',
        price: 250,
        sellerId: seller.id,
        width: 32.4,
        height: 22,
        diagonal: 14,
        storage: 1024,
        ram: 32,
        power: 180,
        mass: 1.7,
        dispute: {
            type: ScenarioEntryType.SELLER_DEFEND,
            text: 'Почему товар отклонен? У меня официальная поставка от производителя.',
            admit: {
                type: ScenarioEntryType.MODERATOR_ADMIT,
                text: 'Приношу извинения, проверка подтвердила подлинность товара.',
            },
            defend: {
                type: ScenarioEntryType.MODERATOR_DEFEND,
                text: 'Необходимо предоставить сертификат официального дистрибьютора.',
                reply: {
                    type: ScenarioEntryType.SELLER_IGNORE,
                },
            },
        },
    })

    engine.createProduct({
        category: ProductCategory.REFRIGERATOR,
        name: 'Haier HB25FSSAAA',
        price: 300,
        sellerId: seller.id,
        width: 90,
        height: 190,
        depth: 70,
        volume: 500,
        mass: 98,
        dispute: {
            type: ScenarioEntryType.SELLER_DEFEND,
            text: 'Добрый день, мой товар заблокировали без объяснения причин.',
            admit: {
                type: ScenarioEntryType.MODERATOR_ADMIT,
                text: 'Проверка завершена, блокировка снята. Приносим извинения.',
            },
            defend: {
                type: ScenarioEntryType.MODERATOR_DEFEND,
                text: 'Укажите, пожалуйста, класс энергопотребления в характеристиках.',
                reply: {
                    type: ScenarioEntryType.SELLER_ADMIT,
                    text: 'Спасибо за подсказку, сейчас добавлю.',
                },
            },
        },
    })

    engine.createProduct({
        category: ProductCategory.MICROWAVE,
        name: 'Panasonic NN-ST25HBZPE',
        price: 120,
        sellerId: seller.id,
        width: 44,
        height: 25.8,
        depth: 34,
        volume: 20,
        power: 800,
        mass: 11,
        microwaveFrequency: 2450,
        maxTemperature: 180,
        dispute: {
            type: ScenarioEntryType.SELLER_DEFEND,
            text: 'Не согласен с отклонением, все сертификаты приложены.',
            admit: {
                type: ScenarioEntryType.MODERATOR_ADMIT,
                text: 'Действительно, все документы в порядке. Товар одобрен.',
            },
            defend: {
                type: ScenarioEntryType.MODERATOR_DEFEND,
                text: 'Сертификат безопасности просрочен, нужен актуальный документ.',
                reply: {
                    type: ScenarioEntryType.SELLER_DEFEND,
                    text: 'Прикрепляю актуальный сертификат безопасности.',
                    admit: {
                        type: ScenarioEntryType.MODERATOR_ADMIT,
                        text: 'Отлично, теперь всё в порядке.',
                    },
                    defend: {
                        type: ScenarioEntryType.MODERATOR_DEFEND,
                        text: 'Этот сертификат не содержит печати производителя.',
                        reply: {
                            type: ScenarioEntryType.SELLER_ADMIT,
                            text: 'Понял, запрошу у производителя правильный документ.',
                        },
                    },
                },
            },
        },
    })

    engine.createProduct({
        category: ProductCategory.FAN_HEATER,
        name: 'DeLonghi HFX65V20',
        price: 90,
        sellerId: seller.id,
        width: 18.5,
        height: 55,
        depth: 15,
        power: 2000,
        mass: 2.8,
        maxTemperature: 35,
        area: 20,
        dispute: {
            type: ScenarioEntryType.SELLER_DEFEND,
            text: 'Почему отклонили товар? Все характеристики указаны.',
            admit: {
                type: ScenarioEntryType.MODERATOR_ADMIT,
                text: 'Приносим извинения, товар соответствует требованиям.',
            },
            defend: {
                type: ScenarioEntryType.MODERATOR_DEFEND,
                text: 'Отсутствует информация о системе защиты от опрокидывания.',
                reply: {
                    type: ScenarioEntryType.SELLER_DEFEND,
                    text: 'Система защиты есть, это базовая функция модели.',
                    defend: {
                        type: ScenarioEntryType.MODERATOR_DEFEND,
                        text: 'Добавьте эту информацию в описание товара.',
                        reply: {
                            type: ScenarioEntryType.SELLER_ADMIT,
                            text: 'Хорошо, добавлю описание системы защиты.',
                        },
                    },
                    admit: {
                        type: ScenarioEntryType.MODERATOR_ADMIT,
                        text: 'Да, я нашел эту информацию в спецификации. Извините.',
                    },
                },
            },
        },
    })

    engine.createProduct({
        category: ProductCategory.LAPTOP,
        name: 'Lenovo Legion Pro 7 16IRX8',
        price: 280,
        sellerId: seller.id,
        width: 35.8,
        height: 26.4,
        diagonal: 16,
        storage: 2048,
        ram: 64,
        power: 330,
        mass: 2.5,
        dispute: {
            type: ScenarioEntryType.SELLER_DEFEND,
            text: 'Здравствуйте, почему товар отклонен? Все данные верны.',
            admit: {
                type: ScenarioEntryType.MODERATOR_ADMIT,
                text: 'После проверки подтверждаю корректность данных.',
            },
            defend: {
                type: ScenarioEntryType.MODERATOR_DEFEND,
                text: 'В описании не указана информация о системе охлаждения.',
                reply: {
                    type: ScenarioEntryType.SELLER_DEFEND,
                    text: 'Система охлаждения Legion Coldfront 4.0 указана в характеристиках.',
                    defend: {
                        type: ScenarioEntryType.MODERATOR_DEFEND,
                        text: 'Нужно добавить подробное описание системы охлаждения.',
                        reply: {
                            type: ScenarioEntryType.SELLER_ADMIT,
                            text: 'Хорошо, добавлю детальное описание системы охлаждения.',
                        },
                    },
                    admit: {
                        type: ScenarioEntryType.MODERATOR_ADMIT,
                        text: 'Извините, я пропустил эту информацию. Товар одобрен.',
                    },
                },
            },
        },
    })

    engine.createProduct({
        category: ProductCategory.REFRIGERATOR,
        name: 'LG DoorCooling+ GC-B569PBCZ',
        price: 270,
        sellerId: seller.id,
        width: 85.5,
        height: 185,
        depth: 68.2,
        volume: 450,
        mass: 85,
        dispute: {
            type: ScenarioEntryType.SELLER_DEFEND,
            text: 'Не понимаю причину отказа, товар полностью соответствует требованиям.',
            admit: {
                type: ScenarioEntryType.MODERATOR_ADMIT,
                text: 'Вы правы, товар соответствует всем требованиям.',
            },
            defend: {
                type: ScenarioEntryType.MODERATOR_DEFEND,
                text: 'Требуется указать тип и объем морозильной камеры.',
                reply: {
                    type: ScenarioEntryType.SELLER_DEFEND,
                    text: 'Морозильная камера No Frost, объем указан в характеристиках.',
                    defend: {
                        type: ScenarioEntryType.MODERATOR_DEFEND,
                        text: 'Добавьте эту информацию в основное описание.',
                        reply: {
                            type: ScenarioEntryType.SELLER_ADMIT,
                            text: 'Хорошо, перенесу информацию в основное описание.',
                        },
                    },
                    admit: {
                        type: ScenarioEntryType.MODERATOR_ADMIT,
                        text: 'Да, информация уже присутствует. Приношу извинения.',
                    },
                },
            },
        },
    })

    engine.createProduct({
        category: ProductCategory.MICROWAVE,
        name: 'Bosch BFL524MS0',
        price: 140,
        sellerId: seller.id,
        width: 46.2,
        height: 28.2,
        depth: 32,
        volume: 20,
        power: 800,
        mass: 12.5,
        microwaveFrequency: 2450,
        maxTemperature: 190,
        dispute: {
            type: ScenarioEntryType.SELLER_DEFEND,
            text: 'Добрый день, почему отклонен товар? Все документы приложены.',
            admit: {
                type: ScenarioEntryType.MODERATOR_ADMIT,
                text: 'Извините, документы действительно в порядке.',
            },
            defend: {
                type: ScenarioEntryType.MODERATOR_DEFEND,
                text: 'Не указаны режимы разморозки и автоприготовления.',
                reply: {
                    type: ScenarioEntryType.SELLER_DEFEND,
                    text: 'Все режимы перечислены в технических характеристиках.',
                    admit: {
                        type: ScenarioEntryType.MODERATOR_ADMIT,
                        text: 'Да, я нашел эту информацию. Товар одобрен.',
                    },
                    defend: {
                        type: ScenarioEntryType.MODERATOR_DEFEND,
                        text: 'Переместите эту информацию в начало описания.',
                        reply: {
                            type: ScenarioEntryType.SELLER_ADMIT,
                            text: 'Хорошо, перемещу описание режимов в начало.',
                        },
                    },
                },
            },
        },
    })

    engine.createProduct({
        category: ProductCategory.FAN_HEATER,
        name: 'Ballu BFH/C-31',
        price: 60,
        sellerId: seller.id,
        width: 25,
        height: 26,
        depth: 15,
        power: 1500,
        mass: 1.8,
        maxTemperature: 30,
        area: 15,
        dispute: {
            type: ScenarioEntryType.SELLER_DEFEND,
            text: 'Почему отклонили мой товар? Все характеристики указаны верно.',
            admit: {
                type: ScenarioEntryType.MODERATOR_ADMIT,
                text: 'Действительно, все характеристики корректны.',
            },
            defend: {
                type: ScenarioEntryType.MODERATOR_DEFEND,
                text: 'Отсутствует информация о режимах работы вентилятора.',
                reply: {
                    type: ScenarioEntryType.SELLER_DEFEND,
                    text: 'Три режима работы указаны в технических характеристиках.',
                    admit: {
                        type: ScenarioEntryType.MODERATOR_ADMIT,
                        text: 'Извините, я пропустил эту информацию.',
                    },
                    defend: {
                        type: ScenarioEntryType.MODERATOR_DEFEND,
                        text: 'Добавьте описание каждого режима работы.',
                        reply: {
                            type: ScenarioEntryType.SELLER_ADMIT,
                            text: 'Хорошо, добавлю подробное описание режимов.',
                        },
                    },
                },
            },
        },
    })

    engine.createProduct({
        category: ProductCategory.REFRIGERATOR,
        name: 'Samsung Family Hub RF65A967ESR',
        price: 350,
        sellerId: seller.id,
        width: 91.2,
        height: 182.5,
        depth: 72.1,
        volume: 650,
        mass: 146,
        dispute: {
            type: ScenarioEntryType.SELLER_DEFEND,
            text: 'Здравствуйте, почему отклонен товар премиум-класса?',
            admit: {
                type: ScenarioEntryType.MODERATOR_ADMIT,
                text: 'После проверки подтверждаю премиальный статус товара.',
            },
            defend: {
                type: ScenarioEntryType.MODERATOR_DEFEND,
                text: 'Требуется подтверждение функций умного дома.',
                reply: {
                    type: ScenarioEntryType.SELLER_DEFEND,
                    text: 'Все функции Smart Things подтверждены сертификатом Samsung.',
                    defend: {
                        type: ScenarioEntryType.MODERATOR_DEFEND,
                        text: 'Добавьте список поддерживаемых устройств умного дома.',
                        reply: {
                            type: ScenarioEntryType.SELLER_ADMIT,
                            text: 'Хорошо, добавлю список совместимых устройств.',
                        },
                    },
                    admit: {
                        type: ScenarioEntryType.MODERATOR_ADMIT,
                        text: 'Да, сертификат подтверждает все заявленные функции.',
                    },
                },
            },
        },
    })

    engine.createProduct({
        category: ProductCategory.FAN_HEATER,
        name: 'Xiaomi Mi Smart Space Heater S',
        price: 110,
        sellerId: seller.id,
        width: 20.4,
        height: 60.5,
        depth: 20.4,
        power: 2200,
        mass: 2.4,
        maxTemperature: 32,
        area: 25,
        dispute: {
            type: ScenarioEntryType.SELLER_DEFEND,
            text: 'Почему отклонен товар? Все сертификаты и характеристики указаны.',
            admit: {
                type: ScenarioEntryType.MODERATOR_ADMIT,
                text: 'Проверка подтвердила соответствие требованиям.',
            },
            defend: {
                type: ScenarioEntryType.MODERATOR_DEFEND,
                text: 'Требуется подтверждение поддержки Mi Home.',
                reply: {
                    type: ScenarioEntryType.SELLER_DEFEND,
                    text: 'Поддержка Mi Home подтверждена официально.',
                    defend: {
                        type: ScenarioEntryType.MODERATOR_DEFEND,
                        text: 'Укажите версию прошивки и протокол подключения.',
                        reply: {
                            type: ScenarioEntryType.SELLER_ADMIT,
                            text: 'Хорошо, добавлю информацию о прошивке и протоколе.',
                        },
                    },
                    admit: {
                        type: ScenarioEntryType.MODERATOR_ADMIT,
                        text: 'Да, поддержка подтверждена в документации.',
                    },
                },
            },
        },
    })
}
