var config = require("./config.json");
var abi = require("./build/contracts/YellowPage.json").abi;
var web3 = require("web3");

function make(web, abi) {
    //return constructor according to abi
    for(var i = 0; i < abi.length; i ++){
        if(abi[i].name == "pages"){
            var types = abi[i].outputs;
            return function (data) {
                var ret = {};
                for(var i = 0; i < data.length; i ++){
                    var t = types[i].type;
                    if(t == "bytes32"){
                        ret[types[i].name] = web.toUtf8(data[i]);
                    } else {
                        ret[types[i].name] = data[i];
                    }
                }
                return ret;
            }
        }
    }

    throw new Error("failed to find pages in abi");
}

function EthYellowPage(web, addr) {
    var contractAbi = web.eth.contract(abi);
    this.web = web;
    this.address = addr || config.address;
    this.instance = contractAbi.at(this.address);
    this.abi = abi;
    this.constructor = make(web, abi);
}


EthYellowPage.prototype.ReadByName = function (name) {
    var data = this.instance.pages.call(name);
    return this.constructor(data);
};

EthYellowPage.prototype.TotalCount = function () {
    var data = this.instance.NamesCount();
    return parseInt(data.c[0]);
};

EthYellowPage.prototype.GetName = function (i) {
    var data = this.instance.names(i);
    return this.web.toUtf8(data)
};

EthYellowPage.prototype.Owner = function () {
    var data = this.instance.owner();
    return data;
};

exports.EthYellowPage = EthYellowPage;