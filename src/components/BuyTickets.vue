<template>
  <v-card
    class="pa-3"
    outlined
    min-width="300px"
    width="300px">
    <div class="text-center">
      <div>
        <p class="font-weight-medium">
          Lottery 5/50
        </p>
        <p>{{ id }}st round fund at the Jackpot</p>
        <p>{{ jackpot }} USDT</p>
      </div>
    </div>

    <v-card-text class="text-left">
      <div><span>Combinations:</span></div>
      <div
        v-for="(combination, index1) in selectedCombinations"
        :key="index1">
        <v-btn
          v-for="(numberCombination, index2) of combination"
          :key="index2"
          outlined
          fab
          x-small
          class="mr-1"
          style="background-color: #b2acfa">
          {{ numberCombination }}
        </v-btn>
        <v-icon
          x-small
          class="ml-2"
          style="cursor: pointer; border: 0; background-color: white"
          @click="deleteCombination(combination)">
          mdi-close
        </v-icon>
      </div>
      <div class="d-flex align-center justify-center">
        <v-btn
          outlined
          fab
          x-small
          class="mt-3"
          @click="addNewRandomCombination">
          <v-icon
            x-small>
            mdi-plus
          </v-icon>
        </v-btn>
        <div class="mt-3 ml-1">
          <span>Add random combination</span>
        </div>
      </div>
    </v-card-text>

    <v-card-actions class="d-flex flex-column">
      <v-btn
        width="100%"
        class="white--text"
        color="#6558f5"
        @click="addNewManualCombination">
        Add new combination
      </v-btn>
      <v-btn
        width="100%"
        class="white--text ml-0 mt-3"
        color="#6558f5"
        @click="buyTicket">
        Buy ({{ cost }} USDT)
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import lottery from "../../contracts/lotteryInstance";
import round from '../../contracts/RoundInstance';
import web3 from "../../contracts/web3";

export default {
  name: "BuyTickets",

  props: {
    combinations: {
      type: Array,
      default() {
        return [];
      },
    },
    jackpot: {
      type: Number,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    }
  },

  data() {
    return {
      ticketCost: 0,
    }
  },

  computed: {
    ...mapState({
      selectedAddress: 'selectedAddress',
    }),
    selectedCombinations() {
      return this.combinations;
    },
    cost() {
      return Number(this.ticketCost).toFixed(2);
    },
  },

  mounted() {
    if (this.combinations.length) {
      this.ticketCost = this.combinations.length * 2;
    }
  },

  methods: {
    ...mapMutations(['setMyTickets']),
    addNewManualCombination() {
      this.$emit("addNewManualCombination");
    },
    addNewRandomCombination() {
      this.$emit("addNewRandomCombination");
    },
    deleteCombination(combination) {
      this.$emit("deleteCombination", combination);
    },
    buyTicket() {
      lottery.methods
        .buyTickets(this.combinations)
        .send({
          from: window.ethereum.selectedAddress,
          value: web3.utils.toWei(`${this.combinations.length * 2}`, "ether"),
        })
        .on("receipt", (resp) => {
          console.log("buyTickets ", resp);
          this.$emit("boughtTickets");
        }).then(() => {
          this.getTicketsByCurrAddress();
        }).catch(() => {
          this.$emit("closeOnReject");
        });
    },
    getTicketsByCurrAddress() {
      lottery.methods.getCurrentRoundAddress().call().then((resp) => {
        const roundInstance = round(resp);
        roundInstance.methods.getTicketsByOwner(this.selectedAddress)
          .call().then((resp2) => {
            console.log('tickets ', resp2);
            this.setMyTickets(resp2);
          });
      });
    },
  },
};
</script>
