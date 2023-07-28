import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService {

  async getEvents() {
    // debugger
    const res = await api.get('api/events')
    logger.log('[GET EVENTS]', res.data)
    const events = res.data.map(eventPojo => new Event(eventPojo))
    logger.log('[LETS SEE EVENTS]', events)
    AppState.events = events

  }

  async createEvent(eventData) {
    const res = await api.post('api/albums', eventData)
    logger.log(res.data)
    const event = new Event(res.data)
    return event

  }


}

export const towerEventsService = new TowerEventsService()