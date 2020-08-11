import { graphqlHTTP } from "express-graphql";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

import schema from "./graphql";
import dotenv from "dotenv"

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

export default app;
