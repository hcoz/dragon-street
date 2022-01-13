// Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

/**
 * @title Creature
 * Creature - a contract for my non-fungible creatures.
 */
contract DragonStreetNFT is ERC721Tradable {
    constructor(address _proxyRegistryAddress)
        ERC721Tradable("DragonStreetNFT", "DSN", _proxyRegistryAddress)
    {}

    function baseTokenURI() override public pure returns (string memory) {
        // return "https://creatures-api.opensea.io/api/creature/";
        return "https://dragonstreetnft.com/api/dragon/";
    }

    function contractURI() public pure returns (string memory) {
        return "https://creatures-api.opensea.io/contract/opensea-creatures";
    }
}
