<template>
  <v-card
    outlined
    class="text-left"
    width="45%">
    <span v-if="tickets.length">
      <v-card-title class="font-weight-medium">
        Your Tickets
      </v-card-title>

      <v-card-text>
        <v-list>
          <v-list-item
            v-for="(ticket, index) in tickets"
            :key="index">
            <v-list-item-content>
              <span>{{ ticket[1] }}</span>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </span>
    <span v-else>
      <v-card-title class="font-weight-medium">
        You do not have any tickets yet
      </v-card-title>
    </span>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyTickets',

  computed: {
    ...mapState({
      tickets: 'myTickets',
    })
  }
}
</script>