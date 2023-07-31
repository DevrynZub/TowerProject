import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class TowerEventService {


  async createTowerEvent(eventData) {
    const newTowerEvent = await dbContext.TowerEvents.create(eventData)
    await newTowerEvent.populate('creator ticketCount')
    return newTowerEvent
  }

  async getEvents() {
    const events = await dbContext.TowerEvents.find()
      .populate('creator ticketCount')
    return events
  }

  async getEventsById(eventId) {
    const event = await dbContext.TowerEvents.findById(eventId).populate('creator ticketCount')
    if (!event) {
      throw new BadRequest(`Event at eventsId: ${eventId} does not exist`)
    }
    return event
  }

  async updateEvents(eventId, userId, eventData) {
    const originalEvent = await this.getEventsById(eventId)

    if (originalEvent.creatorId.toString() !== userId) {
      throw new Forbidden(`You are not the creator of ${originalEvent.name}`)
    }

    // TODO check has the event already been canceled? 
    if (originalEvent.isCanceled) {
      throw new Forbidden(`stop that`)
    }

    // Update capacity if provided in eventData
    if (eventData.capacity != null) {
      originalEvent.capacity = eventData.capacity
    }

    // Update other event fields as needed
    originalEvent.name = eventData.name || originalEvent.name
    originalEvent.description = eventData.description || originalEvent.description

    // Save the updated event
    let updatedEvent = await originalEvent.save()
    return updatedEvent
  }

  async archiveEvent(eventId, userId) {

    const eventToBeArchived = await this.getEventsById(eventId)
    if (eventToBeArchived.creatorId.toString() != userId) {
      throw new Forbidden('You are not the creator of this event, you can not cancel it')
    }
    eventToBeArchived.isCanceled = true
    let archivedEvent = await eventToBeArchived.save()
    return archivedEvent

  }


}
export const towerEventService = new TowerEventService()