const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

async function getObject(key) {
  const command = new GetObjectCommand({
    Bucket: "vinay-private",
    Key: key,
  });
  const URL = await getSignedUrl(s3Client, command, { expiresIn: 10 });
  return URL;
}

async function putObject(fileName, contentType) {
  const command = new PutObjectCommand({
    Bucket: "vinay-private",
    Key: `uploads/user-uploads/${fileName}`,
    ContentType: contentType,
  });

  const URL = await getSignedUrl(s3Client, command);
  return URL;
}

async function listObjects() {
  const command = new ListObjectsCommand({
    Bucket: "vinay-private",
  });

  const getObjects = await s3Client.send(command);
  return getObjects;
}

async function deleteObject() {
  const command = new DeleteObjectCommand({
    Bucket: "vinay-private",
    Key: "icons8-docker-48.png",
  });

  const result = await s3Client.send(command);
  return result;
}

async function init() {
  // console.log(
  //   "Url for docker image : ",
  //   await getObject("uploads/user-uploads/icons8-docker-48.png")
  // );
  // console.log(
  //   "Url for upload image : ",
  //   await putObject("icons8-docker-48.png", "image/png")
  // );
  // console.log("DELETE objects from bucket: ", await deleteObject());
  console.log("GET objects from bucket: ", await listObjects());
}

init();
