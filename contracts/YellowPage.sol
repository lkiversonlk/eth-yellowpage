pragma solidity ^0.4.1;

contract YellowPage {
    struct Page {
        address c_addr;
        address owner;
        bytes32 url;
        bool    set;
    }

    mapping(bytes32 => Page) public pages;
    bytes32[] public names;
    address public owner;

    function YellowPage(){
        owner = msg.sender;
    }

    function TransferTo(address newOwner){
        require(msg.sender == owner);
        owner = newOwner;
    }

    function SetPage(bytes32 name, address c_addr, bytes32 url) {
        if(pages[name].set){
            require(msg.sender == owner || msg.sender == pages[name].owner);
        } else {
            names.push(name);
        }
        pages[name].set = true;
        pages[name].c_addr = c_addr;
        pages[name].owner = msg.sender;
        pages[name].url = url;
    }

    function NamesCount() public constant returns(uint count) {
        return names.length;
    }

    function End() {
        require(msg.sender == owner);
        suicide(owner);
    }
}