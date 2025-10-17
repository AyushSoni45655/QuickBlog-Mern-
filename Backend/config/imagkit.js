import ImageKit from "imagekit";
import dotenv from 'dotenv';
dotenv.config();
var imagekit = new ImageKit({
  privateKey:process.env.PRIVATE_KEY,
  publicKey:process.env.PUBLIC_KEY,
  urlEndpoint:process.env.URL_ENDPOINT
});

export default imagekit;