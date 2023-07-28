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
    <div class="form-floating mb-2">
      <textarea class="form-control" placeholder="Leave a Description here" id="floatingTextarea"></textarea>
      <label for="floatingTextarea">Description</label>
    </div>
    <div class="mb-2">
      <label for="type" class="form-label">Location</label>
      <input v-model="editable.location" required type="text" class="form-control" id="location"
        placeholder="Event Location">
    </div>
    <div class="mb-2">
      <label for="type" class="form-label">Capacity</label>
      <input v-model="editable.capacity" required type="number" class="form-control" id="capacity"
        placeholder="How many tickets?">
    </div>
    <div class="mb-2">
      <label for="type" class="form-label">Date of Event:</label>
      <input v-model="editable.startDate" required type="text" class="form-control" id="startDate"
        placeholder="When is this event?">
    </div>
    <div class="mb-2">
      <label for="cancelled" class="form-label">Cancelled?</label>
      <input v-model="editable.cancelled" required type="checkbox" id="cancelled" placeholder="Is this event still on?">
    </div>
    <div class="text-end">
      <button class="btn btn-success" type="submit">Submit</button>
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

    return {
      editable,
      types: ['concert', 'sport', 'digital', 'convention', 'misc'],


      async createEvent() {
        try {
          const eventData = editable.value
          const event = await towerEventsService.createEvent(eventData)
          editable.value = {}
          Modal.getOrCreateInstance('#exampleModal').hide()
          router.push({ name: 'Event', params: { eventId: event.creatorId } })
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>