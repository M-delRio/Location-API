import Event from "../../models/Event";

const findEvent = async (obj: any, args: { id: string }) => {
  try {
    const fetchedEvent = await Event.findById({ "_id": args.id });

    // // if query return isn't null map _id key to id key
    // if (fetchedEvent) {
    //   fetchedEvent.id = fetchedEvent._id
    // }

    return fetchedEvent;
  } catch (error) {
    console.log(error);
  }
}

export default findEvent;