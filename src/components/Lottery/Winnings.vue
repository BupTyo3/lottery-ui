<template>
  <v-card
    outlined
    class="d-flex pa-3">
    <v-card-text class="font-weight-medium text-left">
      <div><span>Your Lottery Winnings</span></div>
      <div><span>1.547.62</span></div>
      <div><span>USDT to collect</span></div>
    </v-card-text>
    <v-card-text class="font-weight-medium">
      <v-card-actions>
        <v-btn
          width="100%"
          class="white--text"
          color="#6558f5">
          Collect Winnings
        </v-btn>
      </v-card-actions>
      <div><span>You won prize category: 4</span></div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Winnings',
};
</script>
