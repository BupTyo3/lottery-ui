<template>
  <v-card
    v-if="activeBalances"
    outlined
    width="45%">
    <v-card-title class="d-flex justify-space-between">
      <div>
        <span>Round #{{ round.id }}</span>
      </div>
      <div><span>ACTIVE</span></div>
    </v-card-title>

    <v-card-text class="text-center">
      <div><span>{{ round.id }}st round at the Jackpot:</span></div>
      <div><span>{{ formatWeiToEth(activeBalances[0][2]) }} ETH</span></div>
      <div>
        <span
          style="cursor: pointer; color: #60a5e2;"
          @click="openDetails">See more details</span>
      </div>
    </v-card-text>

    <v-card-actions v-if="!showDetails">
      <v-btn
        width="100%"
        class="white--text"
        color="#6558f5"
        @click="showNumberSelection">
        Choose Numbers
      </v-btn>
    </v-card-actions>
    <v-card-text v-else>
      <div class="d-flex flex-column align-center mb-2">
        <div class="d-flex flex-column align-center">
          <div><span>Jackpot prize pool:</span></div>
          <div><span>See on MATIC scan {{ activeBalances[0][1] }}</span></div>
        </div>
        <div
          class="text-weight-medium"
          style="font-size: 1rem;">
          <span>{{ formatWeiToEth(activeBalances[0][2]) }} ETH</span>
        </div>
      </div>
      <div class="d-flex flex-column align-center mb-2">
        <div class="d-flex flex-column align-center">
          <div><span>Category 2 Wallet:</span></div>
          <div><span>See on MATIC scan {{ activeBalances[1][1] }}</span></div>
        </div>
        <div
          class="text-weight-medium"
          style="font-size: 1rem;">
          <span>{{ formatWeiToEth(activeBalances[1][2]) }} ETH</span>
        </div>
      </div>
      <div class="d-flex flex-column align-center mb-2">
        <div class="d-flex flex-column align-center">
          <div><span>Category 3 Wallet:</span></div>
          <div><span>See on MATIC scan {{ activeBalances[2][1] }}</span></div>
        </div>
        <div
          class="text-weight-medium"
          style="font-size: 1rem;">
          <span>{{ formatWeiToEth(activeBalances[2][2]) }} ETH</span>
        </div>
      </div>
      <div class="d-flex flex-column align-center mb-2">
        <div class="d-flex flex-column align-center">
          <div><span>Category 4 Wallet:</span></div>
          <div><span>See on MATIC scan {{ activeBalances[3][1] }}</span></div>
        </div>
        <div
          class="text-weight-medium"
          style="font-size: 1rem;">
          <span>{{ formatWeiToEth(activeBalances[3][2]) }} ETH</span>
        </div>
      </div>
      <div class="d-flex flex-column align-center mb-2">
        <div class="d-flex flex-column align-center">
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
import prizePool from "../../../../contracts/prizePoolInstance";
import web3 from "../../../../contracts/web3";

export default {
  name: 'ActiveRound',

  props: {
    round: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      showDetails: false,
      activeBalances: null,
    };
  },

  async created() {
    await this.getWalletBalance();
  },

  methods: {
    openDetails() {
      this.showDetails = !this.showDetails;
    },
    showNumberSelection() {
      this.$emit('showNumberSelection', {
        id: this.round.id,
        jackpot: +this.formatWeiToEth(this.activeBalances[0][2]),
      });
    },
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
};
</script>
