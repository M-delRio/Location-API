import Moment from "../../models/Moment";
import findEvent from "./find_event"

// const findEvent = async (obj: any, args: { id: string }) => {

const findMomentsByDate = async (obj: any, args: { id: string }) => {
  // find the event by id
  const targetEvent: any = await findEvent({}, { id: args.id });

  const startTime: string = targetEvent.start;
  const endTime: string = targetEvent.end;

  console.log(startTime, endTime);


  try {
    const fetchedMoments = await Moment.find({
      start: {
        $gte: startTime,
        $lt: endTime
      }
    })

    return fetchedMoments;
  } catch (error) {
    console.log(error);
  }
}

export default findMomentsByDate;