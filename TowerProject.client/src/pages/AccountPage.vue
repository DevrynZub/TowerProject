<template>
  <div class="text-center account-page">
    <h1>My Tickets</h1>
    <h1 class="text-center fs-bold"></h1>
    <div class="container-fluid mt-5">
      <div class="row">
        <div class="col-12 col-md-4" v-for="ticket in myTickets" :key="ticket.id">
          <div class="card mb-3">
            <div class="card-header">{{ ticket.event.name }}</div>
            <img :src="ticket.event.coverImg" class="card-img-top img-fluid elevation rounded"
              :style="{ objectFit: 'cover', height: '200px' }" alt="Event Cover">
            <div class="card-body">
            </div>
          </div>
        </div>
      </div>
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
      getMyAttendeeEvents();
    });



    return {
      account: computed(() => AppState.account),
      accountEvents: computed(() => AppState.myTickets),
      myTickets: computed(() => AppState.myTickets),
    };
  },
}
</script>

<style scoped>
img {
  height: 35vh;
  object-fit: cover;
  object-position: center;

}

.account-page {
  background-image: url('https://images.unsplash.com/photo-1623079990309-6b8f80abba66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
}
</style>
