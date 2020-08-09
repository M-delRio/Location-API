import Event from "../../models/Event";

const findAllEvents = async (obj: any, args: { id: string }) => {
  try {
    const fetchedEvents = await Event.find({});

    return fetchedEvents;
  } catch (error) {
    console.log(error);
  }
}

export default findAllEvents;