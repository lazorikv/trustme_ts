import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import sequelize from '../config';

interface ApartmentPhotoAttributes {
  id: number;
  apartmentId: string;
  url: string;
}

export interface ApartmentPhotoCreationAttributes extends Optional<ApartmentPhotoAttributes, 'id'> {}

export interface ApartmentPhotoOutput extends Required<ApartmentPhotoAttributes> {}

export class ApartmentPhoto extends Model<ApartmentPhotoAttributes, ApartmentPhotoCreationAttributes> implements ApartmentPhotoAttributes {
  public id!: number;
  public apartmentId!: string;
  public url!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ApartmentPhoto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    apartmentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'ApartmentPhoto',
  }
);

export default ApartmentPhoto;