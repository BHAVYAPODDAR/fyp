// src/services/ipfsService.js
require("dotenv").config();



const pinata = require("../config/pinata");
// require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });
const { PinataSDK } = require("pinata-web3");
const fs = require("fs");
const { Blob } = require("buffer");
const path = require("path");

const pinata1 = new PinataSDK({
  pinataJwt: process.env.JWT_Access,
  pinataGateway: "chocolate-payable-unicorn-130.mypinata.cloud",
});

const uploadFileToIPFS = async (filePath) => {
  try {
    const fileBuffer = fs.readFileSync(filePath); // Read as a buffer
    const blob = new Blob([fileBuffer], { type: "application/pdf" }); // Ensure PDF type
    const fileName = path.basename(filePath);
    const file = new File([blob], fileName, { type: "application/pdf" });

    const upload = await pinata1.upload.file(file);
    return upload.IpfsHash;
  } catch (error) {
    console.log(pinata1.pinataJwt);
    console.log(error);
  }
};

// await uploadFileToIPFS();

module.exports = {
  uploadFileToIPFS,
};

// const uploadFileToIPFS = async (file) => {
//     try {
//         const result = await pinata.pinFileToIPFS(file);
//         return result.IpfsHash;
//     } catch (error) {
//         throw new Error('Failed to upload file to IPFS');
//     }
// };

// module.exports = {
//     uploadFileToIPFS
// };

// const axios = require('axios');
// const fs = require('fs');
// const FormData = require('form-data');
// require('dotenv').config(); // To load environment variables from a .env file

// const uploadFileToIPFS = async (filePath) => {
//   try {
//     const form = new FormData();
//     form.append('file', fs.createReadStream(filePath));

//     const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', form, {
//       headers: {
//         ...form.getHeaders(),
//         pinata_api_key: process.env.PINATA_API_KEY,
//         pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
//       },
//     });

//     return response.data.IpfsHash;
//   } catch (error) {
//     console.error("Error uploading to IPFS:", error);
//     throw error;  // Propagate the error for further handling
//   }
// };

// module.exports = { uploadFileToIPFS };


