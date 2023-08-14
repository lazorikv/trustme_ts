import { ApartmentPhotoOutput } from "../../../db/models/apartment_photos"

export const toApartmentPhoto = (photo: ApartmentPhotoOutput): ApartmentPhotoOutput => {
    return {
        id: photo.id,
        url: photo.url,
        apartmentId: photo.apartmentId
    }
}