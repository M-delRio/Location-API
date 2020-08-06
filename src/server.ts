import { graphqlHTTP } from "express-graphql";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
// import router from "./routes";

import schema from "./graphql";

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

// app.get("/", (req, res) => {
//   res.send(`Number to English is waiting for your numbers.`);
// });

// app.use("/v1", router);

export default app;
