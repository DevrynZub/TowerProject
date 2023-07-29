<template>
  <form @submit.prevent="createEvent()">
    <div class="mb-3">
      <label for="name" class="form-label">Event Name:</label>
      <input v-model="editable.name" required type="text" class="form-control" id="name" placeholder="Event Name"
        maxlength="75" minlength="5">
    </div>
    <div class="mb-3">
      <label class="form-label" for="coverImg">Cover Image</label>
      <input type="text" id="coverImg" v-model="editable.coverImg" placeholder="Picture of Event" />
    </div>
    <select class="form-select mb-3" aria-label="Default select example">
      <option selected>Event Type</option>
      <option value="1">Concert</option>
      <option value="2">Digital</option>
      <option value="3">Sports</option>
      <option value="3">Convention</option>
      <option value="3">Misc</option>
    </select>
    <div class="mb-2">
      <label for="description" class="form-label">Description</label>
      <textarea v-model="editable.description" required class="form-control form-control-lg" id="description"
        placeholder="Leave a Description here"></textarea>
    </div>
    <div class="mb-2">
      <label for="type" class="form-label">Location</label>
      <input v-model="editable.location" required type="text" class="form-control width=" id="location"
        placeholder="Event Location">
    </div>
    <div class="mb-2">
      <label for="type" class="form-label">Capacity</label>
      <input v-model="editable.capacity" required type="number" class="form-control" id="capacity"
        placeholder="How many tickets?">
    </div>
    <div class="mb-2">
      <label for="type" class="form-label">Date of Event:</label>
      <input v-model="editable.startDate" type="date" class="form-control">
    </div>
    <div class="mb-2">
      <label for="cancelled" class="form-label m-2">Cancelled?</label>
      <input v-model="editable.cancelled" type="checkbox" id="cancelled">
    </div>
    <div>
      <button class="btn btn-success" @click="submitEventForm">Submit</button>
    </div>
  </form>
</template>


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import { Modal } from 'bootstrap';

export default {
  setup() {
    const editable = ref({})
    const router = useRouter()
    const startDate = ref(null);



    return {
      editable,
      type: ['concert', 'sport', 'digital', 'convention', 'misc'],
      startDate,


      async createEvent() {
        try {
          const eventData = editable.value
          const event = await towerEventsService.createEvent(eventData)
          editable.value = {}
          Modal.getOrCreateInstance('#createEventModal').hide()
          router.push({ name: 'Event', params: { eventId: event.id } })
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>