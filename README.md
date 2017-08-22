Eth-YellowPage parser   智能合约黄页解析
=========================

Eth-YellowPage is a contract YellowPage in Ethereum.

智能合约黄页可以登记智能合约名称和对应的合约地址。

The current address is in [0x3b58331FFB2D246838185f8DF90eCF2956A4dce1](https://etherchain.org/account/0x3b58331FFB2D246838185f8DF90eCF2956A4dce1).

目前的智能合约黄页地址在[0x3b58331FFB2D246838185f8DF90eCF2956A4dce1](https://etherchain.org/account/0x3b58331FFB2D246838185f8DF90eCF2956A4dce1)。

The sol file is in [Github](https://github.com/lkiversonlk/eth-yellowpage/blob/master/contracts/YellowPage.sol)

sol文件在[Github](https://github.com/lkiversonlk/eth-yellowpage/blob/master/contracts/YellowPage.sol)。

Anyone could use this [ABI file](https://github.com/lkiversonlk/eth-yellowpage/blob/master/build/contracts/YellowPage.json) to call **SetPage()**, provding info below:

任何人都可以通过这个[ABI文件](https://github.com/lkiversonlk/eth-yellowpage/blob/master/build/contracts/YellowPage.json)来调用黄页的**SetPage()**接口写入你的智能合约信息，提供参数如下：

| Name(bytes32) | Contract Address(address) | url(bytes32) | 
|-|------|-|
| name of your contract  |  contract address | url to get info about the contract  |  
| 智能合约名称 | 合约地址 | 合约信息 url | 

it stores info by name, www.ethheyue.com which will display the infos in the contract.
#### Register your contract in the YellowPage
#### 在黄页上注册你的智能合约

1. if the name is not registered yet, you may register as you want, not charge.
如果该名称还未注册，你可以注册。
2. if the name is registered, but you are the one who registered it, you may alter it.
如果该名称已经注册，但是注册者就是你，你可以修改它。
3. if none of the above is True, then only the owner of the YellowPage could alter it, please contact city.of.beijing@gmail.com.
如果以上条件都不成立，请联系黄页拥有者 city.of.beijing@gmail.com。

#### Read contract in the YellowPage
#### 在黄页上读取智能合约信息

1. By Http or ajax get all the registered contracts   HTTP请求读取所有合约信息（支持ajax)

    * curl
    
          curl http://www.ethheyue.com/api/contracts

        ------------------------------------------
    
            {
                "yellowpage": {
                    "c_addr": "0x3b58331ffb2d246838185f8df90ecf2956a4dce1",
                    "owner": "0xc713ad7305ec2eb9d8d7654190ac359293a22968",
                    "url": "www.ethheyue.com",
                    "set": true
                }
            }
        
2. use eth-yellowpage npm to read from block chain
通过[eth-yellowpage npm](https://www.npmjs.com/search?q=eth-yellowpage)包从ethereum blockchain上读取

    **reading doesn't cost your eth 读取信息不需要花费eth**
    npm包详细信息和高级用法参见[npm包地址](https://www.npmjs.com/package/eth-yellowpage)
    
    * 安装
    
            npm install eth-yellowpage
            
    * 使用
    
            //首先连接到ethereum blockchain
            Web3 = require("web3");
            //如果rpc server运行在本地8545端口
            var web = new Web3(new Web3.providers.HttpProviders("http://localhost:8545"));
            
            YellowPage = require("eth-yellowpage").EthYellowPage;
            var yp = new YellowPage(web3);
            
            yp.TotalCount(); //当前注册的合约总数
            var name = yp.GetName(0);   //获取注册的第一个合约的名称
            if(name){
                var contract = yp.ReadByName(name);    //获取智能合约信息
            }
            
3. direct use web3.js to read
直接通过web3.js读取

    **not recommended 不建议新手直接这样用**
    * get the [abi file](https://github.com/lkiversonlk/eth-yellowpage/blob/master/build/contracts/YellowPage.json)
  获取智能合约黄页的[abi文件](https://github.com/lkiversonlk/eth-yellowpage/blob/master/build/contracts/YellowPage.json)
    * copy the contract address 0x3b58331FFB2D246838185f8DF90eCF2956A4dce1
拷贝当前黄页所在的地址 [0x3b58331FFB2D246838185f8DF90eCF2956A4dce1](https://etherchain.org/account/0x3b58331FFB2D246838185f8DF90eCF2956A4dce1)
    * coding example 代码示例
    
            //建立连接，同上述，跳过
            var abi = JSON.parse(fs.readFileSync("刚刚下载的abi文件路径"));
            //创建合约的代理
            var contract = web.eth.contract(abi);  
            //获取合约实例
            var instance = contract.at("0x3b58331FFB2D246838185f8DF90eCF2956A4dce1");
            
            //获取当前注册合约总数
            instance.NamesCount();
            
            //获取指定名称"yellowpage"的合约信息
            //这里获取的是hash后的值，
            instance.pages.call("yellowpage");
    
    
#### get specified contract's info by name 根据名称取合约信息

        var contractInfo = yellowPage.ReadByName("ab");
        if(contractInfo){
           ...
        }

#### get the total count of contract registered 获取注册合约总数

        console.log(yellowPage.TotalCount());

#### start refresh contract info one by one every X seconds

        yellowPage.StartCache(x); //x should be int
        
        /*
         * you should only read from the cache
         * don't try to modify it, will be overwritten
         * it will take x * CountOfContract seconds to load the full contract
         */
        var cache = yellowPage.GetCache();
         
#### get the name of the contract by index 获取指定序号合约的名称

        var name = yellowPage.GetName(0);
        if(name){
            console.log(name);
        }

#### please contact me city.of.beijing@gmail.com 邮件地址