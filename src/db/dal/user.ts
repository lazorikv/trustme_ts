import { TenantApartmentInterface, LandlordApartmentInterface } from '../../api/interfaces'
import Apartment from '../models/apartment'
import User, { UserInput, UserOutput} from '../models/user'

export const create = async (payload: UserInput): Promise<UserOutput> => {
    const user = await User.create(payload)
    return user
}

export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
    const user = await User.findByPk(id)
    if (!user || user.role === 'tenant') {
        throw new Error('not found')
    }
    const updatedUser = await (user as User).update(payload)
    return updatedUser
}

export const getTenantById = async (id: number): Promise<TenantApartmentInterface> => {
    const user = await User.findByPk(id, {
        include: [
          {
            model: Apartment,
            as: 'apartmentTenant'
          }
        ]
      })

    if (!user || user.role === 'landlord') {
        // @todo throw custom error
        throw new Error('not found')
    }

    return user
}

export const getLandlordById = async (id: number): Promise<LandlordApartmentInterface> => {
    const user = await User.findByPk(id, {
        include: [
          {
            model: Apartment,
            as: 'apartmentLandlord'
          }
        ]
      })

    if (!user) {
        // @todo throw custom error
        throw new Error('not found')
    }

    return user
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedUserCount = await User.destroy({
        where: {id}
    })

    return !!deletedUserCount
}

export const getAllTenants = async (): Promise<TenantApartmentInterface[]> => {
    return User.findAll({
        include: [
          {
            model: Apartment,
            as: 'apartmentTenant'
          }
        ],
        where: {
          role: 'tenant'
        }
      })
}

export const getAllLandlords = async (): Promise<LandlordApartmentInterface[]> => {
    return User.findAll({
        include: [
          {
            model: Apartment,
            as: 'apartmentLandlord'
          }
        ],
        where: {
          role: 'landlord'
        }
      })
}