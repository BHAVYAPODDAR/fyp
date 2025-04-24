// migrations/1_deploy_contracts.js
const FileStorage = artifacts.require("FileStorage");

module.exports = function (deployer) {
  // Deploy the FileStorage contract
  deployer.deploy(FileStorage);
};