import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { towerEventService } from "./TowerEventService.js"


class CommentService {


  async createComment(commentData) {
    const event = await towerEventService.getEventsById(commentData.eventId)

    if (event.isCanceled == true) {
      throw new Forbidden(`${event.name} has been cancelled. You can't add comments to this event.`)
    }
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'comment.body')
    return comment
  }




}

export const commentService = new CommentService()