

export class Comment {
  constructor(data) {
    this.id = data.id
    this.creator = data.creator
    this.eventId = data.eventId
    this.body = data.body
    this.IsAttending = data.IsAttending
    this.creatorAt = data.creatorAt
    this.updatedAt = data.updatedAt
  }
}

