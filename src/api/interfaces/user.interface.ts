import { ApartmentOutput } from "../../db/models/apartment"

export interface UserInterface {
    id: number
    name: string
    email: string
    password: string
    phone: string
    role: 'landlord' | 'tenant'
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}

export interface TenantApartmentInterface {
    id: number
    name: string
    email: string
    password: string
    phone: string
    role: 'landlord' | 'tenant'
    apartmentTenant?: ApartmentOutput[]
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}

export interface LandlordApartmentInterface {
    id: number
    name: string
    email: string
    password: string
    phone: string
    role: 'landlord' | 'tenant'
    apartmentLandlord?: ApartmentOutput[]
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}
