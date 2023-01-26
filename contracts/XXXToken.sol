// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract XXXToken is ERC20, Ownable {
    constructor() ERC20("XXX Token", "XXX") {
        _mint("address",90000000000000000000); 
    }


}


