<template>
  <div class="container">
    <div class="b-row">
      <div>
        <h1>
          Lottery
          <v-btn
            class="ma-1"
            small
            outlined
            @click="setPrizePool()">
            SET PLATFORM
          </v-btn>
          <v-btn
            class="ma-1"
            small
            outlined
            @click="setLottery()">
            SET PRIZE POOL
          </v-btn>
          <v-btn
            class="ma-1"
            small
            outlined
            @click="sendGas()">
            Send GAS
          </v-btn>
          <v-btn
            class="ma-1"
            small
            outlined
            @click="sendBooster()">
            Send Booster
          </v-btn>
        </h1>
        <div>
          Current address: {{ getSelectedAddress() + ' | balance: ' + selectedBalance }}
        </div>
        <hr>
        <div v-if="balances">
          <h2>
            Platform Wallet:
            <v-btn
              class="ma-2"
              small
              outlined
              @click="updateWallet">
              Update
            </v-btn>
          </h2>
          <div>
            <div>
              {{ 'Address: ' + platformOwner + ' | balance: ' + platformBalance }}
            </div>
          </div>
          <hr>
          <div>
            Jackpot Wallet Balance:
            {{ balances[0][1] + ' - ' + formatWeiToEth(balances[0][2]) }} ETH
          </div>
          <div>
            Category 2 Wallet Balance:
            {{ balances[1][1] + ' - ' + formatWeiToEth(balances[1][2]) }} ETH
          </div>
          <div>
            Category 3 Wallet Balance:
            {{ balances[2][1] + ' - ' + formatWeiToEth(balances[2][2]) }} ETH
          </div>
          <div>
            Category 4 Wallet Balance:
            {{ balances[3][1] + ' - ' + formatWeiToEth(balances[3][2]) }} ETH
          </div>
          <br>
          <div>
            Booster Wallet Balance:
            {{ balances[4][1] + ' - ' + formatWeiToEth(balances[4][2]) }} ETH
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="b-row">
      <div>
        <v-btn
          class="ma-3"
          outlined
          @click="getConsole()">
          CONSOLE
        </v-btn>
        <v-btn
          class="ma-3"
          outlined
          @click="startNewGame()">
          START NEW ROUND
        </v-btn>
        <v-btn
          class="ma-3"
          outlined
          @click="getMyTickets()">
          My tickets
        </v-btn>
      </div>
      <div
        v-for="(ticket, index) of myTickets"
        :key="index"
        class="text-left justify-center mr-auto ml-auto"
        style="max-width: 350px">
        <span>{{ index + 1 + '. ' }}</span>
        {{ ticket[1] }}
      </div>
    </div>
    <div>
      <hr>
      <h2>
        All rounds
        <v-btn
          class="ma-3"
          outlined
          @click="getAllRound()">
          Get ALL round
        </v-btn>
      </h2>
      <div
        class="b-row text-left justify-center mr-auto ml-auto"
        style="max-width: 430px">
        <div
          v-for="(item, index) of allRounds"
          :key="item"
          style="cursor: pointer;">
          <div
            @click="getWinner(item)">
            {{ +index + 1 }} : {{ item }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <hr>
      <h2>
        Round Info
      </h2>
      <span>Winner combination {{ selectedWinnerNumbers }}</span>
      <hr>
      <div class="b-row">
        <div
          v-for="(item, index) of selectedRoundInfo"
          :key="index">
          <span>{{ getNameCategory(index + 1) }}</span>
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import prizePool from '../../contracts/prizePoolInstance';
import lottery from '../../contracts/lotteryInstance';
import round from '../../contracts/RoundInstance';
import BoosterWallet from '../../contracts/Wallet';
import web3 from '../../contracts/web3';

export default {
  name: 'Admin',

  components: {},

  data() {
    return {
      boosterWalletBalance: 0,
      gameWalletBalance: 0,
      balances: null,
      platformOwner: '',
      platformBalance: 0,
      selectedBalance: 0,
      allRounds: [],
      myTickets: [],
      selectedRoundInfo: [],
      selectedWinnerNumbers: [],
    };
  },
  beforeMount() {
    // get auctionBox method: returnAllAuctions()
    this.updateWallet();
  },
  methods: {
    setPrizePool() {
      console.log('setPrizePool ', prizePool);
      prizePool.methods.setPlatform(window.ethereum.selectedAddress).send({ from: window.ethereum.selectedAddress }).on('receipt', (resp) => {
        console.log('setPrizePool ', resp);
      });
    },
    sendGas() {
      lottery.methods.topUpContract().send({ from: window.ethereum.selectedAddress, value: web3.utils.toWei('1000', 'ether') }).on('receipt', (resp) => {
        console.log('topUpContract ', resp);
      });
    },
    sendBooster() {
      const boosterWallet = BoosterWallet(this.balances[4][1]);
      boosterWallet.methods.topUp().send({ from: window.ethereum.selectedAddress, value: web3.utils.toWei('10000', 'ether') }).on('receipt', (resp) => {
        console.log('topUpContract ', resp);
      });
    },
    setLottery() {
      console.log('prizePool.address ', prizePool.address);
      console.log('lottery ', lottery);
      lottery.methods.setPrizePool(prizePool._address).send({ from: window.ethereum.selectedAddress }).on('receipt', (resp) => {
        console.log('setPlatform ', resp);
      });
    },
    getConsole() {
      console.log('PrizePool ', prizePool);
      console.log('Lottery ', lottery);
    },
    getWalletBalance() {
      prizePool.methods.walletBalances().call().then((resp) => {
        console.log('walletBalances ', resp);
        if (resp) this.balances = resp;
      });
    },
    getPlatformOwner() {
      prizePool.methods.getPlatformOwner().call().then((resp) => {
        if (resp) this.platformOwner = resp;
      });
    },
    startNewGame() {
      lottery.methods.startGame().send({ from: window.ethereum.selectedAddress }).on('receipt', (resp) => {
        console.log('startGame ', resp);
      });
    },
    getMyTickets() {
      lottery.methods.getCurrentRoundAddress().call().then((resp) => {
        const roundInstance = round(resp);
        roundInstance.methods.getTicketsByOwner(window.ethereum.selectedAddress)
          .call().then((resp2) => {
            console.log('tickets ', resp2);
            this.myTickets = resp2;
          });
      });
    },
    getAllRound() {
      lottery.methods.getAllRoundAddress().call().then((resp) => {
        console.log('getAllRoundAddress', resp);
        this.allRounds = resp;
      });
    },
    updateWallet() {
      this.getWalletBalance();
      this.getPlatformOwner();
      this.getBalance();
      this.getCustomBalance();
    },
    formatWeiToEth(value) {
      if (!value) return '';
      return web3.utils.fromWei(value);
    },
    getBalance() {
      if (!this.platformOwner) return '';
      web3.eth.getBalance(this.platformOwner).then((resp) => {
        this.platformBalance = this.formatWeiToEth(resp);
      });
    },
    getCustomBalance() {
      if (!window.ethereum.selectedAddress) return 0;
      web3.eth.getBalance(window.ethereum.selectedAddress).then((resp) => {
        this.selectedBalance = this.formatWeiToEth(resp);
      });
    },
    getSelectedAddress() {
      return window.ethereum.selectedAddress;
    },
    getWinner(address) {
      const roundInstance = round(address);
      roundInstance.methods.getWinners().call().then((resp) => {
        console.log('winners: ', resp);
        this.selectedRoundInfo = resp;
      });
      roundInstance.methods.getWinningNumbers().call().then((resp1) => {
        console.log('winners numbers: ', resp1);
        this.selectedWinnerNumbers = resp1;
      });
    },
    getNameCategory(index) {
      switch (index) {
        case 1:
          return 'Jackpot';
        case 2:
          return 'Category 2';
        case 3:
          return 'Category 3';
        case 4:
          return 'Category 4';
        default:
          return '';
      }
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

button {
  background-color: #008cba;
  color: white;
}

button:hover {
  background-color: white; /* Green */
  color: #008cba;
  border: #008cba 3px solid;
}

img {
  width: 32px;
}

#isBid, #isFin {
  height: 32px;
  margin-top: 16px;
  margin-left: 8px;
}

.rounds {
  overflow: hidden;
  overflow-x: scroll;
}
</style>
