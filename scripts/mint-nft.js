require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
// const contractAddress = "0x53fAe820cB71C4F522d8C2D09847432E9DfA2D2E"
const contractAddress = "0x60A3eAb6EFB76BD1E2477CD989137b8abFEA2dEB"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

//   //the transaction
//   const tx = {
//     from: PUBLIC_KEY,
//     to: contractAddress,
//     nonce: nonce,
//     gas: 500000,
//     data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
//   }

//   const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
//   signPromise
//     .then((signedTx) => {
//       web3.eth.sendSignedTransaction(
//         signedTx.rawTransaction,
//         function (err, hash) {
//           if (!err) {
//             console.log(
//               "The hash of your transaction is: ",
//               hash,
//               "\nCheck Alchemy's Mempool to view the status of your transaction!"
//             )
//           } else {
//             console.log(
//               "Something went wrong when submitting your transaction:",
//               err
//             )
//           }
//         }
//       )
//     })
//     .catch((err) => {
//       console.log("Promise failed:", err)
//     })
// }
  //the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 2999999987,
    'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
  console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}
mintNFT(
  "ipfs://QmQ2Hpb3f3XVJqUZwxJFh1J5Qv4hAJ5uyHEevgP4tgiUkA"
)