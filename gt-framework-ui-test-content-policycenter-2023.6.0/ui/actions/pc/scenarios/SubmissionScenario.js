import { AccountMenuActions } from "../../../pages/gw/generated/policycenter/pages/navigation/menuActions/AccountMenuActions";
import { NewSubmission } from "../../../pages/gw/generated/policycenter/pages/policy/NewSubmission";
import { NextSubmissionWizard } from "../../../pages/gw/generated/policycenter/pages/navigation/submissionWizard/NextSubmissionWizard";
import { PersonalAuto } from "../../../pages/gw/generated/policycenter/pages/lOBWizardStepGroup/PersonalAuto";
import { DriverDetailRole } from "../../../pages/pc/SubmissionWizard/DriverDetailsRole";
import { AddExistingDriver } from "../../../pages/pc/SubmissionWizard/AddExistingDriver";
import { AddVehicle } from "../../../pages/pc/SubmissionWizard/AddVehicle";
import { PolicyReviewScreen } from "../../../pages/pc/SubmissionWizard/PolicyReviewScreen"
import { QuoteScreen } from "../../../pages/pc/SubmissionWizard/QuoteScreen"
import { OfferingScreen } from "../../../pages/pc/SubmissionWizard/OfferingScreen";
import { PrequalificationScreen } from "../../../pages/pc/SubmissionWizard/PrequalificationScreen";
import { PolicyMenuLinks } from "../../../pages/gw/generated/policycenter/pages/navigation/menuLinks/PolicyMenuLinks";
import { Billing } from "../../../pages/gw/generated/policycenter/pages/policy/Billing";
import { NewFormsScreen } from "../../../pages/pc/SubmissionWizard/NewFormsScreen";
import { PCHelper } from "../../../util/pc/PCHelper";
import world from "../../../util/pc/world.js";
import { retryActionUntil } from "@gtui/gt-ui-framework";
import { t, Selector } from "testcafe";
//Imports to support Accessibility Scanning
import { AxeScanWrapper } from "@gtui/gt-ui-framework"

const accountMenuActions = new AccountMenuActions();
const newSubmission = new NewSubmission();
const nextSubmissionWizard = new NextSubmissionWizard();
const personalAuto = new PersonalAuto();
const driverDetailRole = new DriverDetailRole();
const addExistingDriver = new AddExistingDriver();
const addVehicle = new AddVehicle();
const policyReviewScreen = new PolicyReviewScreen();
const quoteScreen = new QuoteScreen();
const offeringScreen = new OfferingScreen();
const prequalificationScreen = new PrequalificationScreen();
const policyMenuLinks = new PolicyMenuLinks();
const billing = new Billing();
const newFormsScreen = new NewFormsScreen();
const pcHelper = new PCHelper();

export class SubmissionScenario {
    constructor() {}
  
    async createPASubmission() {
        //click new submission
        await accountMenuActions.accountFileAccountFileMenuActions.click();
        await accountMenuActions.accountFileMenuActions_CreateAccountFileMenuActions_NewSubmission.click();

        //select Personal Auto
        let productNameCell = newSubmission.productOffersDVProductSelectionLV.component.find('td[id$=-Name_Cell]').withExactText("Personal Auto");
        let selectButton = productNameCell.sibling('td[id$=-Select]').find('div.gw-LinkWidget[id$=-addSubmission]');
        await t.click(selectButton);
        //await newSubmissionScreen.selectProduct("Personal Auto");

        //Click next on offerings page
        await offeringScreen.offeringSelection.selectOptionByLabel("Basic Program");
        await nextSubmissionWizard.submissionWizardNext.click();

       //click next on pre-qual questions
        await prequalificationScreen.currentlyInsuredQuestion.selectOptionByLabel('Yes');
        await nextSubmissionWizard.submissionWizardNext.click();

        //click next on Policy Info
        await nextSubmissionWizard.submissionWizardNext.click();

        //add driver
        await t
            .click(addExistingDriver.addDriverButton.component)
            .hover(addExistingDriver.addExistingDriver.component)
            .click(addExistingDriver.firstExistingDriver.component);
        await personalAuto.submissionWizardLOBWizardStepGroupLineWizardStepSetPADriversScreenPADriversPanelSetDriversListDetailPanelDriverDetailsCVPolicyContactDetailsDVPolicyContactRoleNameInputSetDateOfBirth.setValue("11131990");
        await t.pressKey('tab'); // trigger post on change
        await personalAuto.submissionWizardLOBWizardStepGroupLineWizardStepSetPADriversScreenPADriversPanelSetDriversListDetailPanelDriverDetailsCVPolicyContactDetailsDVLicenseInputSetLicenseNumber.setValue("7JDX543");
        await personalAuto.submissionWizardLOBWizardStepGroupLineWizardStepSetPADriversScreenPADriversPanelSetDriversListDetailPanelDriverDetailsCVPolicyContactDetailsDVLicenseInputSetLicenseState.selectOptionByValue('CA');

        //update driver role
        await personalAuto.driverDetailsCVRolesCardTab.click();
        await driverDetailRole.yearFirstLicensed.setValue("2008");
        await driverDetailRole.numOfAccident_AccountLevel.selectOptionByValue("0");
        await driverDetailRole.numOfAccident_PolicyLevel.selectOptionByValue("0");
        await driverDetailRole.numOfViolation_PolicyLevel.selectOptionByValue("0");
        await driverDetailRole.numOfViolation_AccountLevel.selectOptionByValue("0");
        await nextSubmissionWizard.submissionWizardNext.click();

        //add vehicle
        await personalAuto.vehiclesListDetailPanel_tbAdd.click();
        await personalAuto.personalAuto_VehicleDVVin_DV.setValue(world.vehicleVin);
        await t.pressKey('tab'); // trigger post on change
        await personalAuto.personalAuto_VehicleDVLicenseState_DV.selectOptionByValue('CA');
        await personalAuto.personalAuto_VehicleDVCostNew_DV.setValue("25000.00")
        await t.pressKey('tab'); // trigger post on change
        //select first driver
        await t
            .click(addVehicle.addDriverToVehicleButton.component)
            .click(addVehicle.firstDriver.component);
        await nextSubmissionWizard.submissionWizardNext.click();

        //click next on PA Coverages
        await nextSubmissionWizard.submissionWizardNext.click();

        //click next on Risk Analysis
        await nextSubmissionWizard.submissionWizardNext.click();
    }

    async quoteSubmission() {
        await policyReviewScreen.quoteButton.click();
    }

    async checkJobStatus(jobStatus) {
        await t.expect(quoteScreen.jobLabel.component.textContent).contains(jobStatus);
    }

    async checkPremiumPolicyExist(vehicleVin, t) {
        //Accessibility Scanning 
        let quoteScreen = AxeScanWrapper(QuoteScreen,t);
        const premiumAmount = await quoteScreen.totalPremium.component.textContent;
        console.log("total premium = " + premiumAmount)
        await t.expect(parseInt(premiumAmount.replace(/\D/g,''))).gt(0);
        
    }

    async bindSubmission() {
        await quoteScreen.bindOptionsButton.click();
        await quoteScreen.bindOnlyButton.click();
        await quoteScreen.viewSubmissionLink.click();
    }

    async getTotalBilled() {
        let policyNumber = await pcHelper.getPolicyNumber()
        // Retry added because it sometimes takes a little time before the billing screen is updated
        await retryActionUntil(
            async () => {
                await pcHelper.goToPolicy(policyNumber)
                await policyMenuLinks.menuLinksPolicyFile_PolicyFile_Billing.click();
            },
            async () => {
                return parseInt((await billing.policy_BillingScreenTotalCharges.getValue()).replace(/\D/g,''));
            },
            'Total Charges is empty on Billing Screen',
            { maxRetry: 5, interval: 3000, initialDelay: 0 }
        );
        return parseInt((await billing.policy_BillingScreenTotalCharges.getValue()).replace(/\D/g,''));
    }

    async issueSubmission() {
        await quoteScreen.bindOptionsButton.click();
        await quoteScreen.issuePolicyButton.click();
        await quoteScreen.viewSubmissionLink.click();
    }

    async checkFormsInferred() {
        await newFormsScreen.formsScreen.click();
        const rowFilter = "not(.gw-header-row):not(.gw-footer-row):not(.gw-isSmartHeader)";
        await t.expect(newFormsScreen.formsDetailViewListView.component.find("tr:" + rowFilter).count).gt(0);
    }

    async checkNoFormsInferred() {
        await newFormsScreen.formsScreen.click();
        const formsRows = await newFormsScreen.formsDetailViewListView.rowCount();
        console.log("# of forms row = " + formsRows)
        await t.expect(await newFormsScreen.formsDetailViewListView.rowCount()).eql(0);
    }
}