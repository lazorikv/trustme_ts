import { AddressOutput } from "../../db/models/address"
import { UserOutput } from "../../db/models/user"

export interface IAddressApart {
    city: string
    district: string
    street: string
    house_number: string
    apart_number: string
}


export interface IApartmentCreate {
    floor: number
    room_count: number
    area: number
    cost: number
    description: string
    title: string
    is_rented: boolean
    addressId: number
    tenantId?: number | undefined
    landlordId: number
    photos?: string[]

    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface IApartment {
    id: number
    floor: number
    room_count: number
    area: number
    cost: number
    description: string
    title: string
    is_rented: boolean
    tenant?: UserOutput[]
    landlord?: UserOutput[]
    photos?: string[]

    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
    address?: AddressOutput[]
}

export interface PhotoData {
    photos: object[]
}
