var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8546"));
var YellowPage = require("./index").EthYellowPage;

console.log(web3.eth.accounts);


var yellowPage = new YellowPage(web3);
console.log(yellowPage.ReadByName("ab"));
console.log(yellowPage.TotalCount());
console.log(yellowPage.GetName(0));
console.log(yellowPage.Owner());
console.log("end");