import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import sequelize from '../config';

interface ApartmentPhotoAttributes {
  id: number;
  apartmentId: number;
  url: string;
}

interface ApartmentPhotoCreationAttributes extends Optional<ApartmentPhotoAttributes, 'id'> {}

export class ApartmentPhoto extends Model<ApartmentPhotoAttributes, ApartmentPhotoCreationAttributes> implements ApartmentPhotoAttributes {
  public id!: number;
  public apartmentId!: number;
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
      type: DataTypes.INTEGER,
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