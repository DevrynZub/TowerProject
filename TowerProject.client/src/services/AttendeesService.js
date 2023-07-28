import { AppState } from "../AppState.js"
import { Attendee } from "../models/Attendee.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"


class AttendeesService {

  async becomeAttendee(attendeeData) {
    const res = await api.post('api/tickets', attendeeData)
    logger.log('[GETTING TICKETS]', res.data)
    AppState.eventAttendees.push(new Attendee(res.data))
  }

  async removeAttendee(attendeeId) {
    const res = await api.delete(`api/tickets/${attendeeId}`)
    logger.log('[REMOVING TICKET]', res.data)
    AppState.eventAttendees = AppState.eventAttendees.filter(attendee => attendee.id != attendeeId)
  }

  async getMyAttendeeEvents() {
    try {
      const res = await api.get('account/tickets')
      logger.log('[GET MY TICKETS]', res.data)
      AppState.myTickets = res.data.map(d => new Attendee(d))
    } catch (error) {
      logger.error(error)
      Pop.toast(error.message, 'error')
    }
  }

  async getAttendeeEventsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('[GETTING ALL EVENT TICKETS]', res.data)
    AppState.eventAttendees = res.data.map(d => new Attendee(d))
  }


}

export const attendeesService = new AttendeesService()
