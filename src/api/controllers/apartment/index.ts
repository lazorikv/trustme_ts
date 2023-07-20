import { ApartmentOutput } from '../../../db/models/apartment'
import * as service from '../../../db/services/apartment'
import { CreateApartmentDTO, UpdateApartmentDTO } from '../../dto/apartment.dto'
import { IApartment, IApartmentCreate } from '../../interfaces/apartment.integrace'
import * as mapper from './mapper';


export const create = async(payload: CreateApartmentDTO): Promise<ApartmentOutput> => {
    return mapper.toApartmentCreate(await service.create(payload))
}

export const update = async (id: number, payload: UpdateApartmentDTO): Promise<ApartmentOutput> => {
    return mapper.toApartmentCreate(await service.update(id, payload))
}

export const getById = async (id: number): Promise<IApartment> => {
    return mapper.toApartment(await service.getById(id))
}

export const deleteById = async (id: number): Promise<boolean> => {
    const isDeleted = await service.deleteById(id)
    return isDeleted
}

export const getAll = async(): Promise<IApartment[]> => {
    return (await service.getAll()).map(mapper.toApartment)
}

export const getAllPagination = async(page:number, limit:number): Promise<IApartment[]> => {
    return (await service.getAllPagination(page, limit)).map(mapper.toApartment)
}

export const recommendApartment = async(): Promise<IApartment[]> =>{
    return (await service.recommendApartment()).map(mapper.toApartment)
}