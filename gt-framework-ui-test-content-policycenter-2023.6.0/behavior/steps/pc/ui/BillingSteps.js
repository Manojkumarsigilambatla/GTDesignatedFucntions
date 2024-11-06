"use strict";
const { Given, When, Then } = require("@cucumber/cucumber");
import { SubmissionScenario } from "../../../../ui/actions/pc/scenarios/SubmissionScenario.js";
import { t } from "testcafe";

let submissionScenario = new SubmissionScenario();

Then(/^a billing event is created$/, async function() {
  await t.expect(await submissionScenario.getTotalBilled()).gt(0);
});