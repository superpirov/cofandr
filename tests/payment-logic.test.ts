import assert from "node:assert/strict";
import { test } from "node:test";
import {
  addMonths,
  amountMatches,
  mapProviderStatus,
  metadataOrderMatches,
  toProviderAmount,
} from "../src/lib/payment-logic.ts";

test("amount is sent to the provider with two decimals", () => {
  assert.equal(toProviderAmount(9900), "9900.00");
  assert.equal(toProviderAmount(19900.5), "19900.50");
});

test("provider amount must match the server-side order snapshot", () => {
  assert.equal(amountMatches(19900, "RUB", "19900.00", "RUB"), true);
  assert.equal(amountMatches(19900, "RUB", "9900.00", "RUB"), false);
  assert.equal(amountMatches(19900, "RUB", "19900.00", "USD"), false);
  assert.equal(amountMatches(19900, "RUB", "not-a-number", "RUB"), false);
});

test("provider statuses map to order statuses", () => {
  assert.equal(mapProviderStatus("succeeded"), "SUCCEEDED");
  assert.equal(mapProviderStatus("canceled"), "CANCELED");
  assert.equal(mapProviderStatus("pending"), "PENDING");
  assert.equal(mapProviderStatus("waiting_for_capture"), "PENDING");
});

test("metadata must point to the same order", () => {
  assert.equal(metadataOrderMatches({ orderId: "abc" }, "abc"), true);
  assert.equal(metadataOrderMatches({ orderId: "other" }, "abc"), false);
  assert.equal(metadataOrderMatches(undefined, "abc"), false);
});

test("entitlement expiry is calculated in whole months", () => {
  const start = new Date("2026-01-15T12:00:00.000Z");
  assert.equal(addMonths(start, 6).toISOString(), "2026-07-15T12:00:00.000Z");
  assert.equal(addMonths(start, 12).toISOString(), "2027-01-15T12:00:00.000Z");
});
