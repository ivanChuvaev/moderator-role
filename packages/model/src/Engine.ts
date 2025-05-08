import { AdminTable } from './entities/AdminTable'
import { FanHeaterTable } from './entities/FanHeaterTable'
import { LaptopTable } from './entities/LaptopTable'
import { MicrowaveTable } from './entities/MicrowaveTable'
import { ModeratorTable } from './entities/ModeratorTable'
import { PersonTable } from './entities/PersonTable'
import { ProductTable } from './entities/ProductTable'
import { RefrigeratorTable } from './entities/RefrigeratorTable'
import { ScenarioEntryTable } from './entities/ScenarioEntryTable'
import { ScenarioTable } from './entities/ScenarioTable'
import { SellerTable } from './entities/SellerTable'
import { PersonType } from './enums/PersonType'
import { ProductCategory } from './enums/ProductCategory'
import { ProductStatus } from './enums/ProductStatus'
import { ScenarioEntryType } from './enums/ScenarioEntryType'
import { PersonAdmin } from './types/PersonAdmin'
import { PersonModerator } from './types/PersonModerator'
import { PersonSeller } from './types/PersonSeller'
import { Product } from './types/Product'
import { ProductFanHeater } from './types/ProductFanHeater'
import { ProductLaptop } from './types/ProductLaptop'
import { ProductMicrowave } from './types/ProductMicrowave'
import { ProductRefrigerator } from './types/ProductRefrigerator'
import { Scenario } from './types/Scenario'
import { Seller } from './types/Seller'
import { ObjectSnakeToCamelCase, Prettify } from './types/utils'
import { objectCamelToSnakeCase } from './utils/objectCamelToSnakeCase'
import { objectSnakeToCamelCase } from './utils/objectSnakeToCamelCase'
import { omit } from './utils/omit'

type ProductDispute = {
    type: ScenarioEntryType
    text: string
    children: ProductDispute[]
}

type CreateProductArg = Prettify<
    {
        dispute: ProductDispute
    } & ObjectSnakeToCamelCase<
        | Omit<ProductRefrigerator, 'id' | 'moderator_id' | 'status'>
        | Omit<ProductLaptop, 'id' | 'moderator_id' | 'status'>
        | Omit<ProductMicrowave, 'id' | 'moderator_id' | 'status'>
        | Omit<ProductFanHeater, 'id' | 'moderator_id' | 'status'>
    >
>

type CreatePersonArg = Prettify<
    ObjectSnakeToCamelCase<
        | Omit<PersonAdmin, 'id'>
        | Omit<PersonModerator, 'id'>
        | Omit<PersonSeller, 'id'>
    >
>

type GetProductReturnValue =
    | Prettify<ObjectSnakeToCamelCase<ProductRefrigerator>>
    | Prettify<ObjectSnakeToCamelCase<ProductLaptop>>
    | Prettify<ObjectSnakeToCamelCase<ProductMicrowave>>
    | Prettify<ObjectSnakeToCamelCase<ProductFanHeater>>
    | undefined

type GetPersonReturnValue =
    | Prettify<ObjectSnakeToCamelCase<PersonAdmin>>
    | Prettify<ObjectSnakeToCamelCase<PersonModerator>>
    | Prettify<ObjectSnakeToCamelCase<PersonSeller>>
    | undefined

export class Engine {
    private productTable!: ProductTable
    private laptopTable!: LaptopTable
    private refrigeratorTable!: RefrigeratorTable
    private microwaveTable!: MicrowaveTable
    private fanHeaterTable!: FanHeaterTable
    private moderatorTable!: ModeratorTable
    private adminTable!: AdminTable
    private sellerTable!: SellerTable
    private personTable!: PersonTable
    private scenarioTable!: ScenarioTable
    private scenarioEntryTable!: ScenarioEntryTable

    private time!: number
    private maxTime!: number
    private end!: boolean

    constructor() {
        this.reset()
    }

    reset() {
        this.productTable = new ProductTable()
        this.laptopTable = new LaptopTable()
        this.refrigeratorTable = new RefrigeratorTable()
        this.microwaveTable = new MicrowaveTable()
        this.fanHeaterTable = new FanHeaterTable()
        this.moderatorTable = new ModeratorTable()
        this.adminTable = new AdminTable()
        this.sellerTable = new SellerTable()
        this.personTable = new PersonTable()
        this.scenarioTable = new ScenarioTable()
        this.scenarioEntryTable = new ScenarioEntryTable()
        this.time = 0
        this.maxTime = 300
        this.end = false
    }

    tick() {
        if (this.end) return
        this.time += 1
        if (this.time > this.maxTime) {
            this.end = true
        }
    }

    disputeTick() {
        const scenarios = this.scenarioTable.getScenarios()

        type FullScenarioPartial = Scenario & {
            product: Product | undefined
            seller: Seller | undefined
        }

        type FullScenario = Scenario & {
            product: Product
            seller: Seller
        }

        const mapFn = (scenario: Scenario): FullScenarioPartial => {
            const product = this.productTable.getProduct(scenario.product_id)
            const seller = product
                ? this.sellerTable.getSeller(product.seller_id)
                : undefined
            return {
                ...scenario,
                product,
                seller,
            }
        }

        const filterFn = (fullScenario: FullScenarioPartial) => {
            return Boolean(fullScenario.product && fullScenario.seller)
        }

        const fullScenarios = scenarios
            .map(mapFn)
            .filter(filterFn) as FullScenario[]

        for (const fullScenario of fullScenarios) {
            if (fullScenario.ignore) {
                continue
            }

            if (
                fullScenario.last_timestamp == null &&
                fullScenario.last_scenario_entry_id == null
            ) {
                if (fullScenario.seller.dispute_factor > Math.random()) {
                    this.startDispute(fullScenario.product_id)
                } else {
                    this.ignoreDispute(fullScenario.product_id)
                }
                continue
            }

            this.sellerContinueDispute(fullScenario.product_id)
        }
    }

    createProduct(product: CreateProductArg) {
        const transformedProduct = objectCamelToSnakeCase(product)
        const createdProduct =
            this.productTable.createProduct(transformedProduct)
        switch (transformedProduct.category) {
            case ProductCategory.REFRIGERATOR:
                this.refrigeratorTable.createRefrigerator({
                    ...transformedProduct,
                    product_id: createdProduct.id,
                })
                break
            case ProductCategory.LAPTOP:
                this.laptopTable.createLaptop({
                    ...transformedProduct,
                    product_id: createdProduct.id,
                })
                break
            case ProductCategory.MICROWAVE:
                this.microwaveTable.createMicrowave({
                    ...transformedProduct,
                    product_id: createdProduct.id,
                })
                break
            case ProductCategory.FAN_HEATER:
                this.fanHeaterTable.createFanHeater({
                    ...transformedProduct,
                    product_id: createdProduct.id,
                })
                break
        }
        this.scenarioTable.createScenario(createdProduct.id)
        this.initializeScenarioEntryRecursive(
            transformedProduct.dispute,
            createdProduct.id,
            null
        )
        return this.getProduct(createdProduct.id) as Exclude<
            GetProductReturnValue,
            undefined
        >
    }

    createPerson(person: CreatePersonArg) {
        const transformedPerson = objectCamelToSnakeCase(person)
        const createdPerson = this.personTable.createPerson(transformedPerson)
        switch (transformedPerson.type) {
            case PersonType.ADMIN:
                this.adminTable.createAdmin({
                    ...transformedPerson,
                    person_id: createdPerson.id,
                })
                break
            case PersonType.MODERATOR:
                this.moderatorTable.createModerator({
                    ...transformedPerson,
                    person_id: createdPerson.id,
                })
                break
            case PersonType.SELLER:
                this.sellerTable.createSeller({
                    ...transformedPerson,
                    person_id: createdPerson.id,
                })
                break
        }
        return this.getPerson(createdPerson.id) as Exclude<
            GetPersonReturnValue,
            undefined
        >
    }

    approveProduct(productId: string, moderatorId: string) {
        const product = this.productTable.getProduct(productId)
        if (!product || product.status === ProductStatus.APPROVED) return
        product.status = ProductStatus.APPROVED
        product.moderator_id = moderatorId
    }

    rejectProduct(productId: string, moderatorId: string) {
        const product = this.productTable.getProduct(productId)
        if (!product || product.status === ProductStatus.REJECTED) return
        product.status = ProductStatus.REJECTED
        product.moderator_id = moderatorId
    }

    getProduct(id: string): GetProductReturnValue {
        const product = this.productTable.getProduct(id)

        if (!product) return undefined

        let result:
            | ProductRefrigerator
            | ProductLaptop
            | ProductMicrowave
            | ProductFanHeater
            | undefined

        switch (product.category) {
            case ProductCategory.REFRIGERATOR: {
                const refrigerator = this.refrigeratorTable.getRefrigerator(id)
                if (!refrigerator) return undefined
                result = {
                    ...omit(product, ['category']),
                    ...omit(refrigerator, ['product_id']),
                    category: ProductCategory.REFRIGERATOR,
                }
                break
            }
            case ProductCategory.LAPTOP: {
                const laptop = this.laptopTable.getLaptop(id)
                if (!laptop) return undefined
                result = {
                    ...omit(product, ['category']),
                    ...omit(laptop, ['product_id']),
                    category: ProductCategory.LAPTOP,
                }
                break
            }
            case ProductCategory.MICROWAVE: {
                const microwave = this.microwaveTable.getMicrowave(id)
                if (!microwave) return undefined
                result = {
                    ...omit(product, ['category']),
                    ...omit(microwave, ['product_id']),
                    category: ProductCategory.MICROWAVE,
                }
                break
            }
            case ProductCategory.FAN_HEATER: {
                const fanHeater = this.fanHeaterTable.getFanHeater(id)
                if (!fanHeater) return undefined
                result = {
                    ...omit(product, ['category']),
                    ...omit(fanHeater, ['product_id']),
                    category: ProductCategory.FAN_HEATER,
                }
                break
            }
        }

        if (!result) return undefined

        return objectSnakeToCamelCase(result)
    }

    getPerson(id: string): GetPersonReturnValue {
        const person = this.personTable.getPersonById(id)

        if (!person) return undefined

        let result: PersonAdmin | PersonModerator | PersonSeller | undefined

        switch (person.type) {
            case PersonType.ADMIN: {
                const admin = this.adminTable.getAdmin(id)
                if (!admin) return undefined
                result = {
                    ...omit(person, ['type']),
                    ...omit(admin, ['person_id']),
                    type: PersonType.ADMIN,
                }
                break
            }
            case PersonType.MODERATOR: {
                const moderator = this.moderatorTable.getModerator(id)
                if (!moderator) return undefined
                result = {
                    ...omit(person, ['type']),
                    ...omit(moderator, ['person_id']),
                    type: PersonType.MODERATOR,
                }
                break
            }
            case PersonType.SELLER: {
                const seller = this.sellerTable.getSeller(id)
                if (!seller) return undefined
                result = {
                    ...omit(person, ['type']),
                    ...omit(seller, ['person_id']),
                    type: PersonType.SELLER,
                }
                break
            }
        }

        if (!result) return undefined

        return objectSnakeToCamelCase(result)
    }

    getProductSeller(productId: string) {
        const product = this.productTable.getProduct(productId)
        if (!product) return undefined
        const person = this.getPerson(product.seller_id)
        if (!person) return undefined
        return person as ObjectSnakeToCamelCase<PersonSeller>
    }

    getProductModerator(productId: string) {
        const product = this.productTable.getProduct(productId)
        if (!product || !product.moderator_id) return undefined
        const moderator = this.getPerson(product.moderator_id)
        if (!moderator) return undefined
        return moderator as ObjectSnakeToCamelCase<PersonModerator>
    }

    private startDispute(productId: string) {
        const scenario = this.scenarioTable.getScenario(productId)
        const product = this.productTable.getProduct(productId)
        const startScenarioEntry =
            this.scenarioEntryTable.getProductStartScenarioEntry(productId)

        if (!scenario || !startScenarioEntry || !product) return

        this.scenarioTable.updateScenario({
            ...scenario,
            last_scenario_entry_id: startScenarioEntry.id,
            last_timestamp: this.time,
        })

        this.createChatMessage(
            productId,
            product.seller_id,
            startScenarioEntry.text
        )
    }

    private ignoreDispute(productId: string) {
        const scenario = this.scenarioTable.getScenario(productId)
        if (!scenario) return
        this.scenarioTable.updateScenario({
            ...scenario,
            ignore: true,
        })
    }

    private sellerContinueDispute(productId: string) {
        const product = this.productTable.getProduct(productId)
        const scenario = this.scenarioTable.getScenario(productId)

        if (!product || !scenario || scenario.last_scenario_entry_id === null) {
            return
        }

        const scenarioEntryChildren =
            this.scenarioEntryTable.getScenarioEntryChildren(
                scenario.last_scenario_entry_id
            )

        if (scenarioEntryChildren.length !== 1) {
            return
        }

        const nextEntry = scenarioEntryChildren[0]

        if (
            ![
                ScenarioEntryType.SELLER_ADMIT,
                ScenarioEntryType.SELLER_DEFEND,
                ScenarioEntryType.SELLER_IGNORE,
            ].includes(nextEntry.type)
        ) {
            return
        }

        this.scenarioTable.updateScenario({
            ...scenario,
            last_scenario_entry_id: nextEntry.id,
            last_timestamp: this.time,
        })

        this.createChatMessage(productId, product.seller_id, nextEntry.text)
    }

    private createChatMessage(
        productId: string,
        personId: string,
        text: string
    ) {
        // TODO: create message in chat
    }

    private initializeScenarioEntryRecursive(
        dispute: ProductDispute,
        productId: string,
        parentId: string | null
    ) {
        const scenarioEntry = this.scenarioEntryTable.createScenarioEntry({
            type: dispute.type,
            product_id: productId,
            parent_id: parentId,
            text: dispute.text,
        })
        if (dispute.children.length > 0) {
            for (const child of dispute.children) {
                this.initializeScenarioEntryRecursive(
                    child,
                    productId,
                    scenarioEntry.id
                )
            }
        }
    }
}
