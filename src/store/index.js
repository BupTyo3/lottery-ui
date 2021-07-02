import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {},
  state: {
    selectedAddress: null,
    selectedAddressBalance: 0,
    myTickets: [],
  },
  mutations: {
    setSelectedAddress(state, address) {
      state.selectedAddress = address;
    },
    setSelectedAddressBalance(state, balance) {
      state.selectedAddressBalance = balance;
    },
    setMyTickets(state, tickets) {
      state.myTickets = tickets;
    },
  },
  actions: {},
  getters: {
    getSelectedAddress: (state) => {
      return state.selectedAddress;
    },
    getSelectedAddressBalance: (state) => {
      return state.selectedAddressBalance;
    },
    getMyTickets: (state) => {
      return state.myTickets;
    },
  },
});
