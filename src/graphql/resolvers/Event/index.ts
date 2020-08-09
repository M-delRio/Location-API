import findEvent from "../../services/find_event"
import findEventsOnDate from "../../services/find_events_on_date"
import findAllEvents from "../../services/find_all_events"

export default {
  Query: {
    event: findEvent,
    events: findAllEvents,
    eventsOnDate: findEventsOnDate
  }
}