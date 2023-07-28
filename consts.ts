import dotenv from 'dotenv';

dotenv.config();

export const S3_BUCKET = process.env.S3_BUCKET!;
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY!;
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY!;
export const AWS_REGION = process.env.AWS_REGION!;