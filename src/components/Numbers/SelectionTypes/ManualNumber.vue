<template>
  <v-card max-width="99%">
    <v-card-text>
      <h3>Select 5 Numbers</h3>
      <p>{{ combination }}</p>
      <v-btn-toggle
        v-model="combination"
        multiple
        dense
        class="d-flex flex-wrap justify-center">
        <v-btn
          v-for="n in 50"
          :key="n"
          outlined
          fab
          x-small
          dense
          class="mr-2"
          :value="n">
          {{ n }}
        </v-btn>
      </v-btn-toggle>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ManualNumber',

  data() {
    return {
      combination: [],
    };
  },

  watch: {
    combination: {
      handler(newVal) {
        if (newVal.length === 5) {
          this.$emit('goNext', this.combination);
        } else if (newVal.length > 5) {
          this.combination.shift();
          this.combination[this.combination.length - 1] = newVal.pop();
          this.$emit('goNext', this.combination);
        } else {
          this.$emit('disableNext');
        }
      },
      deep: true,
    },
  },
};
</script>
