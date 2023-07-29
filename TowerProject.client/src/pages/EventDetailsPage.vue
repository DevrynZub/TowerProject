<template>
  <div class="container-fluid">
    <div class="row">
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
              <button v-if="!isAttendee" class="btn btn-success" @click="becomeAttendee()">Attending</button>
              <button v-else class="btn btn-success" @click="removeAttendee()">Not Attendings</button>
              <div class=" p-2">
                <h2>Attending: {{ event.ticketCount }}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- NOTE THIS is a great reference for me when I am lost on pulling things to the page. -->
    <div class="card card-attendee m-2">
      <h1 class="text-center mb-2">Attendees</h1>
      <div class="d-flex mb-3 justify-content-center">
        <div v-for="attendee in attendees" :key="attendee.id">
          <img class="rounded-circle b-none attendee-img" :src="attendee.profile.picture" alt="">
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-center">
    <div class="col-8 ">
      <form @submit.prevent="createComment()">
        <label for="comment" class="form-label">Comment</label>
        <input v-model="editable.body" required type="text" class="form-control" id="body" placeholder="Leave a comment"
          style="height: 100px" maxlength="75" minlength="3">
        <button type="submit" @click="submitEventForm">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>


<script>
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import { logger } from '../utils/Logger.js';
import { computed, ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { attendeesService } from '../services/AttendeesService.js';
import { commentService } from '../services/CommentService.js';




export default {
  setup() {
    const route = useRoute();
    const editable = ref({})



    async function getEventsById(eventId) {
      try {
        // const eventId = route.params.eventId
        await towerEventsService.getEventsById(eventId);
      }
      catch (error) {
        logger.log(error);
        Pop.error(error.message);
      }
    }
    async function getAttendeeEventsByEventId() {
      try {
        const eventId = route.params.eventId;
        await attendeesService.getAttendeeEventsByEventId(eventId);
      }
      catch (error) {
        logger.error(error);
        Pop.toast(error.message, 'error');
      }
    }

    async function getCommentsByEventId() {
      try {
        const eventId = route.params.eventId;
        await commentService.getCommentsByEventId(eventId);
      }
      catch (error) {
        logger.log(error);
        Pop.toast(error.message, 'error');
      }
    }

    watchEffect(() => {
      getEventsById(route.params.eventId),
        getAttendeeEventsByEventId(),
        getCommentsByEventId();
    });
    return {
      editable,
      comments: computed(() => AppState.comments),
      event: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
      attendees: computed(() => AppState.eventAttendees),
      isAttendee: computed(() => {
        return AppState.eventAttendees.find(attendee => attendee.accountId == AppState.account.id);


      }),

      async createComment() {
        try {
          const formData = editable.value
          logger.log(formData, 'form data object')
          formData.eventId = route.params.eventId
          await commentService.createComment(formData)
          editable.value = {}
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')

        }
      },

      async becomeAttendee() {
        try {
          logger.log('become attendee');
          const activeEventId = route.params.eventId;
          const attendeeData = { eventId: activeEventId };
          await attendeesService.becomeAttendee(attendeeData);
          // NOTE PLEASE INCREASE :D
          AppState.activeEvent.ticketCount++;
        }
        catch (error) {
          logger.error(error);
          Pop.toast(error.message, 'error');
        }
      },
      async removeAttendee() {
        try {
          const attendeeToRemove = AppState.eventAttendees.find(attendee => attendee.accountId == AppState.account.id);
          const attendeeId = attendeeToRemove.id;
          await attendeesService.removeAttendee(attendeeId);
          AppState.activeEvent.ticketCount--;
        }
        catch (error) {
          logger.error(error);
          Pop.toast(error.message, 'error');
        }
      },
    }
  }
}


</script>


<style lang = "scss" scoped >
.card {
  background: rgba(115, 87, 204, 0.53);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.9px);
  -webkit-backdrop-filter: blur(6.9px);
  border: 1px solid rgba(123, 106, 106, 1);
}

.card-attendee {
  background: rgba(201, 79, 79, 0.53);
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


.attendee-img {
  height: 10vh;
  width: 10vh;
  border-radius: 5px;
  box-shadow: 2px 2px white;

}
</style>
