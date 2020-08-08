// The Moment schema.
import Moment from "../../../models/Moment";

export default {
  Query: {
    moments: async () => {
      momentsByEvent: findMomentsByEvent;
    }
  }
}