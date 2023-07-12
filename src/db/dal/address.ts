import Address, { AddressInput, AddressOutput} from '../models/address'

export const create = async (payload: AddressInput): Promise<AddressOutput> => {
    const address = await Address.create(payload)
    return address
}

export const update = async (id: number, payload: Partial<AddressInput>): Promise<AddressOutput> => {
    const address = await Address.findByPk(id)
    if (!address) {
        throw new Error('not found')
    }
    const updatedAddress = await (address as Address).update(payload)
    return updatedAddress
}

export const getById = async (id: number): Promise<AddressOutput> => {
    const address = await Address.findByPk(id)

    if (!address) {
        // @todo throw custom error
        throw new Error('not found')
    }

    return address
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedAddressCount = await Address.destroy({
        where: {id}
    })

    return !!deletedAddressCount
}

export const getAll = async (): Promise<AddressOutput[]> => {
    return Address.findAll()
}