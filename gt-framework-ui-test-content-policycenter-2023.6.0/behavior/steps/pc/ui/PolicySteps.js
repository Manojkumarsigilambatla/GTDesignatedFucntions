"use strict";
const { Given, When, Then } = require("@cucumber/cucumber");
import { onApp } from "../../../../ui/pages/gw/registry/onApp";
import { t } from "testcafe";

let onPCApp = new onApp("PC");

Given(/^I am a user with the Producer role$/, async function() {
  await onPCApp.navigateToApp();
  await onPCApp.loginWithRole("producer");
 
});