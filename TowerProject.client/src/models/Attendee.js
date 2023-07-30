

export class Attendee {
  constructor(data) {
    this.id = data.id
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.profile = data.profile
    this.event = data.event
    this.accountId = data.accountId
    this.eventId = data.eventId

  }
}