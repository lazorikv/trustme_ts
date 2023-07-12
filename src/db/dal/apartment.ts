import { IApartment } from '../../api/interfaces/apartment.integrace'
import Address from '../models/address'
import Apartment, { ApartmentInput, ApartmentOutput } from '../models/apartment'
import User from '../models/user'


export const create = async (payload: ApartmentInput): Promise<ApartmentOutput> => {
    const apartment = await Apartment.create(payload)
    return apartment
}

export const update = async (id: number, payload: Partial<ApartmentInput>): Promise<ApartmentOutput> => {
    const apartment = await Apartment.findByPk(id)
    if (!apartment) {
        throw new Error('not found')
    }
    const updatedApartment = await (apartment as Apartment).update(payload)
    return updatedApartment
}

export const getById = async (id: number): Promise<ApartmentOutput> => {
    const apartment = await Apartment.findByPk(id, {include: [Address, {
        model: User,
        as: 'tenant'
      },
      {
        model: User,
        as: 'landlord'
      }
    ]})

    if (!apartment) {
        // @todo throw custom error
        throw new Error('not found')
    }

    return apartment
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedApartmentCount = await Apartment.destroy({
        where: {id}
    })

    return !!deletedApartmentCount
}

export const getAll = async (): Promise<IApartment[]> => {
    return Apartment.findAll({include: [Address, {
        model: User,
        as: 'landlord'
      },
      {
        model: User,
        as: 'tenant'
      }
    ]})
}