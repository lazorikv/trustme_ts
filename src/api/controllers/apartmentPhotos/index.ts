import { ApartmentPhotoOutput } from '../../../db/models/apartment_photos'
import * as service from '../../../db/services/ApartmentPhoto'
import { CreateApartmentPhotoDTO } from '../../dto/photos.dto'
import * as mapper from './mapper'


export const create = async(payload: CreateApartmentPhotoDTO): Promise<ApartmentPhotoOutput> => {
    return mapper.toApartmentPhoto(await service.create(payload))
}

export const getByApartmentId = async (id: number): Promise<ApartmentPhotoOutput[]> => {
    return (await service.getByApartmentId(id)).map(mapper.toApartmentPhoto)
}

export const deleteById = async (id: number): Promise<boolean> => {
    const isDeleted = await service.deleteById(id)
    return isDeleted
}