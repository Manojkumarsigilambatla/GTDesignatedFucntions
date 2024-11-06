'use strict';
const { Given, When, Then } = require('@cucumber/cucumber');
import { onApp } from "../../../../ui/pages/gw/registry/onApp";
import { ContactScenario } from "../../../../ui/actions/pc/scenarios/ContactScenario";
import world from "../../../../ui/util/pc/world.js";

let onPCApp = new onApp("PC");
let contactScenario = new ContactScenario();

Given(/^a known (.*)$/, async function (t, stepArguments) {
    world.contactType = stepArguments[0];
    await onPCApp.navigateToApp();
    await onPCApp.loginWithDefaultUser();
    await contactScenario.createNewContact();
});

When(/^I search for that contact with their (.*)$/, async function (t, stepArguments) {
    let searchCriteria = stepArguments[0];
    await contactScenario.searchForContact(searchCriteria);
});

Then(/^the contact was found$/, async function (t) {
    await t.expect(contactScenario.checkContactSearchResult()).gt(0);
});