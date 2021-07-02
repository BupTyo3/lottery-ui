import web3 from './web3'
const abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_onwer",
                "type": "address"
            },
            {
                "internalType": "contract PrizePool",
                "name": "_prizePool",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "getTickets",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "uint8[5]",
                        "name": "numbers",
                        "type": "uint8[5]"
                    },
                    {
                        "internalType": "bool",
                        "name": "isValid",
                        "type": "bool"
                    }
                ],
                "internalType": "struct Ticket.TicketObject[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "getTicketsByOwner",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "uint8[5]",
                        "name": "numbers",
                        "type": "uint8[5]"
                    },
                    {
                        "internalType": "bool",
                        "name": "isValid",
                        "type": "bool"
                    }
                ],
                "internalType": "struct Ticket.TicketObject[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getWinningNumbers",
        "outputs": [
            {
                "internalType": "uint8[5]",
                "name": "",
                "type": "uint8[5]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isOpened",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "closeRound",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "uint8[5]",
                        "name": "numbers",
                        "type": "uint8[5]"
                    },
                    {
                        "internalType": "bool",
                        "name": "isValid",
                        "type": "bool"
                    }
                ],
                "internalType": "struct Ticket.TicketObject",
                "name": "_ticket",
                "type": "tuple"
            }
        ],
        "name": "setTicket",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getWinners",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "uint8[5]",
                        "name": "numbers",
                        "type": "uint8[5]"
                    },
                    {
                        "internalType": "bool",
                        "name": "isValid",
                        "type": "bool"
                    }
                ],
                "internalType": "struct Ticket.TicketObject[][4]",
                "name": "",
                "type": "tuple[][4]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

export default address => {
    const instance = new web3.eth.Contract(abi, address);
    return instance;
};
