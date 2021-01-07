const chai = require("chai");
const chaiHttp = require("chai-http");

const { NOTACCEPTED, BADREQUEST, CODE, OK } = require("../api/constants");
const app = require("../app");

const taskUrl = "/tasks";
chai.use(chaiHttp);
const { expect, request } = chai;

describe("Get Task ", () => {
  it("should return 406 for endpoint not found", async () => {
    const response = await request(app).get("/not-found");
    expect(response.statusCode).to.equal(NOTACCEPTED);
  });

  it("should return 400 for empty request body", async () => {
    const response = await request(app).post(taskUrl);

    expect(response.statusCode).to.equal(BADREQUEST);
    expect(response.body.code).to.equal(CODE.FAILURE);
    expect(response.body.records.length).to.equal(0);
  });

  it("should return 400 for request with invalid start date and end date", async () => {
    const response = await request(app)
      .post(taskUrl)
      .send({ startDate: "invalid", endDate: "invalid" });

    expect(response.statusCode).to.equal(BADREQUEST);
    expect(response.body.code).to.equal(CODE.FAILURE);
    expect(response.body.records.length).to.equal(0);
  });

  it("should return 400 if provided min count is greater than max count", async () => {
    const response = await request(app)
      .post(taskUrl)
      .send({ minCount: 456, maxCount: 34 });

    expect(response.statusCode).to.equal(BADREQUEST);
    expect(response.body.code).to.equal(CODE.FAILURE);
    expect(response.body.records.length).to.equal(0);
    expect(response.body.message.split(", ")).to.contain(
      "min count should not be greater than max count"
    );
  });

  it("should return 200 if the request is valid", async () => {
    const response = await request(app).post(taskUrl).send({
      minCount: 45,
      maxCount: 348,
      startDate: "2016/02/02",
      endDate: "2018/02/01",
    });

    expect(response.statusCode).to.equal(OK);
    expect(response.body.code).to.equal(CODE.SUCCESS);
    expect(response.body.records.length).to.be.greaterThan(1);
  });
});
