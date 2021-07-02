<template>
  <v-card
    v-if="activeBalances"
    outlined
    class="center">
    <v-card-title class="d-flex justify-space-between">
      <div>
        <span>Round #{{ $route.params.id }}</span>
      </div>
      <div><span>ACTIVE</span></div>
    </v-card-title>

    <v-card-text class="text-center">
      <div><span>{{ $route.params.id }}st round at the Jackpot:</span></div>
      <div><span>{{ formatWeiToEth(activeBalances[0][2]) }} ETH</span></div>
    </v-card-text>

    <v-card-text class="d-flex flex-column justify-center">
      <div class="d-flex justify-space-between align-center mb-2">
        <div
          class="d-flex justify-space-between align-center"
          style="width: 70%">
          <div><span>Jackpot prize pool:</span></div>
          <div><span>See on MATIC scan {{ activeBalances[0][1] }}</span></div>
        </div>
        <div
          class="text-weight-medium"
          style="font-size: 1rem;">
          <span>{{ formatWeiToEth(activeBalances[0][2]) }} ETH</span>
        </div>
      </div>
      <div class="d-flex justify-space-between align-center mb-2">
        <div
          class="d-flex justify-space-between align-center"
          style="width: 70%">
          <div><span>Category 2 Wallet:</span></div>
          <div><span>See on MATIC scan {{ activeBalances[1][1] }}</span></div>
        </div>
        <div
          class="text-weight-medium"
          style="font-size: 1rem;">
          <span>{{ formatWeiToEth(activeBalances[1][2]) }} ETH</span>
        </div>
      </div>
      <div class="d-flex justify-space-between align-center mb-2">
        <div
          class="d-flex justify-space-between align-center"
          style="width: 70%">
          <div><span>Category 3 Wallet:</span></div>
          <div><span>See on MATIC scan {{ activeBalances[2][1] }}</span></div>
        </div>
        <div
          class="text-weight-medium"
          style="font-size: 1rem;">
          <span>{{ formatWeiToEth(activeBalances[2][2]) }} ETH</span>
        </div>
      </div>
      <div class="d-flex justify-space-between align-center mb-2">
        <div
          class="d-flex justify-space-between align-center"
          style="width: 70%">
          <div><span>Category 4 Wallet:</span></div>
          <div><span>See on MATIC scan {{ activeBalances[3][1] }}</span></div>
        </div>
        <div
          class="text-weight-medium"
          style="font-size: 1rem;">
          <span>{{ formatWeiToEth(activeBalances[3][2]) }} ETH</span>
        </div>
      </div>
      <div class="d-flex justify-space-between align-center mb-2">
        <div
          class="d-flex justify-space-between align-center"
          style="width: 70%">
          <div><span>Booster Wallet:</span></div>
          <div><span>See on MATIC scan {{ activeBalances[4][1] }}</span></div>
        </div>
        <div
          class="text-weight-medium"
          style="font-size: 1rem;">
          <span>{{ formatWeiToEth(activeBalances[4][2]) }} ETH</span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import prizePool from "../../../contracts/prizePoolInstance";
import web3 from "../../../contracts/web3";

export default {    
  name: 'IsolatedRound',

  data() {
    return {
      activeBalances: null,
    }
  },

  beforeCreate() {
    this.$emit('goCreate', true);
  },

  async created() {
    await this.getWalletBalance();
  },

  beforeDestroy() {
    this.$emit('goBack', false);
  },  

  methods: {
    async getWalletBalance() {
      await prizePool.methods.walletBalances().call().then((resp) => {
        console.log('walletBalances ', resp);
        if (resp) this.activeBalances = resp;
        return;
      });
    },
    formatWeiToEth(value) {
      if (!value) return '';
      return web3.utils.fromWei(value);
    },
  },
}
</script>

<style scoped>
.center {
    transform: translate(0, 50%);
}
</style>