import db from "mongoose";

// The Moment schema.
import Moment from "../../../models/Moment";

export default {
  Query: {
    // moment: (root: any, args: any) => {
    //   return new Promise((resolve, reject) => {
    //     Moment.findOne(args).exec((err, res) => {
    //       err ? reject(err) : resolve(res);
    //     });
    //   });
    // },
    moments: async () => {
      try {

        console.log(await db.connection.db);

        console.log('hi');

        const momentsFetched = await Moment.find({})
        // const momentsFetched = await Moment.findOne({ analysis_type: "processed" })

        console.log(momentsFetched);

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

      // return new Promise((resolve, reject) => {
      //   Moment.find({})
      //     .populate()
      //     .exec((err, res) => {
      //       err ? reject(err) : resolve(res);
      //     });
      // });
    }
  }
}