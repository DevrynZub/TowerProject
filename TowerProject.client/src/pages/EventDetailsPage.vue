<template>
  <div class="container-fluid">
    <div class="row">

      <!-- SECTION Events -->

      <div v-if="event" class="card col-md-12 p-5">
        <p>Event Date: {{ event.startDate.toDateString(2) }}, {{ event.startDate.toLocaleTimeString(2) }}</p>
        <p>{{ event.location }}</p>
        <p>Event Cancelled: {{ event.isCanceled }}</p>
        <div class="d-flex justify-content-between align-items-center">
          <img :src="event.coverImg" :alt="event.name" class="rounded img-class">

          <div class="card-description p-2">
            <p> {{ event.name }}, {{ event.type }} event</p>
            <p>Ticket Count: {{ event.ticketCount }}</p>
            <p>Event Capacity: {{ event.capacity }}</p>
            {{ event.description }}
            <div class="d-flex pt-2">
              <button v-if="!isAttendee" class="btn btn-secondary" @click="becomeAttendee()">Attending <i
                  class="mdi mdi-ticket"></i></button>
              <button v-else class="btn btn-secondary" @click="removeAttendee()">Not Attending <i
                  class="mdi mdi-cancel"></i></button>
              <div class="rounded bg-info light-shadow p-2">
                <h2>{{ event.ticketCount }}</h2>
              </div>
            </div>
          </div>
        </div>
        <!-- SECTION Event Pictures -->
        <div class="col-md-9">
          <div class="row">
            <!-- <div class="col-3 p-2" v-for="comment in comments">
              <img class="album-picture" :src="" alt="">
            </div> -->
          </div>
        </div>


      </div>
    </div>
  </div>
</template>


<script>
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import { logger } from '../utils/Logger.js';
import { computed, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { attendeesService } from '../services/AttendeesService.js';

export default {
  setup() {
    const route = useRoute()

    async function getEventsById(eventId) {
      try {
        // const eventId = route.params.eventId
        await towerEventsService.getEventsById(eventId)
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }

    async function getAttendeeEventsByEventId() {
      try {
        const eventId = route.params.eventId
        await attendeesService.getAttendeeEventsByEventId(eventId)
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    }









    watchEffect(() => {
      getEventsById(route.params.eventId),
        getAttendeeEventsByEventId()
    })



    return {
      event: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
      attendees: computed(() => AppState.eventTickets),
      isAttendee: computed(() => {
        return AppState.eventAttendees.find(attendee => attendee.accountId == AppState.account.id)
      }),

      async becomeAttendee() {
        try {
          logger.log('become attendee')
          const activeEventId = route.params.eventId
          const attendeeData = { eventId: activeEventId }
          await attendeesService.becomeAttendee(attendeeData)
          // NOTE PLEASE INCREASE :D
          AppState.activeEvent.ticketCount++
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async removeAttendee() {
        try {
          const attendeeToRemove = AppState.eventAttendees.find(attendee => attendee.accountId == AppState.account.id)
          const attendeeId = attendeeToRemove.id
          await attendeesService.removeAttendee(attendeeId)
          AppState.activeEvent.ticketCount--
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.card {

  background: rgba(123, 106, 106, 0.53);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.9px);
  -webkit-backdrop-filter: blur(6.9px);
  border: 1px solid rgba(123, 106, 106, 1);
}

.card-description {
  background: rgba(47, 24, 193, 0.53);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.9px);
  -webkit-backdrop-filter: blur(6.9px);
  border: 1px solid rgba(123, 106, 106, 1);
  margin-left: 20px;
  color: black;

}



.img-class {
  height: 35vh;
}
</style>