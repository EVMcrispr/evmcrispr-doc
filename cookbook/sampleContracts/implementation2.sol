// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


contract ImplementationExamplev2 {

    address public starter;
    address public finisher;
    uint256 private startCode;
    uint256 private finishCode;
    address public approver;
    bool public workApproved;


    constructor (
        address _starter,
        address _approver
    ) {
        starter = _starter;
        approver = _approver;
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

    function approveWork(uint256 startC, uint256 finishC) public {
        require(startC == startCode, "wrong start code");
        require(finishC == finishCode, "wrong finish code");
        require(msg.sender == approver, "you are not the approver!");
        workApproved = true;
    }
}
