// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


contract ImplementationExamplev1 {

    address public starter;
    address public finisher;
    uint256 private startCode;
    uint256 private finishCode;

    constructor(
        address _starter
    ) {
        starter = _starter;
    }

    function setStartCode(uint256 code) public {
        require(msg.sender == starter);
        startCode = code;
    }

    function setFinisher(address finisherAddress) public {
        require(msg.sender == starter);
        finisher = finisherAddress;
    }

    function setFinishCode(uint256 code) public {
        require(msg.sender == finisher);
        finishCode = code;
    }
}
