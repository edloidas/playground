import assert from "assert/strict";
import test, { describe } from "node:test";
import { add } from "./index";

describe("add()", () => {
  test("add two numbers", () => {
    assert.strictEqual(add(1, 2), 3);
  });
});
