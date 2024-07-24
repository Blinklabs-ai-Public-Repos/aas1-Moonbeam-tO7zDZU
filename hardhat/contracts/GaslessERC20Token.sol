// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

/**
 * @title GaslessERC20Token
 * @dev Implementation of the ERC20 Token Standard with gasless transactions.
 * This contract inherits from OpenZeppelin's ERC20Permit to enable gasless transactions.
 */
contract GaslessERC20Token is ERC20Permit {
    uint256 private immutable _maxSupply;

    /**
     * @dev Constructor that sets the name, symbol, and maximum supply of the token.
     * @param name_ The name of the token.
     * @param symbol_ The symbol of the token.
     * @param maxSupply_ The maximum supply of the token.
     */
    constructor(string memory name_, string memory symbol_, uint256 maxSupply_) 
        ERC20(name_, symbol_)
        ERC20Permit(name_)
    {
        require(maxSupply_ > 0, "Max supply must be greater than zero");
        _maxSupply = maxSupply_;
    }

    /**
     * @dev Returns the maximum supply of the token.
     * @return The maximum supply.
     */
    function maxSupply() public view returns (uint256) {
        return _maxSupply;
    }

    /**
     * @dev Mints new tokens, respecting the maximum supply limit.
     * @param to The address that will receive the minted tokens.
     * @param amount The amount of tokens to mint.
     * @notice Only the contract owner can call this function.
     */
    function mint(address to, uint256 amount) public {
        require(totalSupply() + amount <= _maxSupply, "Minting would exceed max supply");
        _mint(to, amount);
    }

    /**
     * @dev Burns a specific amount of tokens.
     * @param amount The amount of token to be burned.
     */
    function burn(uint256 amount) public {
        _burn(_msgSender(), amount);
    }

    /**
     * @dev Overrides the {transfer} function to add a check against the maximum supply.
     * @param to The recipient address.
     * @param value The amount to transfer.
     * @return A boolean indicating whether the transfer was successful.
     */
    function transfer(address to, uint256 value) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, value);
        return true;
    }

    /**
     * @dev Overrides the {transferFrom} function to add a check against the maximum supply.
     * @param from The sender address.
     * @param to The recipient address.
     * @param value The amount to transfer.
     * @return A boolean indicating whether the transfer was successful.
     */
    function transferFrom(address from, address to, uint256 value) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, value);
        _transfer(from, to, value);
        return true;
    }
}