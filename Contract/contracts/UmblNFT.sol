// contracts/UmblNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UmblNFT is ERC721URIStorage, Ownable {
    // this contract's owner address
    address payable tokenOwnerAddress;    
    // this contract's token name
    string public tokenName;
    // this contract's token symbol
    string public tokenSymbol;
    // total number of token minted
    uint256 public tokenCounter;
    // token data structure
    struct UmblData {
        uint256 tokenId;
        string tokenName;
        string tokenURI;
        address payable mintedBy;
        address payable currentOwner;
        address payable previousOwner;
        uint256 price;
        uint256 numberOfTransfers;
        bool forSale;
    }

    // map token id to umbl data
    mapping(uint256 => UmblData) public allUmblData;
    // check if token name exists
    mapping(string => bool) public tokenNameExists;
    // check if token URI exists
    mapping(string => bool) public tokenURIExists;

    // initialize contract while deployment with contract's token name and symbol
    constructor() ERC721("Umbl NFT", "UMBL") {
        tokenName = name();
        tokenSymbol = symbol();
        tokenOwnerAddress = payable(msg.sender);
    }

    // mint a new token
    function mintUmbl(string memory _name, string memory _tokenURI,  uint256 _price)
        public onlyOwner
        returns (uint256)
    {
        // check if this function caller is not an zero address account
        require(msg.sender != address(0));

        // increase token counter
        tokenCounter ++;

        // check if a token exists with the above token id => incremented counter
        require(!_exists(tokenCounter));
        // check if the token URI already exists or not
        require(!tokenURIExists[_tokenURI]);
        // check if the token name already exists or not
        require(!tokenNameExists[_name]);

        // mint the token
        _mint(msg.sender, tokenCounter);
        // set token URI
        _setTokenURI(tokenCounter, _tokenURI);

        // make passed token URI as exists
        tokenURIExists[_tokenURI] = true;
        // make passed token name as exists
        tokenNameExists[_name] = true;

        // create a new token struct and pass it new values
        UmblData memory newUmblData = UmblData(
            tokenCounter,
            _name,
            _tokenURI,
            payable(msg.sender),
            payable(msg.sender),
            payable(address(0)),
            _price,
            0,
            true
        );

        // add the token id and it's struct to all tokens mapping
        allUmblData[tokenCounter] = newUmblData;

        // return token id
        return tokenCounter;
    }

    // get owner of the token
    function getTokenOwner(uint256 _tokenId)
        public view
        returns(address) 
    {
        address _tokenOwner = ownerOf(_tokenId);
        return _tokenOwner;
    }

    // get metadata of the token
    function getTokenMetaData(uint _tokenId)
        public view
        returns(string memory ) 
    {
        string memory _tokenMetaData = tokenURI(_tokenId);
        return _tokenMetaData;
    }

    // get total number of tokens minted so far
    function getNumberOfTokenMinted()
        public view
        returns(uint256)
    {
        // uint256 _totalNumberOfTokensMinted = totalSupply();
        uint256 _totalNumberOfTokensMinted = tokenCounter;
        return _totalNumberOfTokensMinted;
    }

    // get total number of tokens owned by an address
    function getTotalNumberOfTokensOwnedByAnAddress()
        public view
        returns(uint256)
    {
        uint256 _totalNumberOfTokensOwned = balanceOf(msg.sender);
        return _totalNumberOfTokensOwned;
    }

    // check if the token already exists
    function getTokenExists(uint256 _tokenId)
        public view
        returns(bool)
    {
        bool _tokenExists = _exists(_tokenId);
        return _tokenExists;
    }

    // buy a token by passing in the token's id
    function buyToken(uint256 _tokenId)
        public payable
    {
        // check if the function caller is not an zero address account
        require(msg.sender != address(0));

        // check if the token id of the token being bought exists or not
        require(_exists(_tokenId));

        // get the token's owner
        address tokenOwner = ownerOf(_tokenId);

        // token's owner should not be an zero address account
        require(tokenOwner != address(0));

        // the one who wants to buy the token should not be the token's owner
        require(tokenOwner != msg.sender);

        // get the token from all UmblData mapping and create a memory of it as defined
        UmblData memory umblData = allUmblData[_tokenId];

        // price sent in to buy should be equal to or more than the token's price
        require(msg.value >= umblData.price);

        // token should be for sale
        require(umblData.forSale);

        // transfer the token from owner to the caller of the function (buyer)
        _transfer(tokenOwner, msg.sender, _tokenId);

        // get owner of the token
        address payable sendTo = umblData.currentOwner;

        // get divided value of total token price
        uint256 _priceToOwner = msg.value / 10;
        uint256 _priceToSeller = msg.value - _priceToOwner;

        // send 10% token's worth of bnb to the owner
        tokenOwnerAddress.transfer(_priceToOwner);

        // send 90% token's worth of bnb to the owner
        sendTo.transfer(_priceToSeller);

        // update the token's previous owner
        umblData.previousOwner = umblData.currentOwner;

        // update the token's current owner
        umblData.currentOwner = payable(msg.sender);

        // update the token's transferred time
        umblData.numberOfTransfers += 1;

        // update the token's forSale to false
        umblData.forSale = false;

        // set and update that token in the mapping
        allUmblData[_tokenId] = umblData;
    }

    // update token's price
    function changeTokenPrice(uint256 _tokenId, uint256 _newPrice)
        public
    {
        // require caller of the function is not an empty address account
        require(msg.sender != address(0));

        // require that token should exist
        require(_exists(_tokenId));

        // get the token's owner
        address _tokenOwner = ownerOf(_tokenId);

        // check the token's owner should be equal to the caller of the function
        require(_tokenOwner == msg.sender);

        // get the token's struct from mapping and create a memory of it
        UmblData memory umblData = allUmblData[_tokenId];

        // update the token's price with new price
        umblData.price = _newPrice;

        // set and update the token in the mapping
        allUmblData[_tokenId] = umblData;
    }

    // switch between set for sale and set not for sale
    function toggleForSale(uint256 _tokenId)
        public
    {
        // require caller of the function is not an empty address account
        require(msg.sender != address(0));

        // require that token should exist
        require(_exists(_tokenId));

        // get the token's owner
        address _tokenOwner = ownerOf(_tokenId);

        // check the token's owner should be equal to the caller of the function
        require(_tokenOwner == msg.sender);

        // get the token's struct from mapping and create a memory of it
        UmblData memory umblData = allUmblData[_tokenId];

        // update the token's forSale
        if(umblData.forSale) {
            umblData.forSale = false;
        } else {
            umblData.forSale = true;
        }

        // set and update the token in the mapping
        allUmblData[_tokenId] = umblData;
    }
}