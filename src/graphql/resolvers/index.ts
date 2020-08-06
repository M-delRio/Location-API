import { mergeResolvers } from "@graphql-tools/merge";
import Moment from "./Moment";
import Event from "./Event";

const resolvers = [Moment, Event];

export default mergeResolvers(resolvers);