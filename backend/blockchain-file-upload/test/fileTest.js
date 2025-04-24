// test/fileTest.js
const assert = require("assert");
const { uploadFileToIPFS } = require("../src/services/ipfsService");
const {
  storeFileOnBlockchain,
  getFileFromBlockchain,
  retrieveFileFromPinata,
} = require("../src/controllers/blockchainController");
const crypto = require("crypto");
const fs = require("fs");

// Function to generate SHA-256 hash of a file buffer
const hashFile = (buffer) => {
    return crypto.createHash("sha256").update(buffer).digest("hex");
};


describe("File Upload System", function () {
  // Increase timeout for blockchain operations
  this.timeout(30000);

  let ipfsHash;
  let originalFile;

  before(async function() {
    // Setup: Deploy fresh contract if needed
    // Add any necessary contract deployment code here
  });

  it("should upload a file to IPFS", async function () {
    originalFile = "C:\Shabbir\Projects\Final_Year_Project\blockchain-file-upload\AdmitCard.pdf";

    if (!fs.existsSync(originalFile)) {
      throw new Error(`File does not exist: ${originalFile}`);
    }

    ipfsHash = await uploadFileToIPFS(originalFile);
    assert.ok(ipfsHash, "IPFS hash should not be empty");
  });

  it("should store the file hash on blockchain", async function () {
    // console.log(ipfsHash);
    const result = await storeFileOnBlockchain(ipfsHash, originalFile);
    assert.ok(result, "Transaction should be successful");
  });

  it("should retrieve the file from blockchain", async function () {
    // Upload the file and get the CID
    const ipfsHash = await uploadFileToIPFS("./AdmitCard.pdf");

    // Delay to ensure the file is available on IPFS
    await new Promise(resolve => setTimeout(resolve, 2000));

    const storedFile = await retrieveFileFromPinata(ipfsHash, "./downloaded_file.pdf");
    console.log("Retrieved file:", storedFile);

    // Ensure file is retrieved
    assert.ok(storedFile, "Retrieved file should not be null");

    // Compare file hashes instead of checking array indices
    const retrievedFileHash = hashFile(storedFile);
    const originalFileHash = hashFile(fs.readFileSync("./AdmitCard.pdf"));

    assert.strictEqual(retrievedFileHash, originalFileHash, "Retrieved file should match the uploaded file");
});

});