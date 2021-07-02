<template>
  <v-card>
    <v-icon
      small
      class="d-flex justify-end ml-auto"
      style="cursor: pointer; border: 0; background-color: white;"
      @click="closeDialog">
      mdi-close
    </v-icon>

    <v-card
      v-if="selectionRandom || selectionManual"
      class="pa-3"
      outlined>
      <div class="d-flex justify-space-between">
        <div :class="[{ selected: selectionRandom }]">
          <span
            style="cursor: pointer;"
            @click="setRandomSelection">
            Random Number
          </span>
        </div>
        <div :class="[{ selected: selectionManual }]">
          <span
            style="cursor: pointer;"
            @click="setManualSelection">
            Manual Selection
          </span>
        </div>
      </div>

      <RandomNumber
        v-if="selectionRandom"
        @goNext="goNext" />
      <ManualNumber
        v-if="selectionManual"
        @goNext="goNext"
        @disableNext="disableNext" />

      <v-card-actions>
        <v-btn
          :disabled="disabledNext"
          width="100%"
          class="white--text"
          color="#6558f5"
          @click="pushNewCombination">
          Next
        </v-btn>
      </v-card-actions>
    </v-card>

    <BuyTickets
      v-if="!selectionRandom && !selectionManual"
      :id="id"
      :jackpot="jackpot"
      :combinations="combinations"

      @addNewManualCombination="setManualSelection"
      @addNewRandomCombination="setRandomSelection"
      @deleteCombination="deleteCombination"

      @boughtTickets="closeDialog"
      @closeOnReject="closeDialog" />
  </v-card>
</template>

<script>
import RandomNumber from './SelectionTypes/RandomNumber.vue';
import ManualNumber from './SelectionTypes/ManualNumber.vue';
import BuyTickets from '../BuyTickets.vue';

export default {
  name: 'NumberSelection',

  components: {
    RandomNumber,
    ManualNumber,
    BuyTickets,
  },

  props: {
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
      disabledNext: true,
      selectionRandom: true,
      selectionManual: false,

      combinations: [],
      currCombination: [],
    };
  },

  methods: {
    hideRandomSelection() {
      this.selectionRandom = false;
    },
    hideManualSelection() {
      this.selectionManual = false;
    },
    setRandomSelection() {
      this.hideManualSelection();
      this.selectionRandom = true;
    },
    setManualSelection() {
      this.hideRandomSelection();
      this.selectionManual = true;
    },
    pushNewCombination() {
      this.disabledNext = true;
      this.hideRandomSelection();
      this.hideManualSelection();
      this.combinations.push(this.currCombination);
    },
    goNext(newCombination) {
      this.disabledNext = false;
      this.currCombination = newCombination;
    },
    disableNext() {
      this.disabledNext = true;
      this.currCombination = [];
    },
    deleteCombination(combination) {
      const index = this.combinations.indexOf(combination);

      if (index !== -1) {
        this.combinations.splice(index, 1);
      }
    },
    closeDialog() {
      this.dialog = false;
      this.$emit('closeDialog');
    },
  },
};
</script>

<style scoped>
.selected {
  color: #6558f5;
  border-bottom: 2px solid #6558f5;
}
</style>
