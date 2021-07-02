<template>
  <v-layout class="d-flex flex-column">
    <v-sheet class="d-flex flex-column mb-15">
      <h1 class="text-left font-weight-medium ml-15 mb-15">
        Lottery 5/50
      </h1>

      <div
        style="width: 15%;"
        class="d-flex justify-space-between mr-auto ml-auto">
        <v-btn @click="shuffle(0)">
          <v-icon>
            mdi-arrow-left
          </v-icon>
        </v-btn>
        <v-btn @click="shuffle(1)">
          <v-icon>
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </div>
    </v-sheet>

    <div
      v-if="!isString"
      class="d-flex align-center rounds">
      <component
        :is="selectStatusRound(round.status)"
        v-for="round of slicedRounds"
        :id="round.id"
        :key="round.id"
        :round="round"
        :show-round-by-id="showRoundById"
        :is-showed-id="isShowedId"
        class="item"
        @showedId="showedId"
        @showNumberSelection="showNumberSelection" />
    </div>
  </v-layout>
</template>

<script>
import ActiveRound from './RoundTypes/ActiveRound.vue';
import CompletedRound from './RoundTypes/CompletedRound.vue';
import NumberSelection from '../Numbers/NumberSelection.vue';

export default {
  name: 'CardRound',

  components: {
    ActiveRound,
    CompletedRound,
    NumberSelection,
  },

  props: {
    showRoundById: {
      type: Number,
      default: null,
    },
    rounds: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      startSlice: 0,
      endSlice: 0,
      isShowedId: false,
    };
  },

  computed: {
    slicedRounds() {
      return this.rounds.length ? this.rounds.slice(this.startSlice, this.endSlice) : [];
    },
    isString() {
      return typeof (this.rounds.length ? this.rounds[0] : null) === 'string';
    },
  },

  mounted() {
    this.startSlice = this.rounds.length - 2;
    this.endSlice = this.rounds.length;
  },

  methods: {
    shuffle(right) {
      if (right) {
        if (this.endSlice !== this.rounds.length) {
          this.startSlice = this.endSlice - 1;
          this.endSlice = this.startSlice + 2;
        }
      } else {
        if (this.startSlice !== 0) {
          this.endSlice = this.startSlice + 1;
          this.startSlice = this.endSlice - 2;
        }
      }
    },
    selectStatusRound(status) {
      let component = '';

      switch (status) {
        case 'active': {
          component = 'ActiveRound';
          break;
        }
        default: {
          component = 'CompletedRound';
        }
      }

      return component;
    },
    showNumberSelection(val) {
      this.$emit('showNumberSelection', val);
    },
    showedId() {
      this.isShowedId = true;
    },
  },
};
</script>

<style>
.item {
  min-width: 30%;
  width: 30%;
  margin-right: 3%;
}

.item:last-child {
  margin-right: 0;
}

.rounds {
  overflow: hidden;
  overflow-x: scroll;
  scroll-behavior: smooth;
  margin-left: 3%;
}

::-webkit-scrollbar {
  width: 0;
}
</style>
