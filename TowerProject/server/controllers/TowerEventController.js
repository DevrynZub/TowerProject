import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventService } from "../services/TowerEventService.js";
import { ticketService } from "../services/TicketService.js";



export class TowerEventController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getEvents)
      .get('/:eventId', this.getEventsById)
      .get('/:eventId/tickets', this.getEventTicketsById)


      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
      .put('/:eventId', this.updateEvents)
      .delete('/:eventId', this.archiveEvent)


  }
  async createTowerEvent(req, res, next) {
    try {
      const eventData = req.body
      eventData.creatorId = req.userInfo.id
      const events = await towerEventService.createTowerEvent(eventData)
      return res.send(events)
    } catch (error) {
      next(error)
    }

  }

  async getEvents(req, res, next) {
    try {
      const events = await towerEventService.getEvents()
      return res.send(events)
    } catch (error) {
      next(error)
    }

  }

  async getEventsById(req, res, next) {
    try {
      const eventId = req.params.eventId
      const event = await towerEventService.getEventsById(eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async updateEvents(req, res, next) {
    try {
      const eventId = req.params.eventId
      const userId = req.userInfo.id
      const eventData = req.body
      const updatedEvents = await towerEventService.updateEvents(eventId, userId, eventData)
      res.send(updatedEvents)
    } catch (error) {
      next(error)
    }
  }

  async archiveEvent(req, res, next) {
    try {
      const eventId = req.params.eventId
      const userId = req.userInfo.id
      const event = await towerEventService.archiveEvent(eventId, userId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getEventTicketsById(req, res, next) {
    try {
      const eventId = req.params.eventId
      const tickets = await ticketService.getEventTicketsById(eventId)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

}