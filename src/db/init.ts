import User from "./models/user";
import Address from "./models/address";
import Apartment from "./models/apartment";
import ApartmentPhoto from "./models/apartment_photos";


const isDev = process.env.NODE_ENV === 'development'

Address.hasOne(Apartment, { foreignKey: 'addressId' });
Apartment.belongsTo(Address, { foreignKey: 'addressId', as: 'address' });
Apartment.hasMany(ApartmentPhoto, { as: 'photos', foreignKey: 'apartmentId' });
ApartmentPhoto.belongsTo(Apartment, { as: 'apartment', foreignKey: 'apartmentId' });

User.hasOne(Apartment, { foreignKey: 'tenantId', as: 'apartmentTenant' });
User.hasMany(Apartment, { foreignKey: 'landlordId', as: 'apartmentLandlord'});
Apartment.belongsTo(User, { foreignKey: 'tenantId', as: 'tenant' });
Apartment.belongsTo(User, { foreignKey: 'landlordId', as: 'landlord' });


const dbInit = () => Promise.all( [

  Apartment.sync({ alter: isDev }),
  User.sync({ alter: isDev }),
  Address.sync({ alter: isDev }),
  ApartmentPhoto.sync({ alter: isDev })
])


export default dbInit 