import { UserOutput } from "../../../db/models/user"
import { LandlordApartmentInterface, TenantApartmentInterface } from '../../interfaces/user.interface';

export const toUser = (user: UserOutput): UserOutput => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt
    }
}

export const toTenantApartment = (user: TenantApartmentInterface): TenantApartmentInterface => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        role: user.role,
        apartmentTenant: user.apartmentTenant,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt
    }
}

export const toLandlordApartment = (user: LandlordApartmentInterface): LandlordApartmentInterface => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        role: user.role,
        apartmentLandlord: user.apartmentLandlord,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt
    }
}

