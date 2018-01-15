const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, prevHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.calculateHash();
  }

  calculateHash(){
    return SHA256(this.index + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class BlockChain{
  constructor(){
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock(){
    return new Block(0, '01/01/2018', "Genesis Block", "0");
  }

  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock){
    newBlock.prevHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid(){
    for (let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];
      if(currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }
      if(currentBlock.prevHash !== prevBlock.hash){
        return false;
      }
    }
    return true;
  }
}

let aswinCoin = new BlockChain();
aswinCoin.addBlock(new Block(1, '04/01/2018', {amount: 100}));
aswinCoin.addBlock(new Block(2, '15/01/2018', {amount: 350}));

console.log('Is chain valid? ', aswinCoin.isChainValid());
console.log(aswinCoin);