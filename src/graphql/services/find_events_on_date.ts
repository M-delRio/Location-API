import Event from "../../models/Event";

const findEventsOnDate = async (obj: any, args: { date: string, timezone: string | null }) => {
  let timeZone = "+00:00";

  if (args.timezone) {
    timeZone = args.timezone;
  }

  const startTime: string = args.date + "T00:00:00" + timeZone;
  const endTime: string = args.date + "T23:59:59.999" + timeZone;

  try {
    const fetchedEvents = await Event.find({
      start: {
        $gte: startTime
      },
      end: {
        $lt: endTime
      }
    })

    return fetchedEvents;
  } catch (error) {
    console.log(error);
  }
}

export default findEventsOnDate;