<template>
  <v-responsive
    class="d-flex mr-auto ml-auto"
    max-width="1000">
    <v-sheet>
      <h1 class="font-weight-medium">
        XLotto
      </h1>
      <p class="text-justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
        consequatur alias delectus numquam odio debitis voluptas quidem, magni
        soluta, beatae distinctio non natus pariatur ab nulla? In laudantium quo
        facilis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
        consequatur alias delectus numquam odio debitis voluptas quidem, magni
        soluta, beatae distinctio non natus pariatur ab nulla? In laudantium quo
        facilis.
      </p>
    </v-sheet>
    <div class="d-flex justify-space-between mb-7">
      <v-card
        outlined
        class="text-left"
        width="45%">
        <v-card-title class="font-weight-medium">
          Your Balance
        </v-card-title>
        <v-card-subtitle>
          <div>{{ getSelectedAddress }}</div>
        </v-card-subtitle>
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  Main Account (ETH)
                </v-list-item-title>
                <span>{{ getSelectedAddressBalance }}</span>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
      <MyTickets />
      <!--      <v-card-->
      <!--        outlined-->
      <!--        class="text-left"-->
      <!--        width="45%">-->
      <!--        <v-card-title class="font-weight-medium">-->
      <!--          Your Balances-->
      <!--        </v-card-title>-->
      <!--        <v-card-subtitle>-->
      <!--          <v-icon small>-->
      <!--            mdi-plus-->
      <!--          </v-icon>-->
      <!--        </v-card-subtitle>-->
      <!--        <v-card-text>-->
      <!--          <v-list>-->
      <!--            <v-list-item>-->
      <!--              <v-list-item-content>-->
      <!--                <v-list-item-title>-->
      <!--                  Main Account (USDT)-->
      <!--                </v-list-item-title>-->
      <!--                <span>122.00</span>-->
      <!--                <v-list-item-subtitle>-->
      <!--                  = $122.11-->
      <!--                </v-list-item-subtitle>-->
      <!--              </v-list-item-content>-->
      <!--            </v-list-item>-->
      <!--            <v-list-item>-->
      <!--              <v-list-item-content>-->
      <!--                <v-list-item-title>-->
      <!--                  Main Account (USDT)-->
      <!--                </v-list-item-title>-->
      <!--                <span>122.00</span>-->
      <!--                <v-list-item-subtitle>-->
      <!--                  = $122.11-->
      <!--                </v-list-item-subtitle>-->
      <!--              </v-list-item-content>-->
      <!--            </v-list-item>-->
      <!--          </v-list>-->
      <!--        </v-card-text>-->

      <!--        <v-card-actions class="mr-5 ml-5 mb-3">-->
      <!--          <v-btn-->
      <!--            width="100%"-->
      <!--            class="white&#45;&#45;text"-->
      <!--            color="#6558f5">-->
      <!--            Collect Winnings-->
      <!--          </v-btn>-->
      <!--        </v-card-actions>-->
      <!--      </v-card>-->
    </div>
    <!--    <div class="d-flex justify-space-between mb-7">-->
    <!--      <v-card-->
    <!--        outlined-->
    <!--        class="text-left"-->
    <!--        width="45%">-->
    <!--        <v-card-title class="font-weight-medium">-->
    <!--          Win up to:-->
    <!--        </v-card-title>-->
    <!--      </v-card>-->
    <!--      <v-card-->
    <!--        outlined-->
    <!--        class="text-left"-->
    <!--        width="45%">-->
    <!--        <v-card-title class="font-weight-medium">-->
    <!--          Total wins payout:-->
    <!--        </v-card-title>-->
    <!--      </v-card>-->
    <!--    </div>-->
    <!--    <div class="d-flex justify-space-between">-->
    <!--      <v-card-->
    <!--        outlined-->
    <!--        class="text-left"-->
    <!--        width="45%">-->
    <!--        <v-card-title class="font-weight-medium">-->
    <!--          XLotto Stats-->
    <!--        </v-card-title>-->
    <!--      </v-card>-->
    <!--    </div>-->
  </v-responsive>
</template>

<script>
import web3 from "../../contracts/web3";
import { mapGetters } from "vuex";
import MyTickets from '@/components/Home/MyTickets.vue'

export default {
  name: 'Home',

  components: {
    MyTickets,
  },

  data() {
    return {
      currentBalance: 0,
    };
  },
  computed: {
    ...mapGetters(['getSelectedAddress', 'getSelectedAddressBalance']),
  },
  methods: {},
};
</script>
