import User from "./models/user";
import Address from "./models/address";
import Apartment from "./models/apartment";


const isDev = process.env.NODE_ENV === 'development'

Address.hasOne(Apartment, { foreignKey: 'addressId' });
Apartment.belongsTo(Address, { foreignKey: 'addressId' });

User.hasOne(Apartment, { foreignKey: 'tenantId', as: 'tenant' });
User.hasOne(Apartment, { foreignKey: 'landlordId', as: 'landlord' });
Apartment.belongsTo(User, { foreignKey: 'tenantId', as: 'tenant' });
Apartment.belongsTo(User, { foreignKey: 'landlordId', as: 'landlord' });

const dbInit = () => Promise.all( [

  Apartment.sync({ alter: isDev }),
  User.sync({ alter: isDev }),
  Address.sync({ alter: isDev }),
])


export default dbInit 