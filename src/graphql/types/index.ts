import { mergeTypeDefs } from '@graphql-tools/merge';
import Moment from "./Moment/";
import Event from "./Event/";

const typeDefs = [Moment, Event];

export default mergeTypeDefs(typeDefs);