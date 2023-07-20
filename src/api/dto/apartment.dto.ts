import { IAddressApart } from "../interfaces/apartment.integrace"


export type CreateApartmentDTO = {
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
}


export type UpdateApartmentDTO = CreateApartmentDTO