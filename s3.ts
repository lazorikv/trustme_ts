import { s3Client } from "./src/db/config";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { S3_BUCKET } from './consts';
import multer from 'multer'
import multerS3 from 'multer-s3';

export async function deleteS3Object(objectKeys: string[]) {
    try {
      const command = new DeleteObjectsCommand({
        Bucket: 'trustmets',
        Delete: {
            Objects: objectKeys.map((key) => ({ Key: key.split('/').pop() })),
            Quiet: false,
          },
      });
      const response = await s3Client.send(command);
    } catch (err) {
      console.log(`Error from bucket`);
    }
  }

export const upload = multer({
    storage: multerS3({
      s3: s3Client,
      bucket: 'trustmets' as string,
      acl: 'public-read',
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname);
      }
    })
  });