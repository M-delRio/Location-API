import findEvent from "../../services/find_event"
// The Event schema
import Event from "../../../models/Event";

export default {
  Query: {
    event: findEvent

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