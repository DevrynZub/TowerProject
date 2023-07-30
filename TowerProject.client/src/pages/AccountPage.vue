<!-- eslint-disable no-undef -->
<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <h2>Events with Tickets:</h2>
    <div v-for="event in accountEvents" :key="event.id">
      {}
    </div>





  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { logger } from '../utils/Logger.js';
import { attendeesService } from '../services/AttendeesService.js';

export default {
  setup() {
    const account = ref({});
    // const accountEvents = ref({});
    async function getMyAttendeeEvents() {
      try {
        const accountId = account.value.id;
        const events = await attendeesService.getMyAttendeeEvents(accountId);
        accountEvents.value = events;
        AppState.myTickets = events;
      }
      catch (error) {
        logger.error(error);
      }
    }
    watchEffect(() => {
      logger.log('Watcher triggered');
      getMyAttendeeEvents();
    });
    return {
      account: computed(() => AppState.account),
      accountEvents: computed(() => AppState.myTickets),
    };
  },
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
