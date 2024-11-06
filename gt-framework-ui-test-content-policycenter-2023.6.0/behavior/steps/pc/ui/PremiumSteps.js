"use strict";
const { Given, When, Then } = require("@cucumber/cucumber");
import { SubmissionScenario } from "../../../../ui/actions/pc/scenarios/SubmissionScenario.js";
import { t } from "testcafe";
import world from "../../../../ui/util/pc/world.js";

let submissionScenario = new SubmissionScenario();

Then(/^a premium should exist for the vehicle$/, async function(t) {
  await submissionScenario.checkPremiumPolicyExist(world.vehicleVin, t);
});
