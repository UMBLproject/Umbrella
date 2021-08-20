/* eslint-disable */
const { assert } = require("chai");

const umbl_nft_abi = artifacts.require("./UmblNFT.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Umbl NFT", async (accounts) => {
  let umblNFT, result, umblNFTCount;

  before(async () => {
    umblNFT = await umbl_nft_abi.deployed();
  });

  describe("Deployment", async() => {
    it("contract has an address", async () => {
      const address = await umblNFT.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await umblNFT.tokenName();
      assert.equal(name, "Umbl NFT");
    });

    it("has a symbol", async () => {
      const symbol = await umblNFT.tokenSymbol();
      assert.equal(symbol, "UMBL");
    });
  });

  describe("Minting features", async () => {
    it("allows users to mint ERC721 token", async () => {
      umblNFTCount = await umblNFT.tokenCounter();
      assert.equal(umblNFTCount.toNumber(), 0);

      let tokenExists;
      tokenExists = await umblNFT.getTokenExists(1, { from: accounts[0] });
      assert.equal(tokenExists, false);

      let tokenURIExists;
      tokenURIExists = await umblNFT.tokenURIExists(
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPHRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2",
        { from: accounts[0] }
      );
      assert.equal(tokenURIExists, false);

      let tokenNameExists;
      tokenNameExists = await umblNFT.tokenNameExists("myUmblNFT", {
        from: accounts[0],
      });
      assert.equal(tokenNameExists, false);

      result = await umblNFT.mintUmbl(
        "myUmblNFT",
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPHRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2",
        web3.utils.toWei("1.7548", "Ether"),
        { from: accounts[0] }
      );

      umblNFTCount = await umblNFT.tokenCounter();
      assert.equal(umblNFTCount.toNumber(), 1);

      tokenExists = await umblNFT.getTokenExists(1, { from: accounts[0] });
      assert.equal(tokenExists, true);

      tokenURIExists = await umblNFT.tokenURIExists(
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPHRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2",
        { from: accounts[0] }
      );
      assert.equal(tokenURIExists, true);

      tokenNameExists = await umblNFT.tokenNameExists("myUmblNFT", {
        from: accounts[0],
      });
      assert.equal(tokenNameExists, true);


      let umblData;
      umblData = await umblNFT.allUmblData(1, {
        from: accounts[0],
      });
      assert.equal(umblData.tokenId.toNumber(), 1);
      assert.equal(umblData.tokenName, "myUmblNFT");
      assert.equal(
        umblData.tokenURI,
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPHRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/2"
      );
      assert.equal(umblData.mintedBy, accounts[0]);
      assert.equal(umblData.currentOwner, accounts[0]);
      assert.equal(
        umblData.previousOwner,
        0x0000000000000000000000000000000000000000
      );
      assert.equal(web3.utils.fromWei(umblData.price, "ether"), 1.7548);
      assert.equal(umblData.numberOfTransfers.toNumber(), 0);
      assert.equal(umblData.forSale, true);

      result = await umblNFT.mintUmbl(
        "myUmblNFT-2",
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPHRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/3",
        web3.utils.toWei("3.6092", "Ether"),
        { from: accounts[0] }
      );
      
    });
  });

  describe("Minting access limit", async () => {
    it("minting is allowed for only owners", async () => {
      await umblNFT.mintUmbl(
        "myUmblNFT-3",
        "https://gateway.pinata.cloud/ipfs/QmYFmJgQGH4uPQRYN15Xdv4aLd9o4Aq63y1e4GgN6kj5aK/4",
        web3.utils.toWei("0.6521", "Ether"),
        { from: accounts[1] }
      ).should.be.rejected;
    });
  });  
  
  describe("Buying token from other account", async () => {
    it("allows users to buy token for specified ethers", async () => {
      const oldTokenOwner = await umblNFT.getTokenOwner(1);
      assert.equal(oldTokenOwner, accounts[0]);

      let oldTokenOwnerBalance;
      oldTokenOwnerBalance = await web3.eth.getBalance(accounts[0]);
      oldTokenOwnerBalance = new web3.utils.BN(oldTokenOwnerBalance);

      let oldTotalNumberOfTokensOwnedBySeller;
      oldTotalNumberOfTokensOwnedBySeller = await umblNFT.getTotalNumberOfTokensOwnedByAnAddress(
        accounts[0]
      );
      assert.equal(oldTotalNumberOfTokensOwnedBySeller.toNumber(), 2);

      let umblData;
      umblData = await umblNFT.allUmblData(1, {
        from: accounts[0],
      });
      assert.equal(umblData.numberOfTransfers.toNumber(), 0);

      result = await umblNFT.buyToken(1, {
        from: accounts[2],
        value: web3.utils.toWei("1.7548", "Ether"),
      });

      const newTokenOwner = await umblNFT.getTokenOwner(1);
      assert.equal(newTokenOwner, accounts[2]);

      let newTokenOwnerBalance;
      newTokenOwnerBalance = await web3.eth.getBalance(accounts[0]);
      newTokenOwnerBalance = new web3.utils.BN(newTokenOwnerBalance);

      let newTotalNumberOfTokensOwnedBySeller;
      newTotalNumberOfTokensOwnedBySeller = await umblNFT.getTotalNumberOfTokensOwnedByAnAddress(
        accounts[0]
      );
      assert.equal(newTotalNumberOfTokensOwnedBySeller.toNumber(), 1);

      umblData = await umblNFT.allUmblData(1, {
        from: accounts[0],
      });
      assert.equal(umblData.numberOfTransfers.toNumber(), 1);

      let price;
      price = web3.utils.toWei("1.7548", "Ether");
      price = new web3.utils.BN(price);

      const exepectedBalance = oldTokenOwnerBalance.add(price);
      assert.equal(
        newTokenOwnerBalance.toString(),
        exepectedBalance.toString()
      );

      umblData = await umblNFT.allUmblData(1, {
        from: accounts[0],
      });
      assert.equal(umblData.currentOwner, accounts[2]);
    });
  });
});
