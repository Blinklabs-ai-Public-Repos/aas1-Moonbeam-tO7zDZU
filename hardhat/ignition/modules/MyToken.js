const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { default: BigNumber } = require("bignumber.js");

module.exports = buildModule("MyTokenModule", (m) => {
  const name = m.getParameter("name", process.env.NAME);
  const symbol = m.getParameter("symbol", process.env.SYMBOL);
  const supply = m.getParameter(
    "supply",
    BigNumber(process.env.SUPPLY).times(BigNumber(10).pow(18)).toString(10)
  );

  const myToken = m.contract("MyToken", [name, symbol, supply]);
  return { myToken };
});
