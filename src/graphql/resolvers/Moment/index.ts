// The Moment schema.
import Moment from "../../../models/Moment";

export default {
  Query: {
    moments: async () => {
      try {

        const momentsFetched = await Moment.find({})

        return {}
        // return momentsFetched.map((moment: { _id: number, start: string, end: string, analysis_type: string, definition_id: string }) => {
        //   // momentsFetched.map(moment => {

        //   return {
        //     _id: moment._id,
        //     start: moment.start,
        //     end: moment.end,
        //     analysis_type: moment.analysis_type,
        //     definition_id: moment.definition_id,
        //   }
        // });
      } catch (error) {
        throw error
      }
    }
  }
}