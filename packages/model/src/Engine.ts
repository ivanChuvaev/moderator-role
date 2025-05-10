import { AdminTable } from './entities/AdminTable'
import { ChatMessageTable } from './entities/ChatMessageTable'
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
import { Prettify } from './types/utils'
import { omit } from './utils/omit'

type ProductDispute = {
    type: ScenarioEntryType
    text: string
    children: ProductDispute[]
}

type CreateProductArg = Prettify<
    {
        dispute: ProductDispute
    } & (
        | Omit<ProductRefrigerator, 'id' | 'moderatorId' | 'status'>
        | Omit<ProductLaptop, 'id' | 'moderatorId' | 'status'>
        | Omit<ProductMicrowave, 'id' | 'moderatorId' | 'status'>
        | Omit<ProductFanHeater, 'id' | 'moderatorId' | 'status'>
    )
>

type CreatePersonArg = Prettify<
    | Omit<PersonAdmin, 'id'>
    | Omit<PersonModerator, 'id'>
    | Omit<PersonSeller, 'id'>
>

type GetProductReturnValue =
    | Prettify<ProductRefrigerator>
    | Prettify<ProductLaptop>
    | Prettify<ProductMicrowave>
    | Prettify<ProductFanHeater>
    | undefined

type GetPersonReturnValue =
    | Prettify<PersonAdmin>
    | Prettify<PersonModerator>
    | Prettify<PersonSeller>
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
    private chatMessageTable!: ChatMessageTable
    private time!: number
    private maxTime!: number
    private end!: boolean
    private subscribers: ((data: Engine) => any)[] = []

    constructor(maxTime: number = 300) {
        this.maxTime = maxTime
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
        this.chatMessageTable = new ChatMessageTable()
        this.time = 0
        this.end = false
    }

    subscribe(callback: (data: any) => void) {
        this.subscribers.push(callback)
    }

    unsubscribe(callback: (data: any) => void) {
        this.subscribers = this.subscribers.filter(
            (subscriber) => subscriber !== callback
        )
    }

    tick() {
        if (this.end) return

        this.disputeTick()

        this.time += 1

        if (this.time >= this.maxTime) {
            this.end = true
        }

        this.notifySubscribers()
    }

    createProduct(product: CreateProductArg) {
        const createdProduct = this.productTable.createProduct(product)

        switch (product.category) {
            case ProductCategory.REFRIGERATOR:
                this.refrigeratorTable.createRefrigerator({
                    ...product,
                    productId: createdProduct.id,
                })
                break
            case ProductCategory.LAPTOP:
                this.laptopTable.createLaptop({
                    ...product,
                    productId: createdProduct.id,
                })
                break
            case ProductCategory.MICROWAVE:
                this.microwaveTable.createMicrowave({
                    ...product,
                    productId: createdProduct.id,
                })
                break
            case ProductCategory.FAN_HEATER:
                this.fanHeaterTable.createFanHeater({
                    ...product,
                    productId: createdProduct.id,
                })
                break
        }
        this.scenarioTable.createScenario(createdProduct.id)
        this.initializeScenarioEntryRecursive(
            product.dispute,
            createdProduct.id,
            null
        )

        this.notifySubscribers()

        return this.getProduct(createdProduct.id) as Exclude<
            GetProductReturnValue,
            undefined
        >
    }

    createPerson(person: CreatePersonArg) {
        const createdPerson = this.personTable.createPerson(person)
        switch (person.type) {
            case PersonType.ADMIN:
                this.adminTable.createAdmin({
                    ...person,
                    personId: createdPerson.id,
                })
                break
            case PersonType.MODERATOR:
                this.moderatorTable.createModerator({
                    ...person,
                    personId: createdPerson.id,
                })
                break
            case PersonType.SELLER:
                this.sellerTable.createSeller({
                    ...person,
                    personId: createdPerson.id,
                })
                break
        }

        this.notifySubscribers()

        return this.getPerson(createdPerson.id) as Exclude<
            GetPersonReturnValue,
            undefined
        >
    }

    approveProduct(productId: string, moderatorId: string) {
        const product = this.productTable.getProduct(productId)
        if (!product || product.status === ProductStatus.APPROVED) return
        product.status = ProductStatus.APPROVED
        product.moderatorId = moderatorId
        this.notifySubscribers()
    }

    rejectProduct(productId: string, moderatorId: string) {
        const product = this.productTable.getProduct(productId)
        if (!product || product.status === ProductStatus.REJECTED) return
        product.status = ProductStatus.REJECTED
        product.moderatorId = moderatorId
        this.productTable.updateProduct(product)
        this.notifySubscribers()
    }

    continueDisputeByModerator(
        productId: string,
        moderatorId: string,
        scenarioEntryId: string
    ) {
        const scenarioEntry =
            this.scenarioEntryTable.getScenarioEntry(scenarioEntryId)

        const scenario = this.scenarioTable.getScenario(productId)

        if (
            !scenario ||
            !scenarioEntry ||
            scenarioEntry.productId !== productId
        ) {
            return
        }

        const isEntryTypeModerator = [
            ScenarioEntryType.MODERATOR_ADMIT,
            ScenarioEntryType.MODERATOR_DEFEND,
        ].includes(scenarioEntry.type)

        if (!isEntryTypeModerator) {
            return
        }

        this.createChatMessage(productId, moderatorId, scenarioEntry.text)
        this.scenarioTable.updateScenario({
            ...scenario,
            lastScenarioEntryId: scenarioEntry.id,
            lastTimestamp: this.time,
        })

        this.notifySubscribers()
    }

    getTime() {
        return this.time
    }

    getIsEnd() {
        return this.end
    }

    getProducts() {
        return this.productTable
            .getProducts()
            .map(
                (product) =>
                    this.getProduct(product.id) as Exclude<
                        GetProductReturnValue,
                        undefined
                    >
            )
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
                    ...omit(refrigerator, ['productId']),
                    category: ProductCategory.REFRIGERATOR,
                }
                break
            }
            case ProductCategory.LAPTOP: {
                const laptop = this.laptopTable.getLaptop(id)
                if (!laptop) return undefined
                result = {
                    ...omit(product, ['category']),
                    ...omit(laptop, ['productId']),
                    category: ProductCategory.LAPTOP,
                }
                break
            }
            case ProductCategory.MICROWAVE: {
                const microwave = this.microwaveTable.getMicrowave(id)
                if (!microwave) return undefined
                result = {
                    ...omit(product, ['category']),
                    ...omit(microwave, ['productId']),
                    category: ProductCategory.MICROWAVE,
                }
                break
            }
            case ProductCategory.FAN_HEATER: {
                const fanHeater = this.fanHeaterTable.getFanHeater(id)
                if (!fanHeater) return undefined
                result = {
                    ...omit(product, ['category']),
                    ...omit(fanHeater, ['productId']),
                    category: ProductCategory.FAN_HEATER,
                }
                break
            }
        }

        if (!result) return undefined

        return result
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
                    ...omit(admin, ['personId']),
                    type: PersonType.ADMIN,
                }
                break
            }
            case PersonType.MODERATOR: {
                const moderator = this.moderatorTable.getModerator(id)
                if (!moderator) return undefined
                result = {
                    ...omit(person, ['type']),
                    ...omit(moderator, ['personId']),
                    type: PersonType.MODERATOR,
                }
                break
            }
            case PersonType.SELLER: {
                const seller = this.sellerTable.getSeller(id)
                if (!seller) return undefined
                result = {
                    ...omit(person, ['type']),
                    ...omit(seller, ['personId']),
                    type: PersonType.SELLER,
                }
                break
            }
        }

        if (!result) return undefined

        return result
    }

    getProductSeller(productId: string) {
        const product = this.productTable.getProduct(productId)
        if (!product) return undefined
        const person = this.getPerson(product.sellerId)
        if (!person) return undefined
        return person as PersonSeller
    }

    getProductModerator(productId: string) {
        const product = this.productTable.getProduct(productId)
        if (!product || !product.moderatorId) return undefined
        const moderator = this.getPerson(product.moderatorId)
        if (!moderator) return undefined
        return moderator as PersonModerator
    }

    getProductMessages(productId: string) {
        return this.chatMessageTable.getChatMessages(productId)
    }

    getProductCurrentScenarioEntries(productId: string) {
        const scenario = this.scenarioTable.getScenario(productId)

        if (!scenario || !scenario.lastScenarioEntryId) return []

        const entries = this.scenarioEntryTable.getScenarioEntryChildren(
            scenario.lastScenarioEntryId
        )

        return entries
    }

    getProductCurrentScenarioEntry(productId: string) {
        const scenario = this.scenarioTable.getScenario(productId)
        if (!scenario || !scenario.lastScenarioEntryId) return undefined
        return this.scenarioEntryTable.getScenarioEntry(
            scenario.lastScenarioEntryId
        )
    }

    getWrongCount() {
        const products = this.productTable.getProducts()
        let count = 0

        for (const product of products) {
            switch (product.category) {
                case ProductCategory.REFRIGERATOR: {
                    const isCorrect = this.refrigeratorTable.isCorrect(
                        product.id
                    )

                    const isCorrectStatus =
                        (isCorrect &&
                            product.status === ProductStatus.APPROVED) ||
                        (!isCorrect &&
                            product.status === ProductStatus.REJECTED)

                    if (!isCorrectStatus) {
                        count += 1
                    }

                    break
                }
                case ProductCategory.LAPTOP: {
                    const isCorrect = this.laptopTable.isCorrect(product.id)

                    const isCorrectStatus =
                        (isCorrect &&
                            product.status === ProductStatus.APPROVED) ||
                        (!isCorrect &&
                            product.status === ProductStatus.REJECTED)

                    if (!isCorrectStatus) {
                        count += 1
                    }

                    break
                }
                case ProductCategory.MICROWAVE: {
                    const isCorrect = this.microwaveTable.isCorrect(product.id)

                    const isCorrectStatus =
                        (isCorrect &&
                            product.status === ProductStatus.APPROVED) ||
                        (!isCorrect &&
                            product.status === ProductStatus.REJECTED)

                    if (!isCorrectStatus) {
                        count += 1
                    }

                    break
                }
                case ProductCategory.FAN_HEATER: {
                    const isCorrect = this.fanHeaterTable.isCorrect(product.id)

                    const isCorrectStatus =
                        (isCorrect &&
                            product.status === ProductStatus.APPROVED) ||
                        (!isCorrect &&
                            product.status === ProductStatus.REJECTED)

                    if (!isCorrectStatus) {
                        count += 1
                    }

                    break
                }
            }
        }

        return count
    }

    getCounters() {
        const products = this.productTable.getProducts()
        const approvedCount = products.filter(
            (product) => product.status === ProductStatus.APPROVED
        ).length
        const disputedCount = products.filter(
            (product) => product.status === ProductStatus.DISPUTED
        ).length
        const rejectedCount = products.filter(
            (product) => product.status === ProductStatus.REJECTED
        ).length

        return {
            approvedCount,
            disputedCount,
            rejectedCount,
        }
    }

    serialize() {
        return {
            productTable: this.productTable.serialize(),
            laptopTable: this.laptopTable.serialize(),
            refrigeratorTable: this.refrigeratorTable.serialize(),
            microwaveTable: this.microwaveTable.serialize(),
            fanHeaterTable: this.fanHeaterTable.serialize(),
            moderatorTable: this.moderatorTable.serialize(),
            adminTable: this.adminTable.serialize(),
            sellerTable: this.sellerTable.serialize(),
            personTable: this.personTable.serialize(),
            scenarioTable: this.scenarioTable.serialize(),
            scenarioEntryTable: this.scenarioEntryTable.serialize(),
            chatMessageTable: this.chatMessageTable.serialize(),
            time: this.time,
            end: this.end,
            maxTime: this.maxTime,
        }
    }

    parse(data: any) {
        this.productTable.parse(data.productTable)
        this.laptopTable.parse(data.laptopTable)
        this.refrigeratorTable.parse(data.refrigeratorTable)
        this.microwaveTable.parse(data.microwaveTable)
        this.fanHeaterTable.parse(data.fanHeaterTable)
        this.moderatorTable.parse(data.moderatorTable)
        this.adminTable.parse(data.adminTable)
        this.sellerTable.parse(data.sellerTable)
        this.personTable.parse(data.personTable)
        this.scenarioTable.parse(data.scenarioTable)
        this.scenarioEntryTable.parse(data.scenarioEntryTable)
        this.chatMessageTable.parse(data.chatMessageTable)
        this.time = data.time
        this.end = data.end
        this.maxTime = data.maxTime
    }

    private notifySubscribers() {
        for (const subscriber of this.subscribers) {
            subscriber(this)
        }
    }

    private disputeTick() {
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
            const product = this.productTable.getProduct(scenario.productId)
            const seller = product
                ? this.sellerTable.getSeller(product.sellerId)
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
                fullScenario.lastTimestamp == null &&
                fullScenario.lastScenarioEntryId == null
            ) {
                if (fullScenario.seller.disputeFactor > Math.random()) {
                    this.startDispute(fullScenario.productId)
                } else {
                    this.ignoreDispute(fullScenario.productId)
                }
                continue
            }

            this.continueDisputeBySeller(fullScenario.productId)
        }
    }

    private startDispute(productId: string) {
        const scenario = this.scenarioTable.getScenario(productId)
        const product = this.productTable.getProduct(productId)
        const startScenarioEntry =
            this.scenarioEntryTable.getProductStartScenarioEntry(productId)

        if (!scenario || !startScenarioEntry || !product) return

        this.productTable.updateProduct({
            ...product,
            status: ProductStatus.DISPUTED,
        })

        this.scenarioTable.updateScenario({
            ...scenario,
            lastScenarioEntryId: startScenarioEntry.id,
            lastTimestamp: this.time,
        })

        this.createChatMessage(
            productId,
            product.sellerId,
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

    private continueDisputeBySeller(productId: string) {
        const product = this.productTable.getProduct(productId)
        const scenario = this.scenarioTable.getScenario(productId)

        if (!product || !scenario || scenario.lastScenarioEntryId === null) {
            return
        }

        const scenarioEntryChildren =
            this.scenarioEntryTable.getScenarioEntryChildren(
                scenario.lastScenarioEntryId
            )

        if (scenarioEntryChildren.length !== 1) {
            return
        }

        const nextEntry = scenarioEntryChildren[0]

        const isEntryTypeSeller = [
            ScenarioEntryType.SELLER_ADMIT,
            ScenarioEntryType.SELLER_DEFEND,
            ScenarioEntryType.SELLER_IGNORE,
        ].includes(nextEntry.type)

        if (!isEntryTypeSeller) {
            return
        }

        this.scenarioTable.updateScenario({
            ...scenario,
            lastScenarioEntryId: nextEntry.id,
            lastTimestamp: this.time,
        })

        this.createChatMessage(productId, product.sellerId, nextEntry.text)
    }

    private createChatMessage(
        productId: string,
        personId: string,
        text: string
    ) {
        this.chatMessageTable.createChatMessage(productId, personId, text)
    }

    private initializeScenarioEntryRecursive(
        dispute: ProductDispute,
        productId: string,
        parentId: string | null
    ) {
        const scenarioEntry = this.scenarioEntryTable.createScenarioEntry({
            type: dispute.type,
            productId: productId,
            parentId: parentId,
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
