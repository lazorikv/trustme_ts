import * as photoDal from '../dal/apartmentPhoto'
import { ApartmentPhotoCreationAttributes, ApartmentPhotoOutput} from '../models/apartment_photos';


export const create = (payload: ApartmentPhotoCreationAttributes): Promise<ApartmentPhotoOutput> => {
    return photoDal.create(payload)
}

export const getByApartmentId = (id: number): Promise<ApartmentPhotoOutput[]> => {
    return photoDal.getByApartmentId(id)
}

export const deleteById = (id: number): Promise<boolean> => {
    return photoDal.deleteById(id)
}