<template>
  <form @submit.prevent="createComment()">
    <div class="mb-3">
      <label for="text" class="form-label">Comments</label>
      <input required type="text" v-model="editable.comment" class="form-control" id="comment" placeholder="comments!"
        maxlength="75" minlength="3">
    </div>
    <div class="text-end">
      <button class="btn btn-success" type="submit">Submit</button>
    </div>
  </form>
</template>


<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import { commentService } from '../services/CommentService.js';
import { Modal } from 'bootstrap';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      editable,

      async createComment() {
        try {
          const formData = editable.value
          logger.log(formData, 'form data object')
          formData.eventId = route.params.eventId
          await commentService.createComment(formData)
          editable.value = {}
          Modal.getOrCreateInstance('#createCommentModal').hide()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    };
  },
};
</script>


<style lang="scss" scoped></style>