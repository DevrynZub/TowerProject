<template>
  <nav class="navbar navbar-expand-lg px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo" src="https://th.bing.com/th/id/OIP.LwH4KeiT5sKPhsI4QQY4XwAAAA?pid=ImgDet&rs=1" height="45" />
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'Account' }" class="btn btn-danger lighten-30 selectable text-uppercase m-2">
            <i>Account</i>
          </router-link>
        </li>
        <li>
          <button v-if="'account.id'" class="btn btn-danger m-2" type="button" data-bs-toggle="modal"
            data-bs-target="#createEventModal">
            <i>Create Event</i>
          </button>
        </li>
        <li>
          <button v-if="route.name == 'Event' && account.id && account.id == event?.creatorId" @click="archiveEvent()"
            class="btn btn-success m-2" type="button">
            <i class="text-danger"></i>Archive Event
          </button>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>

  </nav>
</template>

<script>
import { useRoute } from 'vue-router';
import Login from './Login.vue';
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js';
export default {
  setup() {
    const route = useRoute()
    return {
      route,
      account: computed(() => AppState.account),
      event: computed(() => AppState.activeEvent),

      async archiveEvent() {
        try {
          const eventToBeArchived = await Pop.confirm()
          if (!eventToBeArchived) {
            return
          }
          const eventId = route.params.eventId
          await towerEventsService.archiveEvent(eventId)
        } catch (error) {
          Pop.error(error.message)
        }
      }

    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
    background-color: rgb(82, 81, 81);
  }



}
</style>
