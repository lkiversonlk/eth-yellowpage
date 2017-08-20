var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var YellowPage = require("./index").EthYellowPage;

console.log(web3.eth.accounts);


var yellowPage = new YellowPage(web3, "0x2f34b992bb2550567994ca5e0b6abc6c6d45cf0f");
console.log(yellowPage.ReadByName("ab"));
console.log(yellowPage.TotalCount());
console.log(yellowPage.GetName(0));
console.log("end");