import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventService } from "./TowerEventService.js"


class CommentService {

  async createComment(commentData) {
    const event = await towerEventService.getEventsById(commentData.eventId)

    if (event.isCanceled == true) {
      throw new Forbidden(`${event.name} has been cancelled. You can't add comments to this event.`)
    }
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator')
    return comment
  }

  async getCommentsByEventsId(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator')
    return comments
  }


  async deleteComment(commentId, userId) {
    const commentsToBeDeleted = await dbContext.Comments.findById(commentId)

    if (!commentsToBeDeleted) {
      throw new BadRequest(`This comment with the ID of ${commentId} does not exist`)
    }
    if (commentsToBeDeleted.creatorId != userId) {
      throw new Forbidden('This comment is not yours, you cant delete it')
    }
    await commentsToBeDeleted.remove()
    return commentsToBeDeleted
  }


}

export const commentService = new CommentService()