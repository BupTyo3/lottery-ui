<template>
  <v-app-bar
    app
    flat>
    <v-app-bar-nav-icon
      v-if="windowSize.width <= 1100"
      @click.stop="showSidebar" />
    <v-row class="d-flex justify-end">
      <v-btn
        max-width="110"
        class="white--text mr-3"
        color="#6558f5"
        style="font-size: 0.8rem">
        {{ owner }}
      </v-btn>
      <v-avatar
        size="38"
        :color="$vuetify.theme.dark ? '#717477' : '#dfe6ed'">
        <v-icon
          v-if="$vuetify.theme.dark"
          dark>
          mdi-account
        </v-icon>
        <v-icon
          v-else
          d
          light>
          mdi-account
        </v-icon>
      </v-avatar>
    </v-row>
  </v-app-bar>
</template>

<script>
import web3 from '../../contracts/web3';
import lottery from '../../contracts/lotteryInstance';
import round from '../../contracts/RoundInstance';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Topbar',

  props: {
    hide: {
      type: Boolean,
      default: false,
    },
    windowSize: {
      type: Object,
      default() {
        return {
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    },
  },

  data() {
    return {
      drawer: false,
      owner: '',
    };
  },

  computed: {
    ...mapState({
      selectedAddress: 'selectedAddress',
    }),
  },

  watch: {
    hide(val) {
      this.drawer = val;
    },
  },

  async mounted() {
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length) {
        this.updateAddress(accounts[0])
        this.owner = this.sliceString(accounts[0]);
      } else {
        this.owner = "Connect";
      }
    });

    const owner = await web3.eth.getAccounts();

    if (owner.length) {
      this.updateAddress(owner[0])
      this.owner = this.sliceString(owner[0]);
    } else {
      this.owner = 'Connect';
    }
  },

  methods: {
    ...mapMutations(['setSelectedAddress', 'setSelectedAddressBalance', 'setMyTickets']),
    showSidebar() {
      this.drawer = !this.drawer;
      this.$emit('showSidebar', this.drawer);
    },
    sliceString(str) {
      const start = str?.slice(0, 6);
      const end = str?.slice(str.length - 4, str.length);
      return `${start}...${end}`;
    },
    updateAddress(address) {
      this.setSelectedAddress(address)
      web3.eth.getBalance(address).then((resp) => {
        const balance = web3.utils.fromWei(resp);
        this.setSelectedAddressBalance(balance);
      }).then(() => {
        this.getTicketsByCurrAddress();
      });
    },
    getTicketsByCurrAddress() {
      lottery.methods.getCurrentRoundAddress().call().then((resp) => {
        const roundInstance = round(resp);
        roundInstance.methods.getTicketsByOwner(this.selectedAddress)
          .call().then((resp2) => {
            console.log('tickets ', resp2);
            this.setMyTickets(resp2);
          });
      });
    },
  },
};
</script>
