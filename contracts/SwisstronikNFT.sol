// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SwisstronikNFT is ERC721 {
    constructor() ERC721("SwisstronikNFT", "SWNFT") {}

    function mint1NFT() public {
        _safeMint(msg.sender,94562134855623);
    }
}