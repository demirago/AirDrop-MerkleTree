const { MerkleTree } = require('merkletreejs')  
const KECCAK256 = require('keccak256');  
const { BigNumber } = require('ethers');
const fs = require('fs').promises;

async function main() {
  
  const walletAddresses = [""]; 
  console.log("1");

  const leaves = walletAddresses.map(x => KECCAK256(x))
  console.log("2");

  const tree = new MerkleTree(leaves, KECCAK256, { sortPairs: true })
  console.log("3");
  
  const XXXToken = await ethers.getContractFactory('XXXToken');
  console.log("4");

  const token = await XXXToken.deploy();
  console.log("5");

  const MerkleDistributor = await ethers.getContractFactory('MerkleDistributor');
  console.log("6");

  distributor = await MerkleDistributor.deploy(
    token.address,
    tree.getHexRoot(),
    BigNumber.from('2000000000000000000')   //claim edilen değer.    
  );
  console.log("7");
 
  console.log(tree.getHexRoot);

  console.log("XXXToken:",           token.address);
  console.log("MerkleDistributor:",  distributor.address);
 
 
  const indexedAddresses = {}
  walletAddresses.map((x, idx) => indexedAddresses[idx] = x)

  const serializedAddresses = JSON.stringify(indexedAddresses);

  await fs.writeFile("client/src/walletAddresses.json", serializedAddresses);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
