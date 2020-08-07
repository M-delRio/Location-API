import Event from "../../models/Event";

const findEvent = async (obj: any, args: { id: string }) => {
  try {
    const fetchedEvent = await Event.findById({ "_id": args.id });
    return fetchedEvent;
  } catch (error) {
    console.log(error);
  }
}

export default findEvent;