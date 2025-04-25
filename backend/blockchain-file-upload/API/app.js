const express = require("express");
const os = require("os");

const fileUpload = require("express-fileupload");
const { uploadFileToIPFS } = require("../src/services/ipfsService");
const {
  storeFileOnBlockchain,
  retrieveFileFromPinata,
} = require("../src/controllers/blockchainController");
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

const app = express();
app.use(fileUpload());

const hashFile = (buffer) => {
  return crypto.createHash("sha256").update(buffer).digest("hex");
};

// POST /upload
app.post("/upload", async (req, res) => {
  try {
    const file = req.files?.file;
    if (!file) return res.status(400).send("No file uploaded");

    const filePath = path.join(__dirname, "../uploads", file.name);
    await file.mv(filePath);

    const ipfsHash = await uploadFileToIPFS(filePath);
    await storeFileOnBlockchain(ipfsHash, filePath);

    res.json({ message: "File uploaded and stored", cid: ipfsHash });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading file");
  }
});

// GET /retrieve/:cid
app.get("/retrieve/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const downloadsFolder = path.join(os.homedir(), "Downloads");
    const outputPath = path.join(downloadsFolder, `${cid}.pdf`);

    // Retrieve the file from IPFS (assume it writes to disk)
    await retrieveFileFromPinata(cid, outputPath);

    // Compute hash from file on disk
    const fileBuffer = fs.readFileSync(outputPath);
    const fileHash = hashFile(fileBuffer);
    console.log("File hash:", fileHash);

    res.download(
      outputPath,
      (err) => err && console.error("Download error:", err)
    );
  } catch (err) {
    console.error("Retrieval error:", err);
    res.status(500).send("Error retrieving file");
  }
});

module.exports = app;
