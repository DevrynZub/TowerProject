<template>
  <div class="card text center rounded elevation">
    <p class="text-center">{{ event.name }}</p>
    <router-link :to="{ name: 'Event', params: { eventId: event.creatorId } }">
      <img :src="event.coverImg" :alt="event.name" class="img-fluid">
      <i><span>{{ event.ticketCount }}</span></i>
    </router-link>
  </div>
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