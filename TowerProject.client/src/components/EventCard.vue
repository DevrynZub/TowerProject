<template>
  <router-link :to="{ name: 'Event', params: { eventId: event.id } }">
    <div class="image-container">
      <img :src="event.coverImg" :alt="event.name" class="img-fluid" />
      <div v-if="event.isCancelled" class="cancelled-label">Cancelled</div>
    </div>
  </router-link>
  <p class="text-center">{{ event.name }}</p>
  <p class="text-center">{{ event.location }}</p>
  <p class="text-center">{{ event.startDate.toDateString(2) }}</p>
  <p class="text-center">Tickets: {{ event.ticketCount }}</p>
  <p class="text-center">{{ event.type }}</p>
</template>


<script>

export default {
  props: {
    event: { type: Object, required: true },
  },

  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
img {
  height: 35vh;
  object-fit: cover;
  object-position: center;

}
</style>