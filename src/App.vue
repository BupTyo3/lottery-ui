<template>
  <v-app v-resize="onResize">
    <sidebar
      :window-size="windowSize"
      :show="showSide"
      @hideSidebar="hideSidebar" />

    <topbar
      :window-size="windowSize"
      :hide="showSide"
      @showSidebar="showSidebar" />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Topbar from '@/components/Topbar.vue';

export default {
  name: 'App',

  components: {
    Sidebar,
    Topbar,
  },

  data() {
    return {
      showSide: false,
      windowSize: {
        width: 0,
        height: 0,
      },
    };
  },

  mounted() {
    this.onResize();
  },

  methods: {
    showSidebar(val) {
      this.showSide = val;
    },
    hideSidebar(val) {
      this.showSide = val;
    },
    onResize() {
      this.windowSize.width = window.innerWidth;
      this.windowSize.height = window.innerHeight;
    },
  },
};
</script>

<style>
.v-dialog--custom {
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
}

.v-dialog--custom::-webkit-scrollbar {
  width: 0;
}

@media screen and (min-width: 768px) {
  .v-dialog--custom {
    width: 22%;
  }
}
</style>
