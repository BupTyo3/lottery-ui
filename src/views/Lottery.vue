<template>
  <div>
    <v-responsive
      v-if="!showDetails"
      class="d-flex mr-auto ml-auto"
      max-width="1000">
      <v-sheet class="text-left">
        <h1 class="font-weight-medium mb-3">
          Lottery
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
          consequatur alias delectus numquam odio debitis voluptas quidem, magni
          soluta, beatae distinctio non natus pariatur ab nulla? In laudantium
          quo facilis. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Autem consequatur alias delectus numquam odio debitis voluptas quidem,
          magni soluta, beatae distinctio non natus pariatur ab nulla? In
          laudantium quo facilis.
        </p>
      </v-sheet>

      <ActiveLottery
        v-if="lastRound"
        :round="lastRound"
        @showSelection="showSelection"
        @seeMore="seeMore" />

      <div class="d-flex justify-space-between mt-7">
        <CompletedRound
          v-if="preLastRound"
          :key="reRenderComponent"
          :round="preLastRound"
          :is-pre-last="true" />
      </div>
    </v-responsive>

    <v-sheet
      v-if="!rounds.length">
      <p>No one round have not started yet</p>
    </v-sheet>

    <router-view
      :rounds="rounds"
      @goBack="back"
      @goCreate="create"
      @showNumberSelection="showSelection" />

    <v-dialog
      v-model="showNumberSelection"
      persistent
      content-class="v-dialog--custom">
      <NumberSelection
        v-if="showNumberSelection"
        :id="buyObj.id"
        :jackpot="buyObj.jackpot"
        @closeDialog="closeDialog" />
    </v-dialog>
  </div>
</template>

<script>
import lottery from '../../contracts/lotteryInstance';

import NumberSelection from '../components/Numbers/NumberSelection.vue';
import CompletedRound from '../components/Rounds/RoundTypes/CompletedRound.vue';
import ActiveLottery from '@/components/Lottery/ActiveLottery.vue';

export default {
  name: 'Lottery',

  components: {
    NumberSelection,
    CompletedRound,
    ActiveLottery,
  },

  data() {
    return {
      showDetails: false,
      showNumberSelection: false,

      buyObj: {
        id: 0,
        jackpot: 0,
      },

      reRenderComponent: false,

      rounds: [],
      preLastRound: {},
      lastRound: {},
    };
  },

  beforeMount() {
    this.getAllRound();
  },

  methods: {
    closeDialog() {
      this.showNumberSelection = false;
    },
    showSelection(val) {
      this.buyObj.id = val.id;
      this.buyObj.jackpot = val.jackpot;
      this.showNumberSelection = true;
    },
    create(val) {
      this.showDetails = val;
    },
    back(val) {
      this.showDetails = val;
    },
    seeMore() {
      this.showDetails = true;
    },
    setActive() {
      this.rounds = this.rounds.map((round, index) => ({
        id: +index + 1,
        status: 'completed',
        round,
      }));

      // The Last Round is always active
      this.rounds[this.rounds.length - 1].status = 'active';
    },
    getAllRound() {
      lottery.methods
        .getAllRoundAddress()
        .call()
        .then((resp) => {
          console.log('getAllRoundAddress', resp);
          this.rounds = resp;
        })
        .then(() => {
          // Modify rounds
          if (this.rounds.length) {
            this.setActive();
            this.getLastRound();
            this.getPreLastRound();
          }
        }).then(() => {
          this.reRenderComponent = !this.reRenderComponent;
        });
    },
    getLastRound() {
      this.lastRound = this.rounds[this.rounds.length - 1];
    },
    getPreLastRound() {
      this.preLastRound = this.rounds[this.rounds.length - 2] || {};
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

#isBid,
#isFin {
  height: 32px;
  margin-top: 16px;
  margin-left: 8px;
}
</style>
