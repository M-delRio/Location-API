import supertest from "supertest";
import app from "../server";
import mongoose from "mongoose";
import Event from "../models/Event";

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
    const fetchedEvent: any = await Event.findOne(
      { "start": new Date("2017-10-01T23:19:58.178000+02:00") }
    );

    const res = await request
      .get(`/graphql?query={event(id:"${String(fetchedEvent._id)}"){_id}}`)

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
    const expectedResponse: { errors: { message: string, locations: { line: number, column: number }[] }[] } = {
      "errors": [
        {
          "message": "Cannot query field \"_idee\" on type \"Event\". Did you mean \"_id\" or \"mode\"?",
          "locations": [
            {
              "line": 1,
              "column": 39
            }
          ]
        }
      ]
    }

    const res = await request
      .get(`/graphql?query={event(id:"5f2b94ce639af760fb9fdc69"){_idee}}`)

    expect(res.body).toEqual(expectedResponse);
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
    const expectedBody: { data: { momentsByEvent: { start: string, end: string, analysis_type: string, definition_id: string }[] } } = {
      "data": {
        "momentsByEvent": [
          {
            "start": "1506893084000",
            "end": "1506893280000",
            "analysis_type": "processed",
            "definition_id": "nearby_home"
          }
        ]
      }
    };

    const fetchedEvent: any = await Event.findOne(
      { "start": new Date("2017-10-01T23:19:58.178000+02:00") }
    );

    const res: any = await request
      .get(`/graphql?query={momentsByEvent(id:"${String(fetchedEvent._id)}"){start,end,analysis_type, definition_id}}`)

    expect(res.body).toEqual(expectedBody);
    expect(res.statusCode).toBe(200)

    done();
  });

  it("error with invalid subfield", async (done) => {
    const res = await request
      .get(`/graphql?query={momentsByEvent(idee:"5f2b94ce639af760fb9fdbf9"){_id, analysis_type, definition_id}}`)

    expect(res.statusCode).toBe(400)
    done();
  });
});

describe("query all events", () => {
  beforeAll(() => {
    mongoose.connect(uri, options)
  });

  afterAll((done) => {
    mongoose.disconnect(done);
  });

  it("valid return according to pagination", async (done) => {
    const res = await request
      .get(`/graphql?query={events(limit:1, offset: 1){_id}}`)

    expect(res.body.data.events.length).toBe(1);

    done();
  });

  it("valid return according to pagination", async (done) => {
    const res = await request
      .get(`/graphql?query={events(limit:11, offset: 1){_id}}`)

    expect(res.body.data.events.length).toBe(11);

    done();
  });
});


