import { AddressOutput } from "../../db/models/address"
import { UserOutput } from "../../db/models/user"

export interface IApartmentCreate {
    id: number
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

    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
    address?: AddressOutput[]
}
