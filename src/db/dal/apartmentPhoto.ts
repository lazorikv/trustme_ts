import ApartmentPhoto, { ApartmentPhotoCreationAttributes, ApartmentPhotoOutput } from '../models/apartment_photos'


export const create = async (payload: ApartmentPhotoCreationAttributes): Promise<ApartmentPhotoOutput> => {
    const photo = await ApartmentPhoto.create(payload)
    return photo
}

export const getByApartmentId = async (id: number): Promise<ApartmentPhotoOutput[]> => {
    const photos = await ApartmentPhoto.findAll(
        {
            where: {
                apartmentId: id
            }
        }
    )
    return photos
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedPhotoCount = await ApartmentPhoto.destroy({
        where: {id}
    })

    return !!deletedPhotoCount
}