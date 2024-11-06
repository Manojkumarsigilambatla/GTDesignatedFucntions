"use strict";
const { Given, When, Then } = require("@cucumber/cucumber");
import { SubmissionScenario } from "../../../../ui/actions/pc/scenarios/SubmissionScenario.js";
import { t } from "testcafe";

let submissionScenario = new SubmissionScenario();

Then(/^forms should be inferred$/, async function() {
  await submissionScenario.checkFormsInferred();
});

Then(/^no forms should be inferred$/, async function() {
  await submissionScenario.checkNoFormsInferred();
});