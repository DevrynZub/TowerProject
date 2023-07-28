<template>
  <div class="container-fluid">
    <div class="row">

      <!-- SECTION Events -->
      <div v-if="event" class="col-3">
        <div class="d-flex">
          <img :src="event.coverImg" :alt="event.name" class="rounded">
        </div>
        <div>
          <p>{{ event.title }}</p>
          <p>{{ event.creator }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped></style>