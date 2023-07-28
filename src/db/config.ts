require('dotenv').config()
import diff from 'microdiff'
import { Dialect, Model, Sequelize } from 'sequelize'
import { SequelizeHooks } from 'sequelize/types/hooks'

import { S3Client} from '@aws-sdk/client-s3';

import localCache from '../lib/local-cache'
import { AWS_ACCESS_KEY, AWS_REGION, AWS_SECRET_KEY } from '../../consts';

const isTest = process.env.NODE_ENV === 'test'


const awsConfig = {
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY as string,
    secretAccessKey: AWS_SECRET_KEY as string,
  },
};

// Create an instance of the S3 client
export const s3Client = new S3Client(awsConfig);

const dbName = isTest ? process.env.TEST_DB_NAME as string : process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASSWORD


const hooks: Partial<SequelizeHooks<Model<any, any>, any, any>> = {
  afterUpdate: (instance: Model<any, any>) => {
    const cacheKey = `${instance.constructor.name.toLowerCase()}s`

    const currentData = instance.get({ plain: true })

    if (!localCache.hasKey(cacheKey)) {
      return
    }

    const listingData = localCache.get<any>(cacheKey) as any[]
    const itemIndex = listingData.findIndex((it) => it.id === instance.getDataValue('id'))
    const oldItemData = ~itemIndex ? listingData[itemIndex] : {}

    const instanceDiff = diff(oldItemData, currentData)

    if (instanceDiff.length > 0) {
      listingData[itemIndex] = currentData
      localCache.set(cacheKey, listingData)
    }
  },
  afterCreate: (instance: Model<any, any>) => {
    const cacheKey = `${instance.constructor.name.toLowerCase()}s`
    const currentData = instance.get({ plain: true })

    if (!localCache.hasKey(cacheKey)) {
      return
    }

    const listingData = localCache.get<any>(cacheKey) as any[]
    listingData.push(currentData)

    localCache.set(cacheKey, listingData)
  },
}


const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    logging: true,
    define: {hooks}
  });

  export default sequelize;