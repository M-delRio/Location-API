import { mergeResolvers } from "@graphql-tools/merge";
import Moment from "./Moment";

const resolvers = [Moment];

export default mergeResolvers(resolvers);