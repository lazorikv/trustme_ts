import * as addressDal from '../dal/address'
import { AddressInput, AddressOutput} from '../models/address';


export const create = (payload: AddressInput): Promise<AddressOutput> => {
    return addressDal.create(payload)
}

export const update = (id: number, payload: Partial<AddressInput>): Promise<AddressOutput> => {
    return addressDal.update(id, payload)
}

export const getById = (id: number): Promise<AddressOutput> => {
    return addressDal.getById(id)
}

export const deleteById = (id: number): Promise<boolean> => {
    return addressDal.deleteById(id)
}

export const getAll = (): Promise<AddressOutput[]> => {
    return addressDal.getAll()
}