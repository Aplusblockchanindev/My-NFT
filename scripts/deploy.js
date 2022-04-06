const { ethers } = require("hardhat");

async function main(){
    const MyNFT = await ethers.getContractFactory("MyNFT");
    const myNFT = await MyNFT.deploy();
    await myNFT.deployed();
    console.log("Contract deployed to address: ",myNFT.address);
    console.log("Contract owner address: ",)

}

main()
.then(()=>process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
});

//Contract deployed to address:  0x53fAe820cB71C4F522d8C2D09847432E9DfA2D2E