import web3 from './web3'
const address = '0x37186c8Df87b1Ec9C550A9c7072Af64E946e3d97' // THE CONTRACT ADDRESS
const abi = [
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_owner",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "balance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    },
    {
        "inputs": [],
        "name": "topUp",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "_recipients",
                "type": "address[]"
            }
        ],
        "name": "pay",
        "outputs": [],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract JackpotWallet",
                "name": "_jackpot",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "topUpJackpot",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const instance = new web3.eth.Contract(abi, address)

export default instance
