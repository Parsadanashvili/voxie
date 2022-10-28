import S3 from "aws-sdk/clients/s3";

const storage = new S3({
  region: "eu-north-1",
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  signatureVersion: "v4",
});

export default storage;
