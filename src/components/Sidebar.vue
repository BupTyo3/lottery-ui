<template>
  <v-navigation-drawer
    v-model="showBar"
    app
    width="200px">
    <v-list-item>
      <v-list-item-avatar>
        <v-icon>mdi-avatar</v-icon>
      </v-list-item-avatar>
    </v-list-item>
    <v-list dense>
      <h1>X lotto</h1>
      <template v-for="(item, i) in items">
        <v-row
          v-if="item.heading"
          :key="item.heading"
          align="center">
          <v-col cols="6">
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-col>
          <v-col
            cols="6"
            class="text-center">
            <a
              href="#"
              class="body-2 black--text">EDIT</a>
          </v-col>
        </v-row>
        <v-divider
          v-else-if="item.divider"
          :key="i"
          dark
          class="my-4" />
        <v-list-group
          v-else-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon="">
          <template #activator>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(child, index) in item.children"
            :key="index"
            link
            :to="child.route">
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ child.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-else
          :key="item.text"
          link
          :to="item.route"
          color="#1976d2">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <div>Light / Dark</div>
    <div class="d-flex justify-center">
      <v-switch
        v-model="$vuetify.theme.dark"
        class="align-content-center" />
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',

  components: {},

  props: {
    show: {
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
      light: true,
      items: [
        {
          icon: 'mdi-home',
          text: 'Home',
          route: { name: 'home' },
          roleLevel: 1,
        },
        {
          icon: 'mdi-ticket-confirmation',
          text: 'Lottery',
          route: { name: 'lottery' },
          roleLevel: 1,
        },
        {
          icon: 'mdi-library',
          text: 'Info',
          route: { name: 'info' },
          roleLevel: 1,
        },
        {
          icon: 'mdi-account',
          text: 'Admin',
          route: { name: 'admin' },
          roleLevel: 1,
        },
      ],
    };
  },

  computed: {
    showBar: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit('hideSidebar', val);
      },
    },
  },

  watch: {
    'windowSize.width': function (val) {
      if (val <= 1000) {
        this.$emit('hideSidebar', true);
      }
    },
  },

  mounted() {
    if (this.windowSize.width <= 1100) {
      this.$emit('hideSidebar', true);
    }
  },
};
</script>
