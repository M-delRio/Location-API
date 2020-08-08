import Event from "../../models/Event";

// items.find({
//   created_at: {
//     $gte: "Mon May 30 18:47:00 +0000 2015",
//     $lt: "Sun May 30 20:40:36 +0000 2010"
//   }
// })

// .find({$and:[{startDate:{$lte:new Date()}},{endDate:{$gte:new Date()}}]})

// YYYY-MM-DD

// YYYY-mm-ddTHH:MM:ssZ

// 2017-10-01T23:28:00.000+02:00

// +hh:mm or -hh:mm

const findEventsOnDate = async (obj: any, args: { date: string, timezone: string | null }) => {
  let timeZone = "+00:00";

  if (args.timezone) {
    timeZone = args.timezone;
  }

  const startTime: string = args.date + "T00:00:00" + timeZone;
  const endTime: string = args.date + "T23:59:59.999" + timeZone;

  // console.log(args.timezone);

  // console.log(startTime);
  // console.log(endTime);
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