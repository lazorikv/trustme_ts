import { AddressOutput } from "../../../db/models/address"

export const toAddress = (user: AddressOutput): AddressOutput => {
    return {
        id: user.id,
        city: user.city,
        district: user.district,
        street: user.street,
        house_number: user.house_number,
        apart_number: user.apart_number,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt
    }
}