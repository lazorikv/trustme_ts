import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config'

interface AddressAttributes {
    id: number;
    city: string;
    district: string;
    street: string;
    house_number: string;
    apart_number: string;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface AddressInput extends Optional<AddressAttributes, 'id'> {}
export interface AddressOutput extends Required<AddressAttributes> {}


class Address extends Model<AddressAttributes, AddressInput> implements AddressAttributes {

    public id!: number
    public city!: string
    public district!: string
    public street!: string
    public house_number!: string
    public apart_number!: string

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Address.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        district: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        house_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        apart_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize: sequelize,
        paranoid: true
      }
)

export default Address;