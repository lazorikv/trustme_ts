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
}


export type UpdateApartmentDTO = CreateApartmentDTO