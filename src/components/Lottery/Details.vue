<template>
  <CardRound
    :key="getRounds.length"
    :show-round-by-id="$route.params.id"
    :rounds="getRounds"
    @showNumberSelection="showNumberSelection" />
</template>

<script>
import CardRound from '../Rounds/CardRound.vue';

export default {
  name: 'Details',

  components: {
    CardRound,
  },

  props: {
    rounds: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {};
  },

  computed: {
    getRounds() {
      return this.$props.rounds;
    },
  },

  beforeCreate() {
    this.$emit('goCreate', true);
  },

  beforeDestroy() {
    this.$emit('goBack', false);
  },

  methods: {
    showNumberSelection(val) {
      this.$emit('showNumberSelection', val);
    },
  },
};
</script>
