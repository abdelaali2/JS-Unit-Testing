const logger = require("../../src/helpers/logger");
const Car = require("../../src/models/Car");
const utils = require("../../src/helpers/utils");
const { updateCar } = require("../../src/controllers/carController");
const startDB = require("../../src/helpers/startDB");
const sinon = require("sinon");
const { MongoMemoryServer } = require("mongodb-memory-server");
const it = require("ava").default;
const { expect } = require("chai");

it.before(async (t) => {
  t.context.mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = t.context.mongod.getUri("iti43-test");
  await startDB();
});

test.after(async (t) => {
  await t.context.mongod.stop({ doCleanup: true });
});

it("should update an added car", async (t) => {
  // car request body should look like
  // {
  //     title: String
  //     tags: String
  //     price: Number
  //     age: Number

  // }
  // implement your test in order to pass
  const transformedTags = "1500cc,high line,new";
  const carID = "123";
  const carBody = {
    title: "Test Car",
    tags: ["test", "car"],
    price: 10000,
    age: 2,
  };

  const carUpdate = {
    title: "Test Car",
    tags: "test,car",
    price: 10000,
    age: 3,
  };

  const request = {
    params: { id: carID },
    body: carBody,
  };

  const expectedResult = {
    params: { id: carID },
    body: carUpdate,
  };

  const stub = sinon
    .stub(utils, "transformArryToString")
    .callsFake((delimiter, array) => {
      expect(delimiter).to.be.equal(",");
      expect(array).to.be.equal(request.body.tags);
      return transformedTags;
    });
  const stubbedLogger = sinon.stub(logger, "info").callsFake(() => {});

  t.teardown(async (t) => {
    stub.restore();
  });

  const actualResult = await updateCar(request);

  const expectedValue = {
    _id: actualResult._id,
    __v: actualResult.__v,
    ...expectedResult,
  };

  t.assert(
    stubbedLogger.calledWithExactly({
      operation: "updateNewCar",
      message: `updated new car: ${carID}`,
    }),
    "Logger is not called with expected parameters"
  );

  expect(actualResult._doc).to.deep.equal(expectedValue);

  t.pass();
});
