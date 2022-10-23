const { ethers } = require("ethers");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;
const rpcProvider = process.env.RPC_PROVIDER;

async function sendTransaction() {
  const provider = new ethers.providers.JsonRpcProvider(rpcProvider);
  const wallet = new ethers.Wallet(privateKey);
  const connectedWallet = wallet.connect(provider);

  const gasPrice = 20000000000;
  const nonce = await provider.getTransactionCount(wallet.address, "latest");
  const tx = {
    from: wallet.address,
    to: "0xaFF13BB2F69293eB19938d7C63245A05705e3099",
    value: ethers.utils.parseUnits("1", "ether"),
    gasPrice: gasPrice,
    gasLimit: ethers.utils.hexlify(6721975),
    nonce: nonce,
  };

  await connectedWallet.sendTransaction(tx);
}

sendTransaction()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
