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

    const res = await request
      .get(`/graphql?query={event(id:"5f2b94ce639af760fb9fdc69"){_id}}`)

    expect(res.statusCode).toBe(200)

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
    // const expectedResponse: { errors: { message: string, locations: { line: number, column: number }[] }[] } = {
    //   "errors": [
    //     {
    //       "message": "Cannot query field \"_idee\" on type \"Event\". Did you mean \"_id\" or \"mode\"?",
    //       "locations": [
    //         {
    //           "line": 1,
    //           "column": 39
    //         }
    //       ]
    //     }
    //   ]
    // }

    const res = await request
      .get(`/graphql?query={event(id:"5f2b94ce639af760fb9fdc69"){_idee}}`)

    // expect(res.body).toEqual(expectedResponse);
    expect(res.statusCode).toBe(400)
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

    expect(res.statusCode).toBe(200)

    done();
  });

  it("response with invalid subfield", async (done) => {
    const res = await request
      .get(`/graphql?query={eventsOnDate(date:"2017-10-01", timezone: "%2B02:00"){typee}}`)

    expect(res.statusCode).toBe(400)
    done();
  });
});

describe("query events that are related to a moment", () => {
  beforeAll(() => {
    mongoose.connect(uri, options)
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });

  it("response with existing object id", async (done) => {
    const expectedBody: { data: { momentsByEvent: { _id: string, analysis_type: string, definition_id: string }[] } } = {
      "data": {
        "momentsByEvent": [
          {
            "_id": "5f2b94cd639af760fb9fda13",
            "analysis_type": "processed",
            "definition_id": "nearby_work"
          }
        ]
      }
    };

    const res = await request
      .get(`/graphql?query={momentsByEvent(id:"5f2b94ce639af760fb9fdbf9"){_id, analysis_type, definition_id}}`)

    expect(res.body).toEqual(expectedBody);

    expect(res.statusCode).toBe(200)

    done();
  });

  it("error with invalid subfield", async (done) => {
    // const expectedResponse: { errors: any } = {
    //   "errors": [
    //     {
    //       "message": "Cannot query field \"_idee\" on type \"Moment\". Did you mean \"_id\"?",
    //       "locations": [
    //         {
    //           "line": 3,
    //           "column": 5
    //         }
    //       ]
    //     }
    //   ]
    // }

    const res = await request
      .get(`/graphql?query={momentsByEvent(idee:"5f2b94ce639af760fb9fdbf9"){_id, analysis_type, definition_id}}`)

    // expect(res.body).toEqual(expectedResponse);
    expect(res.statusCode).toBe(400)
    done();
  });
});


