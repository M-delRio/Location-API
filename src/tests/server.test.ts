import supertest from "supertest";
import app from "../server";
import mongoose from "mongoose";

const uri = "mongodb://127.0.0.1:27017/location_api";
const request = supertest(app);
const options = { useNewUrlParser: true, useUnifiedTopology: true }

describe("query an ​event​ by a unique identifier", () => {
  beforeAll(() => {
    mongoose.connect(uri, options)
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });

  it("response with valid id query arg", async (done) => {
    // const requestQuery: string = "" 

    const res = await request
      .get(`/graphql?query={event(id:"5f2b94ce639af760fb9fdc69"){_id}}`)

    // .query({query:
    //   {
    //     event(id: "5f2b94ce639af760fb9fdc69") {
    //       _id
    //       type
    //   }
    // }})

    // expect(body.status).toBe("ok");
    expect(res.statusCode).toEqual(200)

    done();
  });

  it("response with non existant id query arg", async (done) => {
    const expectedBody: { data: { event: null } } = {
      "data": {
        "event": null
      }
    };

    const res = await request
      .get(`/graphql?query={event(id:"z"){_id}}`)

    expect(res.body).toEqual(expectedBody);
    expect(res.statusCode).toBe(200)

    done();
  });

  it("error with invalid subfield", async (done) => {
    // const expectedResponse: string = `{"errors": [{"locations": [{"column": 39, "line": 1}], "message": "Cannot query field \"_idee\" on type \"Event\". Did you mean \"_id\" or \"mode\"?"}]}`

    const res = await request
      .get(`/graphql?query={event(id:"5f2b94ce639af760fb9fdc69"){_idee}}`)

    // expect(res.body).toEqual(expectedResponse);
    expect(res.statusCode).toEqual(400)
    done();
  });
});

describe("query events that occurred on a specific date", () => {
  beforeAll(() => {
    mongoose.connect(uri, options)
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });

  it("response with valid date query arg", async (done) => {
    const res = await request
      .get(`/graphql?query={eventsOnDate(date:"2017-10-01", timezone: "%2B02:00"){type}}`)

    expect(res.statusCode).toEqual(200)

    done();
  });

  it("response with invalid subfield", async (done) => {
    const res = await request
      .get(`/graphql?query={eventsOnDate(date:"2017-10-01", timezone: "%2B02:00"){typee}}`)

    expect(res.statusCode).toEqual(400)
    done();
  });
});


