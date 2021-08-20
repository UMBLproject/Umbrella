const UmblNFT = artifacts.require("UmblNFT");

module.exports = async function(deployer) {
  await deployer.deploy(UmblNFT);
};
