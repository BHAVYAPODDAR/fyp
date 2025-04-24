// src/services/ipfsService.js
require("dotenv").config();



const pinata = require("../config/pinata");
// require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });
const { PinataSDK } = require("pinata-web3");
const fs = require("fs");
const { Blob } = require("buffer");
const path = require("path");

const pinata1 = new PinataSDK({
  pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2YzNjMzdjNy1hNmYzLTRiNTYtYjQxOS0wNzI0NGM3MDUyMjgiLCJlbWFpbCI6ImJvb2tzYXJlbGlmZTExNzdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImQwNjY1MzExMTgxZThiNWU2NzE1Iiwic2NvcGVkS2V5U2VjcmV0IjoiNzkwZWQ3Y2JkZGUyOGMwY2Y3NjY4MjE0MDY0OTg0YjAzOThhNmY0OWRiNzJhYjA2YzNkYzNhY2ZjYjE5MWVhYiIsImV4cCI6MTc3NjY3NTc5Nn0.MVvKg2DHAuw4UC1Bg1-1w_SbH9kYLD_NNnZW49cHdwY",
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
