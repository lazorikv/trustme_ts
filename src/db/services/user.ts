import { TenantApartmentInterface, LandlordApartmentInterface } from "../../api/interfaces";
import * as userDal from "../dal/user"
import { UserInput, UserOutput} from '../models/user';


export const create = (payload: UserInput): Promise<UserOutput> => {
    return userDal.create(payload)
}

export const update = (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
    return userDal.update(id, payload)
}

export const getTenantById = (id: number): Promise<TenantApartmentInterface> => {
    return userDal.getTenantById(id)
}

export const getLandlordById = (id: number): Promise<LandlordApartmentInterface> => {
    return userDal.getLandlordById(id)
}

export const deleteById = (id: number): Promise<boolean> => {
    return userDal.deleteById(id)
}

export const getAllTenants = (): Promise<TenantApartmentInterface[]> => {
    return userDal.getAllTenants()
}

export const getAllLandlords = (): Promise<LandlordApartmentInterface[]> => {
    return userDal.getAllLandlords()
}