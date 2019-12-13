import {
  resolvingPromise,
  returnTen,
  waitAWhile
} from "./someFunctionsForTesting";
import { assert, should, expect } from "chai";

describe("meteor tests", function() {
  it("package.json has correct name", async function() {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "epicenter");
  });

  if (Meteor.isClient) {
    it("client is not server", function() {
      expect(Meteor.isServer).to.equal(false);
    });
  }

  describe("promise tests", function() {
    if (Meteor.isClient) {
      it("testing promise resolves", async () => {
        const result = await resolvingPromise();
        expect(result).to.equal("promise resolved");
      });
      it("200 millisecond promise wait", async () => {
        const result = await waitAWhile();
        expect(result).to.equal("done");
      });
    }
  });

  describe("calback tests", function() {
    if (Meteor.isClient) {
      it("simple arrow function should return 10", function() {
        expect(returnTen()).to.equal(10);
      });
    }
  });

  if (Meteor.isServer) {
    it("server is not client", function() {
      expect(Meteor.isClient).to.equal(false);
    });
  }
});
