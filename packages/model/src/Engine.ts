import { AdminTable } from './entities/AdminTable'
import { ChatMessageTable } from './entities/ChatMessageTable'
import { FanHeaterTable } from './entities/FanHeaterTable'
import { LaptopTable } from './entities/LaptopTable'
import { MicrowaveTable } from './entities/MicrowaveTable'
import { ModeratorTable } from './entities/ModeratorTable'
import { PersonTable } from './entities/PersonTable'
import { ProductImageTable } from './entities/ProductImageTable'
import { ProductTable } from './entities/ProductTable'
import { ProductTagTable } from './entities/ProductTagTable'
import { RefrigeratorTable } from './entities/RefrigeratorTable'
import { ScenarioEntryTable } from './entities/ScenarioEntryTable'
import { ScenarioTable } from './entities/ScenarioTable'
import { SellerTable } from './entities/SellerTable'
import { TagTable } from './entities/TagTable'
import { PersonType } from './enums/PersonType'
import { ProductCategory } from './enums/ProductCategory'
import { ProductStatus } from './enums/ProductStatus'
import { ScenarioEntryType } from './enums/ScenarioEntryType'
import { Chat } from './types/Chat'
import { FullChatMessage } from './types/FullMessage'
import { FullPerson } from './types/FullPerson'
import { FullProduct } from './types/FullProduct'
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
import { ProductScenarioEntry } from './types/ProductScenarioEntry'

type CreateProductArg = Prettify<
    {
        dispute: ProductScenarioEntry
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

export class Engine {
    private productTable!: ProductTable
    private productImageTable!: ProductImageTable
    private productTagTable!: ProductTagTable
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
    private tagTable!: TagTable
    private time!: number
    private maxTime!: number
    private end!: boolean
    private subscribers: ((data: Engine) => any)[] = []

    constructor(maxTime: number = 300) {
        this.maxTime = maxTime
        this.reset()

        this.subscribe = this.subscribe.bind(this)
        this.unsubscribe = this.unsubscribe.bind(this)
        this.tick = this.tick.bind(this)
        this.createProduct = this.createProduct.bind(this)
        this.createPerson = this.createPerson.bind(this)
        this.approveProduct = this.approveProduct.bind(this)
        this.rejectProduct = this.rejectProduct.bind(this)
        this.continueDisputeByModerator =
            this.continueDisputeByModerator.bind(this)
        this.getTime = this.getTime.bind(this)
        this.getMaxTime = this.getMaxTime.bind(this)
        this.getIsEnd = this.getIsEnd.bind(this)
        this.getChats = this.getChats.bind(this)
        this.getFullProducts = this.getFullProducts.bind(this)
        this.getFullProduct = this.getFullProduct.bind(this)
        this.getFullPerson = this.getFullPerson.bind(this)
        this.getProductSeller = this.getProductSeller.bind(this)
        this.getProductModerator = this.getProductModerator.bind(this)
        this.getProductMessages = this.getProductMessages.bind(this)
        this.getProductTags = this.getProductTags.bind(this)
        this.getFullChatMessage = this.getFullChatMessage.bind(this)
        this.getProductCurrentScenarioEntryChildren =
            this.getProductCurrentScenarioEntryChildren.bind(this)
        this.getProductCurrentScenarioEntry =
            this.getProductCurrentScenarioEntry.bind(this)
        this.getWrongCount = this.getWrongCount.bind(this)
        this.getFullAdminByLogin = this.getFullAdminByLogin.bind(this)
        this.getCounters = this.getCounters.bind(this)
        this.serialize = this.serialize.bind(this)
        this.parse = this.parse.bind(this)
        this.notifySubscribers = this.notifySubscribers.bind(this)
        this.disputeTick = this.disputeTick.bind(this)
        this.ignoreDispute = this.ignoreDispute.bind(this)
        this.continueDisputeBySeller = this.continueDisputeBySeller.bind(this)
        this.createChatMessage = this.createChatMessage.bind(this)
        this.initializeScenarioEntryRecursive =
            this.initializeScenarioEntryRecursive.bind(this)
        this.deletePerson = this.deletePerson.bind(this)
        this.stop = this.stop.bind(this)
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
        this.productImageTable = new ProductImageTable()
        this.productTagTable = new ProductTagTable()
        this.tagTable = new TagTable()
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

        const products = this.productTable.getProducts()

        let allProductsAreApprovedOrRejected = products.every((product) => {
            const currentScenarioEntry = this.getProductCurrentScenarioEntry(
                product.id
            )

            const isIgnored =
                product.status === ProductStatus.DISPUTED &&
                currentScenarioEntry &&
                currentScenarioEntry.type === ScenarioEntryType.SELLER_IGNORE

            return (
                product.status === ProductStatus.APPROVED ||
                product.status === ProductStatus.REJECTED ||
                isIgnored
            )
        })

        if (this.time >= this.maxTime || allProductsAreApprovedOrRejected) {
            this.end = true
        }

        this.time += 1

        this.notifySubscribers()
    }

    stop() {
        this.end = true
        this.notifySubscribers()
    }

    createProduct(product: CreateProductArg) {
        const seller = this.getFullPerson(product.sellerId) as PersonSeller

        if (!seller || seller.type !== PersonType.SELLER) {
            throw new Error('Seller not found')
        }

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

        return this.getFullProduct(createdProduct.id) as FullProduct
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

        return this.getFullPerson(createdPerson.id) as FullPerson
    }

    deletePerson(personId: string) {
        this.personTable.deletePerson(personId)
        this.adminTable.deleteAdmin(personId)
        this.moderatorTable.deleteModerator(personId)
        this.sellerTable.deleteSeller(personId)
        this.notifySubscribers()
    }

    approveProduct(productId: string, moderatorId: string) {
        const product = this.productTable.getProduct(productId)
        if (!product || product.status === ProductStatus.APPROVED) return

        this.productTable.updateProduct({
            ...product,
            status: ProductStatus.APPROVED,
            moderatorId,
        })

        this.notifySubscribers()
    }

    rejectProduct(productId: string, moderatorId: string) {
        const product = this.productTable.getProduct(productId)
        if (!product || product.status === ProductStatus.REJECTED) return

        this.productTable.updateProduct({
            ...product,
            status: ProductStatus.REJECTED,
            moderatorId,
        })

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

        if (
            scenarioEntry.type !== ScenarioEntryType.MODERATOR_ADMIT &&
            scenarioEntry.type !== ScenarioEntryType.MODERATOR_DEFEND
        ) {
            return
        }

        if (scenarioEntry.type === ScenarioEntryType.MODERATOR_ADMIT) {
            this.approveProduct(productId, moderatorId)
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

    getMaxTime() {
        return this.maxTime
    }

    getIsEnd() {
        return this.end
    }

    getGameStatistics() {
        const products = this.productTable.getProducts()

        const approvedCount = products.filter(
            (product) => product.status === ProductStatus.APPROVED
        ).length

        const rejectedCount = products.filter(
            (product) => product.status === ProductStatus.REJECTED
        ).length

        const disputedCount = products.filter(
            (product) => product.status === ProductStatus.DISPUTED
        ).length

        const wrongCount = this.getWrongCount()

        const isWinner = wrongCount < 1

        return {
            approvedCount,
            rejectedCount,
            disputedCount,
            wrongCount,
            isWinner,
        }
    }

    getChats(): Chat[] {
        const mapFn = (product: FullProduct) => {
            const lastMessage = this.chatMessageTable.getLastChatMessage(
                product.id
            )

            const fullLastMessage = lastMessage
                ? this.getFullChatMessage(lastMessage.id)
                : undefined

            return {
                fullProduct: product,
                lastMessage: fullLastMessage,
            }
        }

        const filterFn = (
            chat: Omit<Chat, 'lastMessage'> & {
                lastMessage: FullChatMessage | undefined
            }
        ) => {
            return chat.lastMessage !== undefined
        }

        return this.getFullProducts().map(mapFn).filter(filterFn) as Chat[]
    }

    getFullProducts(): FullProduct[] {
        return this.productTable
            .getProducts()
            .map((product) => this.getFullProduct(product.id) as FullProduct)
            .filter((product) => product !== undefined)
    }

    getFullProduct(productId: string): FullProduct | undefined {
        const product = this.productTable.getProduct(productId)

        if (!product) return undefined

        const seller = this.getFullPerson(product.sellerId) as PersonSeller

        if (!seller) return undefined

        const moderator = product.moderatorId
            ? (this.getFullPerson(product.moderatorId) as PersonModerator)
            : null

        const images = this.productImageTable.getImagesOfProduct(productId)
        const tags = this.getProductTags(productId)
        const hasMessages =
            this.chatMessageTable.getChatMessages(productId).length > 0

        let result: FullProduct | undefined

        const partOfResult: Pick<
            FullProduct,
            'seller' | 'moderator' | 'images' | 'tags' | 'hasMessages'
        > = {
            seller,
            moderator,
            images,
            tags,
            hasMessages,
        }
        switch (product.category) {
            case ProductCategory.REFRIGERATOR: {
                const refrigerator =
                    this.refrigeratorTable.getRefrigerator(productId)
                if (!refrigerator) return undefined
                result = {
                    ...partOfResult,
                    ...omit(product, ['category']),
                    ...omit(refrigerator, ['productId']),
                    category: ProductCategory.REFRIGERATOR,
                }
                break
            }
            case ProductCategory.LAPTOP: {
                const laptop = this.laptopTable.getLaptop(productId)
                if (!laptop) return undefined
                result = {
                    ...partOfResult,
                    ...omit(product, ['category']),
                    ...omit(laptop, ['productId']),
                    category: ProductCategory.LAPTOP,
                }
                break
            }
            case ProductCategory.MICROWAVE: {
                const microwave = this.microwaveTable.getMicrowave(productId)
                if (!microwave) return undefined
                result = {
                    ...partOfResult,
                    ...omit(product, ['category']),
                    ...omit(microwave, ['productId']),
                    category: ProductCategory.MICROWAVE,
                }
                break
            }
            case ProductCategory.FAN_HEATER: {
                const fanHeater = this.fanHeaterTable.getFanHeater(productId)
                if (!fanHeater) return undefined
                result = {
                    ...partOfResult,
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

    getFullPerson(id: string): FullPerson | undefined {
        const person = this.personTable.getPersonById(id)

        if (!person) return undefined

        let result: FullPerson | undefined

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
        const person = this.getFullPerson(product.sellerId)
        if (!person) return undefined
        return person as PersonSeller
    }

    getProductModerator(productId: string) {
        const product = this.productTable.getProduct(productId)
        if (!product || !product.moderatorId) return undefined
        const moderator = this.getFullPerson(product.moderatorId)
        if (!moderator) return undefined
        return moderator as PersonModerator
    }

    getProductMessages(productId: string) {
        const messages = this.chatMessageTable.getChatMessages(productId)
        return messages
            .map((message) => this.getFullChatMessage(message.id))
            .filter((message) => message !== undefined)
    }

    getProductTags(productId: string) {
        const tagIds = this.productTagTable.getTagIdsOfProduct(productId)
        const tags = tagIds
            .map((tagId) => this.tagTable.getTag(tagId))
            .filter((tag) => tag !== undefined)
        return tags
    }

    getFullChatMessage(messageId: string): FullChatMessage | undefined {
        const message = this.chatMessageTable.getChatMessage(messageId)
        if (!message) return undefined

        const person = this.getFullPerson(message.personId)
        if (!person) return undefined

        const product = this.getFullProduct(message.productId)
        if (!product) return undefined

        return {
            ...message,
            person,
            product,
        }
    }

    getProductCurrentScenarioEntryChildren(productId: string) {
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

    getFullAdminByLogin(login: string) {
        const admins = this.adminTable.getAdmins()

        const admin = admins.find((admin) => admin.login === login)

        if (!admin) return undefined

        const person = this.getFullPerson(admin.personId)

        return person as PersonAdmin | undefined
    }

    getPersonModerator(moderatorId: string) {
        const moderator = this.moderatorTable.getModerator(moderatorId)
        if (!moderator) return undefined
        return this.getFullPerson(moderator.personId) as
            | PersonModerator
            | undefined
    }

    getPersonModerators(): PersonModerator[] {
        const moderators = this.moderatorTable.getModerators()
        return moderators
            .map((moderator) => this.getPersonModerator(moderator.personId))
            .filter((moderator) => moderator !== undefined)
    }

    getPersonAdmin(adminId: string) {
        const admin = this.adminTable.getAdmin(adminId)
        if (!admin) return undefined
        return this.getFullPerson(admin.personId) as PersonAdmin | undefined
    }

    getPersonAdmins(): PersonAdmin[] {
        const admins = this.adminTable.getAdmins()
        return admins
            .map((admin) => this.getPersonAdmin(admin.personId))
            .filter((admin) => admin !== undefined)
    }

    getModeratorStatistics(moderatorId: string) {
        const moderator =
            this.getPersonModerator(moderatorId) ??
            this.getPersonAdmin(moderatorId)

        if (!moderator) return undefined

        const moderatorProducts = this.productTable
            .getProducts()
            .filter((product) => product.moderatorId === moderator.id)

        const disputedProducts = moderatorProducts.filter(
            (product) => product.status === ProductStatus.DISPUTED
        )

        const wonProducts = disputedProducts.filter(
            (product) => product.status === ProductStatus.APPROVED
        )

        const lostProducts = disputedProducts.filter(
            (product) => product.status === ProductStatus.REJECTED
        )

        return {
            totalChecked: moderatorProducts.length,
            totalDisputed: disputedProducts.length,
            totalWon: wonProducts.length,
            totalLost: lostProducts.length,
            todayChecked: moderatorProducts.length,
            todayDisputed: disputedProducts.length,
            todayWon: wonProducts.length,
            todayLost: lostProducts.length,
            avgSpeed: 0,
        }
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
                fullScenario.lastScenarioEntryId == null &&
                fullScenario.product.status === ProductStatus.REJECTED
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

        if (
            !product ||
            !product.moderatorId ||
            !scenario ||
            scenario.lastScenarioEntryId === null
        ) {
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

        if (
            nextEntry.type !== ScenarioEntryType.SELLER_ADMIT &&
            nextEntry.type !== ScenarioEntryType.SELLER_DEFEND &&
            nextEntry.type !== ScenarioEntryType.SELLER_IGNORE
        ) {
            return
        }

        this.scenarioTable.updateScenario({
            ...scenario,
            lastScenarioEntryId: nextEntry.id,
            lastTimestamp: this.time,
        })

        if (nextEntry.type === ScenarioEntryType.SELLER_ADMIT) {
            this.approveProduct(productId, product.moderatorId)
        }

        if (nextEntry.type !== ScenarioEntryType.SELLER_IGNORE) {
            this.createChatMessage(productId, product.sellerId, nextEntry.text)
        }
    }

    private createChatMessage(
        productId: string,
        personId: string,
        text: string
    ) {
        this.chatMessageTable.createChatMessage(productId, personId, text)
    }

    private initializeScenarioEntryRecursive(
        dispute: ProductScenarioEntry,
        productId: string,
        parentId: string | null
    ) {
        const scenarioEntry = this.scenarioEntryTable.createScenarioEntry({
            ...dispute,
            productId: productId,
            parentId: parentId,
        })

        switch (dispute.type) {
            case ScenarioEntryType.SELLER_DEFEND:
                if (dispute.defend) {
                    this.initializeScenarioEntryRecursive(
                        dispute.defend,
                        productId,
                        scenarioEntry.id
                    )
                }
                if (dispute.admit) {
                    this.initializeScenarioEntryRecursive(
                        dispute.admit,
                        productId,
                        scenarioEntry.id
                    )
                }
                break
            case ScenarioEntryType.MODERATOR_DEFEND:
                this.initializeScenarioEntryRecursive(
                    dispute.reply,
                    productId,
                    scenarioEntry.id
                )
                break
        }
    }
}
