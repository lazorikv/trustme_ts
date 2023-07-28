import { IApartment, IApartmentCreate } from '../../api/interfaces/apartment.integrace';
import * as apartmentDal from '../dal/apartment'
import { AddressInput, AddressOutput} from '../models/address';
import { ApartmentInput, ApartmentOutput } from '../models/apartment';


export const create = (payload: IApartmentCreate): Promise<ApartmentOutput> => {
    return apartmentDal.create(payload)
}

export const update = (id: number, payload: Partial<ApartmentInput>): Promise<ApartmentOutput> => {
    return apartmentDal.update(id, payload)
}

export const getById = (id: number): Promise<IApartment> => {
    return apartmentDal.getById(id)
}

export const deleteById = (id: number): Promise<boolean> => {
    return apartmentDal.deleteById(id)
}

export const getAllByLandlordId = (id: number): Promise<IApartment[]> => {
    return apartmentDal.getAllByLandlordId(id)
}

export const getAll = (): Promise<IApartment[]> => {
    return apartmentDal.getAll()
}

export const getAllPagination = (page: number, limit: number): Promise<IApartment[]> => {
    return apartmentDal.getAllPagination(page, limit)
}

export const recommendApartment = (): Promise<IApartment[]> => {
    return apartmentDal.recommendApartment()
}