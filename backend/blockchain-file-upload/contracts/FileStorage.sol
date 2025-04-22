// contracts/FileStorage.sol
pragma solidity ^0.8.0;

contract FileStorage {
    struct File {
        string hash;
        string fileName;
    }

    File[] public files;

    function storeFile(string memory _hash, string memory _fileName) public {
        files.push(File({
            hash: _hash,
            fileName: _fileName
        }));
    }

    function getFile(uint256 _index) public view returns (string memory, string memory) {
        require(_index < files.length, "File does not exist.");
        return (files[_index].hash, files[_index].fileName);
    }

    function getFileCount() public view returns (uint256) {
        return files.length;
    }
}