// src/controllers/fileController.js
const { uploadFileToIPFS } = require('../services/ipfsService');
const { storeFileOnBlockchain, getFileFromBlockchain } = require('./blockchainController');

const uploadFile = async (req, res) => {
    try {
        const file = req.file;
        const ipfsHash = await uploadFileToIPFS(file);
        await storeFileOnBlockchain(ipfsHash, file.originalname);
        res.status(200).json({ message: 'File uploaded successfully', ipfsHash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFile = async (req, res) => {
    try {
        const index = req.params.index;
        const file = await getFileFromBlockchain(index);
        res.status(200).json(file);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    uploadFile,
    getFile
};