const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");
const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpcLink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpcLink, data);
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0xf1CE540c58E7d45410eF8ACe9ae657ff871f052c";
  const [signer] = await hre.ethers.getSigners();

  const contractFactory = await hre.ethers.getContractFactory("SwisstronikNFT");
  const contract = contractFactory.attach(contractAddress);

  const functionName = "mint1NFT";
  const mint1NFTTx = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(functionName),
    0
  );

  await mint1NFTTx.wait();

  console.log("Transaction Receipt: ", mint1NFTTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});