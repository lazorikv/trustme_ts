import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config'

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'landlord' | 'tenant';
    phone: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'email'> {}
export interface UserOutput extends Required<UserAttributes> {}


class User extends Model<UserAttributes, UserInput> implements UserAttributes {

    public id!: number
    public name!: string
    public email!: string
    public phone!: string
    public password!: string
    public role!: 'landlord' | 'tenant';

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('landlord', 'tenant'),
            allowNull: false,
          },
    },
    {
        sequelize: sequelize,
        paranoid: true
      }
)

export default User;