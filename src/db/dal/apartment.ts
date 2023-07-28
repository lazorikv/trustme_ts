import { IApartment, IApartmentCreate } from '../../api/interfaces/apartment.integrace'
import Address from '../models/address'
import Apartment, { ApartmentInput, ApartmentOutput } from '../models/apartment'
import User from '../models/user'
import sequelize from '../config'
import { deleteS3Object } from '../../../s3'


export const create = async (payload: IApartmentCreate): Promise<ApartmentOutput> => {
    const { floor, room_count, area, cost, description, title, is_rented, addressId, tenantId, landlordId, photos} = payload;
    const apartment = await Apartment.create({
      floor,
      room_count,
      area,
      cost,
      description,
      title,
      is_rented,
      addressId,
      tenantId,
      landlordId,
      photos
    });
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
    const apartment = await Apartment.findByPk(id, {include: [{
        model: Address,
        as: 'address'
      }, {
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

    const apartment = await getById(id)
    console.log(apartment)
    if (apartment.photos) {
        try {
          await deleteS3Object(apartment.photos)
      }
      catch (error) {
          return false
      }
    }

    const deletedApartmentCount = await Apartment.destroy({
        where: {id}
    })

    return !!deletedApartmentCount
}

export const getAll = async (): Promise<IApartment[]> => {
    return Apartment.findAll({include: [{
        model: Address,
        as: 'address'
      }, {
        model: User,
        as: 'landlord'
      },
      {
        model: User,
        as: 'tenant'
      }
    ]})
}

export const getAllPagination = async (page: number, limit: number): Promise<IApartment[]> => {
  const offset = (page - 1) * limit;

  return Apartment.findAll({
    offset,
    limit,
    include: [
      {
        model: Address,
        as: 'address',
      },
      {
        model: User,
        as: 'landlord',
      },
      {
        model: User,
        as: 'tenant',
      },
    ],
  });
};

export const recommendApartment = async (): Promise<IApartment[]> => {
  return Apartment.findAll({
    include: [
      {
        model: Address,
        as: 'address',
      },
      {
        model: User,
        as: 'landlord',
      },
      {
        model: User,
        as: 'tenant',
      },
    ],
    order: sequelize.random(),
    limit: 6,
  });
}


export const getAllByLandlordId = async (landlordId: number): Promise<IApartment[]> => {
  return Apartment.findAll({
    where: {
      landlordId: landlordId,
    },
    include: [
      {
        model: Address,
        as: 'address',
      },
      {
        model: User,
        as: 'landlord',
      },
      {
        model: User,
        as: 'tenant',
      },
    ],
  });
};