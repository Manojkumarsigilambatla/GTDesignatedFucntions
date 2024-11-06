"use strict";
const { Given, When, Then } = require("@cucumber/cucumber");
import { SubmissionScenario } from "../../../../ui/actions/pc/scenarios/SubmissionScenario.js";

let submissionScenario = new SubmissionScenario();

Given(/^a Personal Auto submission$/, async function() {
  await submissionScenario.createPASubmission();
});

Given(/^a Personal Auto submission with a vehicle$/, async function() {
  await submissionScenario.createPASubmission();
});

Given(/^a Quoted Personal Auto submission$/, async function() {
  await submissionScenario.createPASubmission();
  await submissionScenario.quoteSubmission();
});