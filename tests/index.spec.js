const chai = require("chai");
const chaiHttp = require("chai-http");

const { NOTACCEPTED } = require("../api/constants");
const app = require("../app");

chai.use(chaiHttp);
const { expect, request } = chai;

describe("Get Task ", () => {
  it("should return 406 for endpoint not found", async () => {
    const response = await request(app).get("/not-found");
    expect(response.statusCode).to.equal(NOTACCEPTED);
  });
});
