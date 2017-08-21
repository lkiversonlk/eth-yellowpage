var config = require("./config.json");
var abi = require("./build/contracts/YellowPage.json").abi;

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

    this.Cache = {};
}


EthYellowPage.prototype.ReadByName = function (name) {
    var data = this.instance.pages.call(name);
    var ret = this.constructor(data);
    if(ret.set){
        return ret;
    } else {
        return null;
    }
};

EthYellowPage.prototype.TotalCount = function () {
    var data = this.instance.NamesCount();
    return parseInt(data.c[0]);
};

EthYellowPage.prototype.GetName = function (i) {
    var data = this.instance.names(i);
    var name = this.web.toUtf8(data);
    if(!name || name.length == 0) {
        return null
    } else {
        return name;
    }
};

EthYellowPage.prototype.Owner = function () {
    var data = this.instance.owner();
    return data;
};


/**
 * refresh the cache at the speed of one contract at interval seconds
 * @param interval
 * @constructor
 */
EthYellowPage.prototype.StartCache = function (interval) {
    var self = this;
    function _refersh() {
        var count = self.TotalCount()
    }

    function _loadSpecified(i, n){
        var name = self.GetName(i);
        if(name && name.length != 0){
            page = self.instance.pages.call(name)

        }
    }
};

exports.EthYellowPage = EthYellowPage;