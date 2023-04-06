const {
  getLicenseValidity,
  transformArryToString,
} = require("../../src/helpers/utils");
const { expect } = require("chai");
const it = require("ava").default;
const sinon = require("sinon");

it("transformArryToString", (t) => {
  const inputDelimiter = ",";
  const inputArray = ["a", "b", "c", "d"];
  const expectedOutput = "a,b,c,d";
  const actualResult = transformArryToString(inputDelimiter, inputArray);

  // Assertion
  expect(actualResult).to.be.equal(expectedOutput);

  t.pass();
});

// hint use FakeTimer
it(`getLicenseValidity returns "valid" when the date is before 2026`, (t) => {
  const expectedOutput = "valid";
  const actualResult = getLicenseValidity();

  expect(actualResult).to.be.equal(expectedOutput);

  t.pass();
});

it(`getLicenseValidity returns "invalid" when the date is after 2026`, (t) => {
  const fakeDate = new Date("2027-03-22T00:00:00.000Z").getTime();
  const clock = sinon.useFakeTimers(fakeDate);
  const expectedOutput = "invalid";
  const actualResult = getLicenseValidity();

  clock.restore();

  expect(actualResult).to.be.equal(expectedOutput);

  t.pass();
});
