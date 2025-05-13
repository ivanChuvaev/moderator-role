import { describe, expect, it, beforeEach } from '@jest/globals'

import { Engine } from '../Engine'
import { PersonType } from '../enums/PersonType'
import { ProductCategory } from '../enums/ProductCategory'
import { ProductStatus } from '../enums/ProductStatus'
import { ScenarioEntryType } from '../enums/ScenarioEntryType'
import { Sex } from '../enums/Sex'

describe('Engine', () => {
    let engine: Engine

    beforeEach(() => {
        engine = new Engine()
    })

    describe('Create person', () => {
        it('Should create a seller', () => {
            const seller = engine.createPerson({
                type: PersonType.SELLER,
                firstName: 'John',
                lastName: 'Doe',
                middleName: 'Michael',
                sex: Sex.MALE,
                disputeFactor: 0.5,
                avatarSrc: 'default-avatar.png',
            })

            if (seller.type !== PersonType.SELLER) {
                throw new Error('person should be a seller')
            }

            expect(seller).toBeDefined()
            expect(seller.firstName).toBe('John')
            expect(seller.lastName).toBe('Doe')
            expect(seller.middleName).toBe('Michael')
            expect(seller.sex).toBe(Sex.MALE)
            expect(seller.disputeFactor).toBe(0.5)
        })
        it('Should create a moderator', () => {
            const moderator = engine.createPerson({
                type: PersonType.MODERATOR,
                firstName: 'Jane',
                lastName: 'Smith',
                middleName: 'Marie',
                sex: Sex.FEMALE,
                salary: 50000,
                birthdate: new Date('1990-01-01').getTime(),
                employmentDate: new Date('2020-01-01').getTime(),
                correctFactor: 0.8,
                avatarSrc: 'moderator.jpg',
            })

            if (moderator.type !== PersonType.MODERATOR) {
                throw new Error('person should be a moderator')
            }

            expect(moderator).toBeDefined()
            expect(moderator.firstName).toBe('Jane')
            expect(moderator.lastName).toBe('Smith')
            expect(moderator.middleName).toBe('Marie')
            expect(moderator.sex).toBe(Sex.FEMALE)
            expect(moderator.salary).toBe(50000)
            expect(moderator.birthdate).toBe(new Date('1990-01-01').getTime())
            expect(moderator.employmentDate).toBe(
                new Date('2020-01-01').getTime()
            )
        })
    })

    describe('Create product', () => {
        it('Should create a laptop product', () => {
            const seller = engine.createPerson({
                type: PersonType.SELLER,
                firstName: 'John',
                lastName: 'Doe',
                middleName: 'Michael',
                sex: Sex.MALE,
                disputeFactor: 0.5,
                avatarSrc: 'default-avatar.png',
            })

            const laptop = engine.createProduct({
                category: ProductCategory.LAPTOP,
                name: 'MacBook Pro',
                price: 1299,
                power: 100,
                sellerId: seller.id,
                width: 10,
                height: 10,
                mass: 10,
                diagonal: 10,
                storage: 10,
                ram: 10,
                dispute: {
                    type: ScenarioEntryType.SELLER_DEFEND,
                    text: 'Initial dispute',
                    children: [],
                },
            })

            expect(laptop).toBeDefined()
            expect(laptop.category).toBe(ProductCategory.LAPTOP)
            expect(laptop.name).toBe('MacBook Pro')
            expect(laptop.price).toBe(1299)
            expect(laptop.sellerId).toBe(seller.id)
            expect(laptop.status).toBe(ProductStatus.PENDING)

            const products = engine.getFullProducts()

            expect(products.length).toBe(1)
            expect(products[0]).toStrictEqual(laptop)
        })
        it('Should create a refrigerator product', () => {
            const seller = engine.createPerson({
                type: PersonType.SELLER,
                firstName: 'John',
                lastName: 'Doe',
                middleName: 'Michael',
                sex: Sex.MALE,
                disputeFactor: 0.5,
                avatarSrc: 'default-avatar.png',
            })

            const refrigerator = engine.createProduct({
                category: ProductCategory.REFRIGERATOR,
                name: 'Refrigerator',
                price: 1299,
                sellerId: seller.id,
                width: 10,
                height: 10,
                mass: 10,
                volume: 10,
                depth: 10,
                dispute: {
                    type: ScenarioEntryType.SELLER_DEFEND,
                    text: 'Initial dispute',
                    children: [],
                },
            })

            expect(refrigerator).toBeDefined()
            expect(refrigerator.category).toBe(ProductCategory.REFRIGERATOR)
            expect(refrigerator.name).toBe('Refrigerator')
            expect(refrigerator.price).toBe(1299)
            expect(refrigerator.sellerId).toBe(seller.id)
            expect(refrigerator.status).toBe(ProductStatus.PENDING)
        })
        it('Should create a microwave product', () => {
            const seller = engine.createPerson({
                type: PersonType.SELLER,
                firstName: 'John',
                lastName: 'Doe',
                middleName: 'Michael',
                sex: Sex.MALE,
                disputeFactor: 0.5,
                avatarSrc: 'default-avatar.png',
            })

            const microwave = engine.createProduct({
                category: ProductCategory.MICROWAVE,
                name: 'Microwave',
                price: 1299,
                sellerId: seller.id,
                width: 10,
                height: 10,
                mass: 10,
                volume: 10,
                depth: 10,
                power: 10,
                maxTemperature: 10,
                microwaveFrequency: 2500,
                dispute: {
                    type: ScenarioEntryType.SELLER_DEFEND,
                    text: 'Initial dispute',
                    children: [],
                },
            })

            expect(microwave).toBeDefined()
            expect(microwave.category).toBe(ProductCategory.MICROWAVE)
            expect(microwave.name).toBe('Microwave')
            expect(microwave.price).toBe(1299)
            expect(microwave.sellerId).toBe(seller.id)
            expect(microwave.status).toBe(ProductStatus.PENDING)
        })
    })

    describe('Tick', () => {
        it('Should increment time', () => {
            engine.tick()
            expect(engine.getTime()).toBe(1)
        })

        it('Should end after max time', () => {
            const customEngine = new Engine(10)
            for (let i = 0; i < 11; i++) {
                customEngine.tick()
            }
            expect(customEngine.getIsEnd()).toBe(true)
        })
        it('Should stop incrementing time after end', () => {
            const customEngine = new Engine(10)
            for (let i = 0; i < 11; i++) {
                customEngine.tick()
            }
            expect(customEngine.getTime()).toBe(10)
        })
    })

    describe('Product approval flow', () => {
        it('Should create and approve a laptop product', () => {
            // Create a seller
            const seller = engine.createPerson({
                type: PersonType.SELLER,
                avatarSrc: 'seller.jpg',
                firstName: 'John',
                lastName: 'Doe',
                middleName: '',
                sex: Sex.MALE,
                disputeFactor: 0.5,
            })

            // Create a moderator
            const moderator = engine.createPerson({
                type: PersonType.MODERATOR,
                avatarSrc: 'moderator.jpg',
                firstName: 'Jane',
                lastName: 'Smith',
                middleName: '',
                sex: Sex.FEMALE,
                salary: 50000,
                birthdate: 1990,
                employmentDate: 2020,
                correctFactor: 0.8,
            })

            // Create a laptop product
            const laptop = engine.createProduct({
                category: ProductCategory.LAPTOP,
                name: 'MacBook Pro',
                price: 1299,
                sellerId: seller.id,
                width: 30,
                height: 20,
                mass: 2,
                diagonal: 13,
                storage: 512,
                ram: 16,
                power: 100,
                dispute: {
                    type: ScenarioEntryType.SELLER_DEFEND,
                    text: 'Initial dispute',
                    children: [],
                },
            })

            // Verify product is in pending state
            expect(laptop.status).toBe(ProductStatus.PENDING)

            // Approve the product
            engine.approveProduct(laptop.id, moderator.id)

            // Get the updated product
            const updatedProduct = engine.getFullProduct(laptop.id)!

            // Verify product is now approved
            expect(updatedProduct.status).toBe(ProductStatus.APPROVED)
        })
    })

    describe('Product dispute flow', () => {
        let seller: ReturnType<typeof engine.createPerson>
        let admin: ReturnType<typeof engine.createPerson>
        let laptop: ReturnType<typeof engine.createProduct>

        beforeEach(() => {
            // Create a seller
            seller = engine.createPerson({
                type: PersonType.SELLER,
                avatarSrc: 'seller.jpg',
                firstName: 'John',
                lastName: 'Doe',
                middleName: '',
                sex: Sex.MALE,
                disputeFactor: 1,
            })
            // Create an admin
            admin = engine.createPerson({
                type: PersonType.ADMIN,
                avatarSrc: 'admin.jpg',
                firstName: 'Admin',
                lastName: 'Admin',
                middleName: '',
                sex: Sex.MALE,
                login: 'admin',
                password: 'admin',
            })
            // Create a laptop product
            laptop = engine.createProduct({
                category: ProductCategory.LAPTOP,
                name: 'MacBook Pro',
                price: 1299,
                sellerId: seller.id,
                width: 30,
                height: 20,
                mass: 2,
                diagonal: 13,
                storage: 512,
                ram: 16,
                power: 100,
                dispute: {
                    type: ScenarioEntryType.SELLER_DEFEND,
                    text: 'Initial dispute',
                    children: [],
                },
            })
        })

        it('Created product should have PENDING status', () => {
            expect(laptop.status).toBe(ProductStatus.PENDING)
        })

        it('Rejected product should have REJECTED status', () => {
            engine.rejectProduct(laptop.id, admin.id)

            laptop = engine.getFullProduct(laptop.id)!

            expect(laptop.status).toBe(ProductStatus.REJECTED)
        })

        it('Created product must contain zero messages', () => {
            const messages = engine.getProductMessages(laptop.id)
            expect(messages.length).toBe(0)
        })

        it('Rejected product should be disputed after tick', () => {
            engine.rejectProduct(laptop.id, admin.id)

            engine.tick()

            laptop = engine.getFullProduct(laptop.id)!

            expect(laptop.status === ProductStatus.DISPUTED).toBe(true)
        })

        it('Rejected product should not be disputed if seller has dispute factor 0', () => {
            const seller2 = engine.createPerson({
                type: PersonType.SELLER,
                avatarSrc: 'seller.jpg',
                firstName: 'Alex',
                lastName: 'Smith',
                middleName: '',
                sex: Sex.MALE,
                disputeFactor: 0,
            })

            let laptop2 = engine.createProduct({
                category: ProductCategory.LAPTOP,
                name: 'MacBook Pro',
                price: 1299,
                sellerId: seller2.id,
                width: 30,
                height: 20,
                mass: 2,
                diagonal: 13,
                storage: 512,
                ram: 16,
                power: 100,
                dispute: {
                    type: ScenarioEntryType.SELLER_DEFEND,
                    text: 'Initial dispute',
                    children: [],
                },
            })

            engine.rejectProduct(laptop2.id, admin.id)

            engine.tick()

            laptop2 = engine.getFullProduct(laptop2.id)!

            expect(laptop2.status).toBe(ProductStatus.REJECTED)
        })

        it('After starting dispute first message should have text "Initial dispute"', () => {
            engine.rejectProduct(laptop.id, admin.id)

            engine.tick()

            laptop = engine.getFullProduct(laptop.id)!

            const messages = engine.getProductMessages(laptop.id)
            expect(messages[0].text).toBe('Initial dispute')
        })
    })
    describe('Scenarios', () => {
        let laptop: ReturnType<typeof engine.createProduct>
        let seller: ReturnType<typeof engine.createPerson>
        let admin: ReturnType<typeof engine.createPerson>

        beforeEach(() => {
            // Create a seller
            seller = engine.createPerson({
                type: PersonType.SELLER,
                avatarSrc: 'seller.jpg',
                firstName: 'John',
                lastName: 'Doe',
                middleName: '',
                sex: Sex.MALE,
                disputeFactor: 1,
            })
            // Create an admin
            admin = engine.createPerson({
                type: PersonType.ADMIN,
                avatarSrc: 'admin.jpg',
                firstName: 'Admin',
                lastName: 'Admin',
                middleName: '',
                sex: Sex.MALE,
                login: 'admin',
                password: 'admin',
            })
            // Create a laptop product
            laptop = engine.createProduct({
                category: ProductCategory.LAPTOP,
                name: 'MacBook Pro',
                price: 1299,
                sellerId: seller.id,
                width: 30,
                height: 20,
                mass: 2,
                diagonal: 13,
                storage: 512,
                ram: 16,
                power: 100,
                dispute: {
                    type: ScenarioEntryType.SELLER_DEFEND,
                    text: 'Initial dispute',
                    children: [
                        {
                            type: ScenarioEntryType.MODERATOR_ADMIT,
                            text: 'Moderator admit',
                            children: [],
                        },
                        {
                            type: ScenarioEntryType.MODERATOR_DEFEND,
                            text: 'Moderator defend',
                            children: [
                                {
                                    type: ScenarioEntryType.SELLER_DEFEND,
                                    text: 'Seller defend',
                                    children: [
                                        {
                                            type: ScenarioEntryType.MODERATOR_ADMIT,
                                            text: 'Moderator admit nested',
                                            children: [],
                                        },
                                        {
                                            type: ScenarioEntryType.MODERATOR_DEFEND,
                                            text: 'Moderator defend nested',
                                            children: [
                                                {
                                                    type: ScenarioEntryType.SELLER_ADMIT,
                                                    text: 'Seller admit nested',
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
        })

        it('Should have two scenario entries after dispute', () => {
            engine.rejectProduct(laptop.id, admin.id)

            engine.tick()

            laptop = engine.getFullProduct(laptop.id)!

            if (laptop.status !== ProductStatus.DISPUTED) {
                throw new Error('Product should be disputed')
            }

            const scenarioEntries =
                engine.getProductCurrentScenarioEntryChildren(laptop.id)

            expect(scenarioEntries.length).toBe(2)
            expect(scenarioEntries[0].type).toBe(
                ScenarioEntryType.MODERATOR_ADMIT
            )
            expect(scenarioEntries[1].type).toBe(
                ScenarioEntryType.MODERATOR_DEFEND
            )
            expect(scenarioEntries[0].text).toBe('Moderator admit')
            expect(scenarioEntries[1].text).toBe('Moderator defend')
        })
        it('Should have two messages after dispute and admit by moderator', () => {
            engine.rejectProduct(laptop.id, admin.id)

            engine.tick()

            const scenarioEntries =
                engine.getProductCurrentScenarioEntryChildren(laptop.id)

            engine.continueDisputeByModerator(
                laptop.id,
                admin.id,
                scenarioEntries[0].id
            )

            const messages = engine.getProductMessages(laptop.id)
            expect(messages.length).toBe(2)
            expect(messages[0].text).toBe('Initial dispute')
            expect(messages[1].text).toBe(scenarioEntries[0].text)
        })
        it('Should be Moderator admit nested', () => {
            engine.rejectProduct(laptop.id, admin.id)

            engine.tick()

            let scenarioEntries = engine.getProductCurrentScenarioEntryChildren(
                laptop.id
            )

            expect(scenarioEntries.length).toBe(2)
            expect(scenarioEntries[0].text).toBe('Moderator admit')
            expect(scenarioEntries[1].text).toBe('Moderator defend')

            engine.continueDisputeByModerator(
                laptop.id,
                admin.id,
                scenarioEntries[1].id
            )

            scenarioEntries = engine.getProductCurrentScenarioEntryChildren(
                laptop.id
            )

            expect(scenarioEntries.length).toBe(1)
            expect(scenarioEntries[0].text).toBe('Seller defend')

            engine.tick()

            scenarioEntries = engine.getProductCurrentScenarioEntryChildren(
                laptop.id
            )

            expect(scenarioEntries.length).toBe(2)
            expect(scenarioEntries[0].text).toBe('Moderator admit nested')
            expect(scenarioEntries[1].text).toBe('Moderator defend nested')
        })
        it('Dispute should be ended with seller admit after 3 ticks', () => {
            engine.rejectProduct(laptop.id, admin.id)

            engine.tick()

            let scenarioEntries = engine.getProductCurrentScenarioEntryChildren(
                laptop.id
            )

            engine.continueDisputeByModerator(
                laptop.id,
                admin.id,
                scenarioEntries[1].id
            )

            engine.tick()

            scenarioEntries = engine.getProductCurrentScenarioEntryChildren(
                laptop.id
            )

            expect(scenarioEntries.length).toBe(2)
            expect(scenarioEntries[0].text).toBe('Moderator admit nested')
            expect(scenarioEntries[1].text).toBe('Moderator defend nested')

            engine.continueDisputeByModerator(
                laptop.id,
                admin.id,
                scenarioEntries[1].id
            )

            engine.tick()

            scenarioEntries = engine.getProductCurrentScenarioEntryChildren(
                laptop.id
            )

            expect(scenarioEntries.length).toBe(0)

            const currentScenarioEntry = engine.getProductCurrentScenarioEntry(
                laptop.id
            )

            if (!currentScenarioEntry) {
                throw new Error('Current scenario entry should exist')
            }

            expect(currentScenarioEntry.type).toBe(
                ScenarioEntryType.SELLER_ADMIT
            )
        })
    })
    describe('Game flow', () => {
        let laptop: ReturnType<typeof engine.createProduct>
        let seller1: ReturnType<typeof engine.createPerson>
        let seller2: ReturnType<typeof engine.createPerson>
        let admin: ReturnType<typeof engine.createPerson>
        let refrigerator: ReturnType<typeof engine.createProduct>
        beforeEach(() => {
            // Create a seller
            seller1 = engine.createPerson({
                type: PersonType.SELLER,
                avatarSrc: 'seller.jpg',
                firstName: 'John',
                lastName: 'Doe',
                middleName: '',
                sex: Sex.MALE,
                disputeFactor: 1,
            })
            seller2 = engine.createPerson({
                type: PersonType.SELLER,
                avatarSrc: 'seller.jpg',
                firstName: 'Alex',
                lastName: 'Smith',
                middleName: '',
                sex: Sex.MALE,
                disputeFactor: 0,
            })
            // Create an admin
            admin = engine.createPerson({
                type: PersonType.ADMIN,
                avatarSrc: 'admin.jpg',
                firstName: 'Admin',
                lastName: 'Admin',
                middleName: '',
                sex: Sex.MALE,
                login: 'admin',
                password: 'admin',
            })
            // Create a laptop product
            laptop = engine.createProduct({
                category: ProductCategory.LAPTOP,
                name: 'MacBook Pro',
                price: 1299,
                sellerId: seller1.id,
                width: 30,
                height: 20,
                mass: 2,
                diagonal: 13,
                storage: 512,
                ram: 4,
                power: 100,
                dispute: {
                    type: ScenarioEntryType.SELLER_ADMIT,
                    text: 'Initial dispute',
                    children: [],
                },
            })
            refrigerator = engine.createProduct({
                category: ProductCategory.REFRIGERATOR,
                name: 'Refrigerator',
                price: 1299,
                sellerId: seller2.id,
                width: 55,
                height: 145,
                mass: 31,
                volume: 101,
                depth: 60,
                dispute: {
                    type: ScenarioEntryType.SELLER_ADMIT,
                    text: 'Initial dispute',
                    children: [],
                },
            })
        })
        it('Should have two wrong products', () => {
            const wrongCount = engine.getWrongCount()
            expect(wrongCount).toBe(2)
        })
        it('Should have one wrong product', () => {
            engine.approveProduct(laptop.id, admin.id)
            engine.approveProduct(refrigerator.id, admin.id)

            const wrongCount = engine.getWrongCount()

            expect(wrongCount).toBe(1)
        })
        it('Should have zero wrong products', () => {
            engine.rejectProduct(laptop.id, admin.id)
            engine.approveProduct(refrigerator.id, admin.id)

            const wrongCount = engine.getWrongCount()
            expect(wrongCount).toBe(0)
        })
    })
})
