<template>
  <v-card
    outlined
    class="text-left"
    width="45%">
    <v-card-title class="font-weight-medium">
      Your Balances
    </v-card-title>
    <v-card-subtitle>
      <v-icon small>
        mdi-plus
      </v-icon>
    </v-card-subtitle>
    <v-card-text>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Main Account (USDT)
            </v-list-item-title>
            <span>122.00</span>
            <v-list-item-subtitle>
              = $122.11
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Main Account (USDT)
            </v-list-item-title>
            <span>122.00</span>
            <v-list-item-subtitle>
              = $122.11
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>

    <v-card-actions class="d-flex justify-space-between mr-5 ml-5 mb-3">
      <v-btn
        class="white--text"
        color="#6558f5">
        Deposit
      </v-btn>
      <v-btn
        class="white--text"
        color="#6558f5">
        Withdraw
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'MainBalances',
};
</script>
