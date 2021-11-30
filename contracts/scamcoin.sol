// SPDX-License-Identifier: None

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ScamCoin is ERC20{
    constructor() ERC20("ScamCoin", "SCM"){
        // Star supply with 21 million tokens.
        _mint(msg.sender, 21_000_000 * 10**decimals());
    }
}