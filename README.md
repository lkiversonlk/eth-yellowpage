Eth-YellowPage parser
=========================

Eth-YellowPage is a contract YellowPage in Ethereum.

The current address is in [0x203706ade0fea007a21b46441449fe4104dccdeb](https://etherchain.org/account/0x203706ade0fea007a21b46441449fe4104dccdeb)
The sol file is in [Github](https://github.com/lkiversonlk/eth-yellowpage/blob/master/contracts/YellowPage.sol)

Anyone could use this [ABI file](https://github.com/lkiversonlk/eth-yellowpage/blob/master/build/contracts/YellowPage.json) to call **SetPage()**, provding info below:

| Name(bytes32) | Contract Address(address) | url(bytes32) | abi_url(bytes32) |
|-|------|-|-|
| name of your contract  |  contract address | url to get info about the contract  | abi file url | 

it stores info by name, I personally have a website www.ethheyue.com which will display the infos in the contract.

You may use this npm package to read from the contract.

#### Register your contract in the YellowPage

1. if the name is not registered yet, you may register as you want, not charge.
2. if the name is registered, but you are the one who registered it, you may alter it.
3. if none of the above is True, then only the owner of the YellowPage could alter it.

#### Installation
       npm install eth-yellowpage
#### initial
1. Connect to the ethereum using web3.js
2. Init the YellowPage with the web3 instance
                
        var yellowPage = new YellowPage(web3);
that's all!
#### get specified contract's info by name

        console.log(yellowPage.ReadByName("ab"));

#### get the total count of contract registered

        console.log(yellowPage.TotalCount());

#### get the name of the contract by index

        console.log(yellowPage.GetName(0));



