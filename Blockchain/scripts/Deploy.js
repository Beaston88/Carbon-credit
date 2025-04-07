const hre = require("hardhat");

async function main() {
    const initialPrice = hre.ethers.parseEther("0.01"); // Set initial price for carbon credits

    const FixedCarbonCreditMarketplace = await hre.ethers.getContractFactory("FixedCarbonCreditMarketplace");
    const marketplace = await FixedCarbonCreditMarketplace.deploy(initialPrice);

    await marketplace.waitForDeployment();

    console.log("FixedCarbonCreditMarketplace deployed to:", await marketplace.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
