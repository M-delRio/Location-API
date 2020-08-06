// The Event schema.
import Event from "../../../models/Event";

export default {
  Query: {
    event: async (obj: any, args: { id: string }) => {
      try {
        const fetchedEvent = await Event.findById({ "_id": args.id });
        return fetchedEvent;
      } catch (error) {
        console.log(error);
      }
    }

  }
}