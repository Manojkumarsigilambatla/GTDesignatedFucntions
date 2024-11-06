"use strict";
const { Given, When, Then } = require("@cucumber/cucumber");
import { SubmissionScenario } from "../../../../ui/actions/pc/scenarios/SubmissionScenario.js";
import { t } from "testcafe";

let submissionScenario = new SubmissionScenario();

When(/^I quote the submission$/, async function() {
  await submissionScenario.quoteSubmission();
});

When(/^I bind the submission$/, async function() {
  await submissionScenario.bindSubmission();
});

When(/^I issue the submission$/, async function() {
  await submissionScenario.issueSubmission();
});

When(/^the submission should be quoted$/, async function() {
  await submissionScenario.checkJobStatus("Submission (Quoted)");
});