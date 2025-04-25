// src/controllers/blockchainController.js
const FileStorage = require("../../build/contracts/FileStorage.json");
const Web3 = require("web3");
const fs = require("fs");
const axios = require("axios");
const { uploadFileToIPFS } = require("../services/ipfsService");

const web3 = new Web3("http://localhost:7545");
const contractAddress = "0x71D4f0575fCCCdA56D38e2beF137aB1d699f9Bd4"; // Replace with your deployed contract address
const fileStorage = new web3.eth.Contract(FileStorage.abi, contractAddress);

// const storeFileOnBlockchain = async (hash, fileName) => {
//     const accounts = await web3.eth.getAccounts();
//     await fileStorage.methods.storeFile(hash, fileName).send({ from: accounts[0] });
// };

const storeFileOnBlockchain = async (hash, fileName) => {
  const accounts = await web3.eth.getAccounts();
  const tx = await fileStorage.methods
    .storeFile(hash, fileName)
    .send({ from: accounts[0] });
  console.log("Transaction Receipt:", tx); // Debugging log
  return tx; // Ensure function returns tx
};

const getFileFromBlockchain = async (index) => {
  return await fileStorage.methods.getFile(index).call();
};

// const retrieveFileFromPinata = async (cid) => {
//     try {
//         const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
//         const response = await axios.get(url, { responseType: 'arraybuffer' });

//         console.log("File retrieved successfully");
//         return response.data;
//     } catch (error) {
//         console.error("Error retrieving file from Pinata:", error.message);
//         throw error;
//     }
// };

const retrieveFileFromPinata = async (cid, outputPath) => {
  try {
    const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
    const response = await axios.get(url, { responseType: "arraybuffer" });

    // Save the file locally
    fs.writeFileSync(outputPath, response.data);
    console.log(`File downloaded successfully to ${outputPath}`);
  } catch (error) {
    console.error("Error retrieving file from Pinata:", error.message);
    throw error;
  }
};

module.exports = {
  storeFileOnBlockchain,
  getFileFromBlockchain,
  retrieveFileFromPinata,
};
