import Event from "../../models/Event";

const findAllEvents = async (obj: any, args: { limit: number, offset: number }) => {

  //set default value for limit
  if (args.limit === undefined) {
    args.limit = 5;
  }

  // set default value for offset
  if (args.offset == undefined) {
    args.offset = 1;
  }

  try {
    const fetchedEvents = await Event.find({})
      .sort({ start: 1 })
      .skip(args.offset)
      .limit(args.limit)


    return fetchedEvents;
  } catch (error) {
    console.log(error);
  }
}

export default findAllEvents;