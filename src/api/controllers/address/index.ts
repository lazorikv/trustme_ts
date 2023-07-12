import { AddressOutput } from '../../../db/models/address'
import * as service from '../../../db/services/address'
import { CreateAddressDTO, UpdateAddressDTO } from '../../dto/address.dto'
import { IAddress } from '../../interfaces/address.interface'
import * as mapper from './mapper'


export const create = async(payload: CreateAddressDTO): Promise<IAddress> => {
    return mapper.toAddress(await service.create(payload))
}

export const update = async (id: number, payload: UpdateAddressDTO): Promise<IAddress> => {
    return mapper.toAddress(await service.update(id, payload))
}

export const getById = async (id: number): Promise<IAddress> => {
    return mapper.toAddress(await service.getById(id))
}

export const deleteById = async (id: number): Promise<boolean> => {
    const isDeleted = await service.deleteById(id)
    return isDeleted
}

export const getAll = async(): Promise<AddressOutput[]> => {
    return (await service.getAll()).map(mapper.toAddress)
}