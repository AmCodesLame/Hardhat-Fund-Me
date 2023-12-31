const { getNamedAccounts } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
const { assert } = require("chai");

//for testnets

developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", async function() {
      let fundMe;
      let deploy;
      const sendValue = ethers.utils.parseEther("0.01");
      beforeEach(async function() {
        deployer = (await getNamedAccounts()).deployer;
        fundMe = await ethers.getContract("FundMe", deploy);
      });

      it("allows people to fund and withdraw", async function() {
        await fundMe.fund({ value: sendValue });
        await fundMe.withdraw();
        const endingBalance = await fundMe.provider.getBalance(fundMe.address);
        assert.equal(endingBalance.toString(), "0");
      });
    });
