// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title Token - a simple example
 */
contract Token {
    struct Info {
        string ownerName;
        uint age;
        uint balance;
    }
    
    mapping(bytes32 => Info) public personalInfo;
    
    event OwnerInformationAdded(bytes32 indexed key, string ownerName, uint age, uint balance);
    event OwnerInformationRemoved(bytes32 indexed key);
    
    function addOwnerInformation(bytes32 _key, string memory _name, uint _age, uint _balance) public {
        Info memory newInfo = Info(_name, _age, _balance);
        personalInfo[_key] = newInfo;
        emit OwnerInformationAdded(_key, _name, _age, _balance);
    }
    
    function removeOwnerInformation(bytes32 _key) public {
        delete personalInfo[_key];
        emit OwnerInformationRemoved(_key);
    }
    
    function getOwnerInformation(bytes32 _key) public view returns (string memory, uint, uint) {
        Info memory info = personalInfo[_key];
        return (info.ownerName, info.age, info.balance);
    }
}