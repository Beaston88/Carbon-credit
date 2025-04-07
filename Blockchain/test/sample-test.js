const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Transactions", function () {
  let owner, addr1, addr2, transactionContract;

  beforeEach(async function () {
    // Get signers
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy contract
    const TransactionContract = await ethers.getContractFactory("Transactions"); // Replace with your actual contract name
    transactionContract = await TransactionContract.deploy();
    
    // Ensure deployment is completed
    await transactionContract.waitForDeployment();
  });

  it("Should add a transaction and retrieve it", async function () {
    // Ensure contract is deployed
    expect(transactionContract.target).to.not.be.undefined;
    expect(owner.address).to.not.be.undefined;

    // Add transaction
    const txn = await transactionContract.connect(addr1).addTransaction(
      addr2.address, 
      ethers.parseEther("1.0"), 
      "Test Transaction"
    );

    await txn.wait(); // Wait for transaction to be mined

    // Retrieve transactions
    const transactions = await transactionContract.getTransactions();
    
    expect(transactions.length).to.be.greaterThan(0);
    expect(transactions[0].to).to.equal(addr2.address);
    expect(transactions[0].amount.toString()).to.equal(ethers.parseEther("1.0").toString());
    expect(transactions[0].message).to.equal("Test Transaction");
  });
});
