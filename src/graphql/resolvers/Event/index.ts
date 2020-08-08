import findEvent from "../../services/find_event"
import findEventsOnDate from "../../services/find_events_on_date"
// The Event schema

export default {
  Query: {
    event: findEvent,

    eventsOnDate: findEventsOnDate
    // event: async (obj: any, args: { id: string }) => {
    //   try {
    //     const fetchedEvent = await Event.findById({ "_id": args.id });
    //     return fetchedEvent;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

  }
}