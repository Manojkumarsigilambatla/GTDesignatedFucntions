import { AccountTabBar_Ext } from "../../../pages/pc/Account/AccountTabBar_Ext";
import { NewAccount } from "../../../pages/gw/generated/policycenter/pages/account/NewAccount";
import { NewPersonAccountScreen } from "../../../pages/pc/Account/NewPersonAccountScreen";
import { Summary } from "../../../pages/gw/generated/policycenter/pages/account/Summary";
import {PCUtil} from '../../../util/pc/PCUtil';
// Added this
import { OrganizationSearchPopup } from "../../../pages/gw/generated/policycenter/pages/popup/Organization/OrganizationSearchPopup";

import { t, Selector } from "testcafe";
import world from "../../../util/pc/world.js";

const accountTabBar_Ext = new AccountTabBar_Ext();
const newAccount = new NewAccount();
const newPersonAccountScreen = new NewPersonAccountScreen();
const summary = new Summary();
const organization = new OrganizationSearchPopup();
const organizationRandom = new Selector("#OrganizationSearchPopup-OrganizationSearchPopupScreen-OrganizationSearchResultsLV-0-_Select > div");
const pcUtil = new PCUtil()

export class AccountScenario {
    constructor() {}

    async createPersonalAccount() {
        await accountTabBar_Ext.tabBarAccountTab.click();
        !await accountTabBar_Ext.tabBarAccountTab.component.hasClass('gw-hasOpenSubMenu') && await t.click(accountTabBar_Ext.tabBarAccountTab.component.find('div.gw-action--expand-button'));
        await accountTabBar_Ext.accountTabAccountTab_NewAccount.click();
        await newAccount.newAccountNewAccountScreenNewAccountSearchDVGlobalPersonNameInputSetFirstName.setValue("Ray");
        await newAccount.newAccountNewAccountScreenNewAccountSearchDVGlobalPersonNameInputSetLastName.setValue(pcUtil.getRandomizedString("Newton"));
        await newAccount.newAccountNewAccountScreenNewAccountSearchDVSearchAndResetInputSetSearchLinksInputSetSearch.click();

        //click new account person button
        await newAccount.newAccountScreenNewAccountButton.click();
        await newAccount.newAccountButtonNewAccount_Person.click();

        //Enter account details
        await newPersonAccountScreen.addressLine1.setValue("1234 Hillsdale Blvd");
        await newPersonAccountScreen.city.setValue("Foster City")
        await newPersonAccountScreen.addressType.click();
        await newPersonAccountScreen.addressType.selectOptionByLabel("Home");
        await newPersonAccountScreen.producerCode.selectFirstOptionWithValue();
        //Added this part for organization workflow
        await newPersonAccountScreen.organizationButton.click();
        await organization.organizationSearchPopupOrganizationSearchPopupScreenOrganizationSearchDVGlobalContactNameInputSetName.setValue("a");
        await organization.organizationSearchPopupOrganizationSearchPopupScreenOrganizationSearchDVSearchAndResetInputSetSearchLinksInputSetSearch.click();
        await t.click(organizationRandom);
        await this.clickUpdateButton()
        world.accountNumber = await summary.accountDetailsDetailViewTile_DVAccountNumber.getValue();
    }

    async openAccount() {
        await accountTabBar_Ext.tabBarAccountTab.click();
        !await accountTabBar_Ext.tabBarAccountTab.component.hasClass('gw-hasOpenSubMenu') && await t.click(accountTabBar_Ext.tabBarAccountTab.component.find('div.gw-action--expand-button'));
        await accountTabBar_Ext.accountTabAccountTab_AccountNumberSearchItem_ext.setValue(world.accountNumber.toString());
        await accountTabBar_Ext.tabBarAccountTab_AccounNumberSearchItem_Button.click();
    }

    async checkAccountOverview() {
        const accountStatus = await summary.accountDetailsDetailViewTile_DVAccountStatus.getValue();
        await t.expect(accountStatus).notEql(null);
    }

    async clickUpdateButton() {
        if (await newPersonAccountScreen.forceDupCheckUpdateButton.component.visible) {
            await newPersonAccountScreen.forceDupCheckUpdateButton.click();
        }
        else {
            await newPersonAccountScreen.updateButton.click();
        }
    }
}