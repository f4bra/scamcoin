const { ethers } = require("hardhat");

async function main(){
    const [deployer, viniciusJR] = await ethers.getSigners();

    // Get Deployer Account
    console.log("\n== Get Deployer Account ==");
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account ETH balance:", (await deployer.getBalance()).toString());

    // Deploy Coin
    console.log("\n== Deploy Coin ==");
    const ScamCoin = await ethers.getContractFactory("ScamCoin");
    const scamCoin = await ScamCoin.deploy();
    const receipt = await scamCoin.deployTransaction.wait();
    console.log("Gas used to deploy", receipt.gasUsed.toNumber());
    console.log("ScamCoin address:", scamCoin.address);

    // Verify Coin Info
    console.log("\n== Verify Coin Info ==");
    const symbol = await scamCoin.symbol();
    console.log("Scamcoin Symbol", symbol);
    const ownerBalance =  await scamCoin.balanceOf(deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    console.log("Deployer account balance of SCM:", ownerBalance.toString());

    // Transfer 10 Tokens to viniciusJR
    // npm install --save-dev @nomiclabs/hardhat-ethers ethers @nomiblabs/hardhat-wafle ethereum-waffle
    console.log("\n== Transfer 10 Tokens to ViniciusJR ==");
    console.log("ViniciusJR balance of SCM", (await scamCoin.balanceOf(viniciusJR.address)));
    console.log("Transfering 10 SCM to Vini...");
    await scamCoin.transfer(viniciusJR.address, ethers.utils.parseUnits("10",18));
    console.log("Deployer Balance of SCM", (await scamCoin.balanceOf(deployer.address)));
    console.log("VinciusJR Balance of SCM", (await scamCoin.balanceOf(viniciusJR.address)));

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });