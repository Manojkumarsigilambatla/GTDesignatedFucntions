"use strict";
const { Given, When, Then } = require("@cucumber/cucumber");
import { AccountScenario } from "../../../../ui/actions/pc/scenarios/AccountScenario.js";

let accountScenario = new AccountScenario();

Given(/^a Personal account$/, async function() {
  await accountScenario.createPersonalAccount();
});

Given(/^I need to quickly understand an account I haven’t reviewed$/, async function() {
  await accountScenario.openAccount();
});

Then(/^I can find an overview of the account$/, async function() {
  await accountScenario.checkAccountOverview();
});