import { mergeTypeDefs } from '@graphql-tools/merge';
import Moment from "./Moment/";

const typeDefs = [Moment];

export default mergeTypeDefs(typeDefs);