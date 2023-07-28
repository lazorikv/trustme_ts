declare global {
    namespace NodeJS {
      interface ProcessEnv {
        S3_BUCKET: string;
        NODE_ENV: 'development' | 'production';
        AWS_ACCESS_KEY: string;
        AWS_SECRET_KEY: string;
      }
    }
  }