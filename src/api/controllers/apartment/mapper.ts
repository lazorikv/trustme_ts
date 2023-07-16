import { AddressOutput } from "../../../db/models/address"
import { ApartmentOutput } from "../../../db/models/apartment"
import { IApartment } from '../../interfaces/apartment.integrace';

export const toApartmentCreate = (apartment: ApartmentOutput): ApartmentOutput => {
    return {
        id: apartment.id,
        floor: apartment.floor,
        room_count: apartment.room_count,
        area: apartment.area,
        cost: apartment.cost,
        description: apartment.description,
        title: apartment.title,
        is_rented: apartment.is_rented,
        addressId: apartment.addressId,
        tenantId: apartment.tenantId,
        landlordId: apartment.landlordId,
        createdAt: apartment.createdAt,
        updatedAt: apartment.updatedAt,
        deletedAt: apartment.deletedAt
    }
}

export const toApartment = (apartment: IApartment): IApartment => {
    return {
        id: apartment.id,
        floor: apartment.floor,
        room_count: apartment.room_count,
        area: apartment.area,
        cost: apartment.cost,
        description: apartment.description,
        title: apartment.title,
        is_rented: apartment.is_rented,
        tenant: apartment.tenant,
        landlord: apartment.landlord,
        createdAt: apartment.createdAt,
        updatedAt: apartment.updatedAt,
        deletedAt: apartment.deletedAt,
        address: apartment.address
    }
}