import dotenv from 'dotenv';

dotenv.config();

export const S3_BUCKET = process.env.S3_BUCKET!;
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY!;
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY!;
export const AWS_REGION = process.env.AWS_REGION!;
export const EMAIL_ADMIN = process.env.EMAIL_ADMIN!;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD!;
export const EMAIL_ORG = process.env.EMAIL_ORG!;
export const DB_DRIVER = process.env.DB_DRIVER!;