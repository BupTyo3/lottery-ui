<template>
  <v-card>
    <v-card-text class="text-center">
      <h3 class="font-weight-medium">
        Touch the ball
      </h3>
      <p>Touch the ball for random selection</p>

      <p v-if="generatedCombination.length">
        {{ generatedCombination }}
      </p>
    </v-card-text>

    <v-card-actions class="d-flex justify-center">
      <v-btn
        outlined
        fab
        x-large
        @click="generateRandomCombination">
        5
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
/* eslint-disable no-loop-func */

export default {
  name: 'RandomNumber',

  data() {
    return {
      generatedCombination: [],
    };
  },

  methods: {
    generateRandom() {
      const max = 49;
      const randTicket = [];
      for (let i = 1; i <= 5; i++) {
        let randNumber = Math.floor(Math.random() * max + 1);
        while (randTicket.some((item) => item === randNumber)) {
          randNumber = Math.floor(Math.random() * max + 1);
        }
        randTicket.push(randNumber);
      }
      return randTicket;
    },
    generateRandomCombination() {
      this.generatedCombination = this.generateRandom();
      this.$emit('goNext', this.generatedCombination);
    },
  },
};
</script>
