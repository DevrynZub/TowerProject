import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventService } from "./TowerEventService.js"

class TicketService {

  async createTicket(ticketData) {
    const ticket = await towerEventService.getEventsById(ticketData.eventId)

    if (ticket.isCanceled == true) {
      throw new Forbidden(`${ticket.name} has been cancelled, You cannot buy tickets for this event`)
    }

    const newTicket = await dbContext.Tickets.create(ticketData)
    await newTicket.populate('profile event')
    return newTicket
  }

  async getMyTickets(accountId) {
    const eventTickets = await dbContext.Tickets.find({ accountId })
      .populate({
        path: 'event',
        populate: {
          path: 'creator ticketCount'
        }
      })
    return eventTickets
  }
  async getEventTicketsById(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'event')
    return tickets

  }
  async deleteTicket(ticketId, userId) {
    const ticketsToBeDeleted = await dbContext.Tickets.findById(ticketId)

    if (!ticketsToBeDeleted) {
      throw new BadRequest('The ticket with this Id ${ticketId} does not exist')
    }
    if (ticketsToBeDeleted.accountId != userId) {
      throw new Forbidden('This ticket does not belong to you, you cant delete it. ')
    }

    await ticketsToBeDeleted.remove()
    return ticketsToBeDeleted

  }





}

export const ticketService = new TicketService()