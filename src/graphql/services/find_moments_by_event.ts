import Moment from "../../models/Moment";
import findEvent from "./find_event"

// const findEvent = async (obj: any, args: { id: string }) => {

const findMomentsByDate = async (obj: any, args: { id: string }) => {
  // find the event by id
  const targetEvent: any = await findEvent({}, { id: args.id });

  // console.log(targetEvent);

  const startTime: string = targetEvent.start;
  const endTime: string = targetEvent.end;

  console.log(startTime);
  console.log(endTime);

  try {
    const fetchedMoments = await Moment.find({
      start: {
        $gte: startTime
      },
      end: {
        $lt: endTime
      }
    })
    // console.log(fetchedMoments);

    return fetchedMoments;
  } catch (error) {
    console.log(error);
  }
}

export default findMomentsByDate;

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