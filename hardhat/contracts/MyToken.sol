// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract MyToken is ERC20Capped {
    constructor(string memory _name, string memory _symbol, uint256 _maxSupply) ERC20(_name, _symbol) ERC20Capped(_maxSupply) {}
}