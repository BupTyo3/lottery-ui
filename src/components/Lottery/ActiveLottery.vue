<template>
  <v-layout
    v-if="activeBalances"
    class="d-alex flex-column">
    <v-layout class="text-left mt-3 mb-3">
      <div>
        <span
          class="font-weight-medium">Lottery 5/50
          <span>ACTIVE</span></span>
      </div>
    </v-layout>

    <v-card
      v-if="getRound.id"
      outlined
      class="d-flex pa-2">
      <v-card-text class="font-weight-medium text-left">
        <div>
          <span>{{ getRound.id }}st round</span>
        </div>
        <div><span>Fund for the Jackpot</span></div>
        <div><span>{{ formatWeiToEth(activeBalances[0][2]) }} EHT</span></div>
      </v-card-text>
      <v-card-text class="font-weight-medium">
        <div><span>Round is Active</span></div>
        <v-card-actions>
          <v-btn
            width="100%"
            class="white--text"
            color="#6558f5"
            @click="showSelection">
            Play Now
          </v-btn>
        </v-card-actions>
        <div>
          <span @click="seeMore">
            <router-link
              style="cursor: pointer; color: #60a5e2;"
              :to="{
                name: 'isolatedRound',
                params: { id: getRound.id, hash: getRound.round },
              }">See more details</router-link>
          </span>
        </div>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import prizePool from "../../../contracts/prizePoolInstance";

export default {
  name: 'ActiveLottery',

  components: {},

  props: {
    round: {
      type: Object,
      required: true,
      default() {
        return {
          id: 0,
          round: '',
          status: '',
        };
      },
    },
  },

  data() {
    return {
      activeBalances: null,
    };
  },

  computed: {
    getRound() {
      return Object.keys(this.round).length ? this.round : {
        id: 0,
        round: '',
        status: '',
      };
    },
  },

  async created() {
    await this.getWalletBalance();
  },

  methods: {
    showSelection() {
      this.$emit('showSelection', {
        id: this.round.id,
        jackpot: +this.formatWeiToEth(this.activeBalances[0][2]),
      });
    },
    seeMore() {
      this.$emit('showDetails');
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
