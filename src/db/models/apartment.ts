import { DataTypes, Model, Optional} from 'sequelize'
import sequelize from '../config'

interface ApartmentAttributes {
    id: number;
    floor: number;
    room_count: number;
    area: number;
    cost: number;
    description: string;
    title: string;
    is_rented: boolean;
    photos?: string[];
    addressId: number;
    tenantId?: number;
    landlordId: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ApartmentInput extends Optional<ApartmentAttributes, 'id'| 'tenantId'| 'photos'> {}
export interface ApartmentOutput extends Optional<ApartmentAttributes, 'tenantId'| 'photos'> {}


class Apartment extends Model<ApartmentAttributes, ApartmentInput> implements ApartmentAttributes {

    public id!: number
    public floor!: number
    public room_count!: number
    public area!: number
    public cost!: number
    public description!: string
    public title!: string
    public is_rented!: boolean
    public addressId!: number
    public tenantId?: number | undefined
    public landlordId!: number
    public photos?: string[] | undefined;


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}


Apartment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        floor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false
        },
        room_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false
        },
        area: {
            type: DataTypes.FLOAT,
            allowNull: false,
            unique: false
        },
        cost: {
            type: DataTypes.FLOAT,
            allowNull: false,
            unique: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_rented: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        addressId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tenantId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id',
              }
        },
        landlordId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
              }
        },
        photos: DataTypes.ARRAY(DataTypes.STRING),
        
    },
    {
        sequelize: sequelize,
        paranoid: true
      }
)

export default Apartment;