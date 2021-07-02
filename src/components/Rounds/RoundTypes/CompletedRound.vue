<template>
  <v-card
    v-if="getRound"
    outlined
    width="45%">
    <v-card-title> Round #{{ getRound.id }} </v-card-title>

    <v-card-text>
      <div><span>Winning numbers:</span></div>
      <div>
        <span>{{ jackpotNumbers }}</span>
      </div>
      <div><span>Jackpot won: 543,434.65 USDT</span></div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        v-if="!isPreLast"
        width="100%"
        class="white--text"
        color="#6558f5"
        @click="viewMore">
        {{ textView }}
      </v-btn>
      <router-link
        v-if="isPreLast && !showDetails"
        style="width: 100%"
        :to="{
          name: 'details',
          params: { id: round.id },
        }">
        <v-btn
          width="100%"
          class="white--text"
          color="#6558f5">
          View more statistics
        </v-btn>
      </router-link>
    </v-card-actions>

    <v-data-table
      v-if="showDetails"
      :headers="dataTable.headers"
      :items="dataTable.desserts"
      disable-sort
      hide-default-footer
      dense
      class="evalation-1" />
  </v-card>
</template>

<script>
import roundIns from '../../../../contracts/RoundInstance';

export default {
  name: 'CompletedRound',

  props: {
    isShowedId: {
      type: Boolean,
      default: false,
    },
    showRoundById: {
      type: Number,
      default: null,
    },
    round: {
      type: Object,
      required: true,
    },
    isPreLast: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      winners: [],
      jackpotNumbers: [],

      showDetails: false,
      textView: 'View more Details',

      dataTable: {
        headers: [
          {
            text: 'Category',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          {
            text: 'Winners',
            value: 'winners',
          },
          {
            text: 'Amount (USDT)',
            value: 'amount',
          },
        ],
      },

      reRender: false,
    };
  },

  computed: {
    getRound() {
      if (Object.keys(this.round).length) {
        return this.round;
      }
      return null;
    },
  },

  mounted() {
    console.log(this.showRoundById)
    if (Object.keys(this.round).length && typeof this.round !== 'string') {
      this.selectedRoundInfo();
      this.selectedWinnerNumbers();
    }
  },

  methods: {
    setTable() {
      console.log(this.winners);
      this.dataTable.desserts = [
        {
          name: '5',
          winners: this.winners[0].length,
          amount: '543,234.76',
        },
        {
          name: '4',
          winners: this.winners[1].length,
          amount: '1,234.76',
        },
        {
          name: '3',
          winners: this.winners[2].length,
          amount: '34.76',
        },
        {
          name: '2',
          winners: this.winners[3].length,
          amount: '4.76',
        },
      ];
    },
    viewMore() {
      this.showDetails = !this.showDetails;

      if (this.showDetails) {
        this.textView = 'Close more Details';
      } else {
        this.textView = 'View more Details';
      }
    },
    selectedRoundInfo() {
      const roundInstance = roundIns(this.round.round);

      roundInstance.methods
        .getWinners()
        .call()
        .then((resp) => {
          console.log('winners: ', resp);
          this.winners = resp;
          this.setTable();
        }).then(() => {
          if (this.showRoundById === this.round.id && !this.isShowedId) {
            this.viewMore();
            this.$emit('showedId');
          }
        });
    },
    selectedWinnerNumbers() {
      const roundInstance = roundIns(this.round.round);

      roundInstance.methods
        .getWinningNumbers()
        .call()
        .then((resp) => {
          console.log('1 winners numbers: ', resp);
          this.jackpotNumbers = resp;
        });
    },
  },
};
</script>
