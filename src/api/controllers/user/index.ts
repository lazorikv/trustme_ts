import { UserOutput } from '../../../db/models/user';
import * as service from '../../../db/services/user'
import { CreateUserDTO, UpdateUserDTO } from '../../dto/user.dto'
import { TenantApartmentInterface, LandlordApartmentInterface, UserInterface } from '../../interfaces/user.interface';
import * as mapper from '../auth/mapper'


export const update = async (id: number, payload: UpdateUserDTO): Promise<UserInterface> => {
    return mapper.toUser(await service.update(id, payload))
}

export const getTenantById = async (id: number): Promise<TenantApartmentInterface> => {

    return mapper.toTenantApartment(await service.getTenantById(id))
}

export const getLandlordById = async (id: number): Promise<LandlordApartmentInterface> => {

    return mapper.toLandlordApartment(await service.getLandlordById(id))
}

export const deleteById = async (id: number): Promise<boolean> => {
    const isDeleted = await service.deleteById(id)
    return isDeleted
}

export const getAllTenants = async(): Promise<TenantApartmentInterface[]> => {
    return (await service.getAllTenants()).map(mapper.toTenantApartment)
}

export const getAllLandlords = async(): Promise<LandlordApartmentInterface[]> => {
    return (await service.getAllLandlords()).map(mapper.toLandlordApartment)
}