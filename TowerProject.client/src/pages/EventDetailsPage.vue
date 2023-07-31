<template>
  <div class="container-fluid details-page">
    <div class="row">
      <div v-if="event" class="card-event col-md-12 p-5">
        <p>Event Date: {{ event.startDate.toDateString(2) }}, {{ event.startDate.toLocaleTimeString(2) }}</p>
        <p>{{ event.location }}</p>
        <p v-if="event.isCanceled">Event Cancelled</p>
        <div class="d-flex justify-content-between align-items-center">
          <img v-if="remainingTickets === 0 && !event.isCanceled"
            src="https://th.bing.com/th/id/OIP.YxmolNlivbjTKrdUGOyszgHaF9?pid=ImgDet&rs=1" alt="Sold Out"
            class="rounded img-class" />
          <img v-else-if="!event.isCanceled" :src="event.coverImg" :alt="event.name" class="rounded img-class" />
          <img v-else src="https://tarentumboro.com/wp-content/uploads/2020/07/event-canceled.jpg" alt="Event Cancelled"
            class="rounded img-class" />

          <div class="card-description p-2">
            <h1> {{ event.name }}, {{ event.type }} event</h1>
            <h3>Ticket Count: {{ event.ticketCount }}</h3>
            <h4>Remaining Tickets: {{ remainingTickets }}</h4>
            {{ event.description }}


            <div class="d-flex pt-2">
              <button v-if="!isAttendee && !event.isCanceled && remainingTickets > 0" class="btn btn-success"
                @click="becomeAttendee()">Buy Ticket</button>
              <button v-else class="btn btn-success" :disabled="event.isCanceled || remainingTickets === 0"
                @click="removeAttendee()">Return Ticket</button>
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
      <div v-for="attendee in attendees" :key="attendee.id" class="d-flex flex-column align-items-center">
        <p>{{ attendee.profile.name }}</p>
        <img class="rounded-circle b-none attendee-img" :src="attendee.profile.picture" alt="">

      </div>
    </div>
  </div>
  <div class="d-flex justify-content-center">
    <div class="col-8 mb-2 ">
      <form @submit.prevent="createComment()">
        <label for="comment" class="form-label">Comment</label>
        <input v-model="editable.body" required type="text" class="form-control mb-3" id="body"
          placeholder="Leave a comment" style="height: 100px" maxlength="75" minlength="3">
        <button v-if="event && !event.isCanceled" class="mb-3" type="submit" @click="submitEventForm">Submit</button>
      </form>
      <div class="card p-2">
        <div v-for="comment in comments" :key="comment.id" class="card-comments p-2 d-flex m-1 justify-content-between">
          <div class="d-flex flex-column align-items-center">
            <img class="rounded-circle b-none comment-img" :src="comment.creator.picture" alt="">
            <p>{{ comment.creator.name }}</p>
          </div>
          <div class="d-flex text-center mt-4">{{ comment.body }}</div>
          <button class="mdi mdi-delete-alert-outline delete-button" @click="deleteComment(comment.id)"
            :disabled="!account"></button>
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
import { computed, ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { attendeesService } from '../services/AttendeesService.js';
import { commentService } from '../services/CommentService.js';




export default {
  setup() {
    const route = useRoute();
    const editable = ref({});



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
      remainingTickets: computed(() => AppState.activeEvent.capacity - AppState.activeEvent.ticketCount),
      event: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
      attendees: computed(() => AppState.eventAttendees),
      isAttendee: computed(() => {
        return AppState.eventAttendees.find(attendee => attendee.accountId === AppState.account?.id);
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

      async deleteComment(commentId) {
        try {
          await commentService.deleteComment(commentId);
          AppState.comments = AppState.comments.filter((comment) => comment.id !== commentId);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, 'error');
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
        } catch (error) {
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
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, 'error');
        }
      },
    }
  }
}


</script>


<style lang = "scss" scoped >
.details-page {
  background-image: url('https://images.unsplash.com/photo-1623079990309-6b8f80abba66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  // min-height: 100vh;
}

.comment-img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  box-shadow: 2px 2px white;
}

.sold-out-image {
  width: 100px;
  height: 100px;
  // opacity: 0.5;
}

.delete-button {
  background: transparent;
  border: none;
  color: red;
  cursor: pointer;
}

.card {
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.9px);
  -webkit-backdrop-filter: blur(6.9px);
  border: 1px solid rgba(123, 106, 106, 1);
}

.card-comments {
  background: rgba(115, 87, 204, 0.53);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.9px);
  -webkit-backdrop-filter: blur(6.9px);
  border: 1px solid rgba(123, 106, 106, 1);
  margin: 0;
  text-align: center;
}

.card-event {
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


.disabled-button {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
