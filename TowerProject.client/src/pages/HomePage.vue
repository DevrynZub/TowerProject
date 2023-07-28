<template>
  <div class="container-fluid events-background">
    <div class="row">
      <div class=" card col-12 tower-img text-light text-center">
        <h1>TOWER</h1>

      </div>
    </div>
    <div>
      <div class="row">
        <div class=" col-md-3 col-12 p-4 " v-for="event in events" :key="event.id">
          <EventCard :event="event" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js'
import EventCard from '../components/EventCard.vue';
import { AppState } from '../AppState.js';


export default {
  setup() {
    const filterBy = ref("");
    async function getEvents() {
      try {
        await towerEventsService.getEvents();
      }
      catch (error) {
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getEvents();
    });
    return {
      filterBy,
      events: computed(() => {
        if (filterBy.value == "") {
          return AppState.events
        } else {
          return AppState.events.filter(event => event.category == filterBy.value)
        }
      })
    };
  },
  components: { EventCard }
}
</script>


<style lang="scss" scoped>
.tower-img {
  background-image: url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80');
  height: 50vh;
  object-fit: cover;
  background-repeat: no-repeat;
  background-size: cover;

}

.events-background {
  background-color: rgb(82, 81, 81);


}
</style>