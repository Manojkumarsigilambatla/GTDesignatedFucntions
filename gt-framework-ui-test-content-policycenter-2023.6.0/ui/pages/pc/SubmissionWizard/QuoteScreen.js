'use strict';
import { PcfButton, PcfComponent } from '@gtui/gt-ui-framework';

export class QuoteScreen {
    constructor() {
        
        this.jobLabel = PcfComponent("#SubmissionWizard-JobWizardInfoBar-JobLabel");
        this.jobNumber = PcfComponent("#SubmissionWizard-SubmissionWizard_QuoteScreen-Quote_SummaryDV-JobNumber")
        this.totalPremium = PcfComponent("#SubmissionWizard-SubmissionWizard_QuoteScreen-Quote_SummaryDV-TotalPremium");
        this.bindOptionsButton = PcfButton("#SubmissionWizard-SubmissionWizard_QuoteScreen-JobWizardToolbarButtonSet-BindOptions");
        this.bindOnlyButton = PcfButton("#SubmissionWizard-SubmissionWizard_QuoteScreen-JobWizardToolbarButtonSet-BindOptions-BindOnly");
        this.issuePolicyButton = PcfButton("#SubmissionWizard-SubmissionWizard_QuoteScreen-JobWizardToolbarButtonSet-BindOptions-BindAndIssue");
        this.viewSubmissionLink = PcfComponent("#JobComplete-JobCompleteScreen-JobCompleteDV-ViewJob");
        this.viewPolicyLink = PcfComponent("#SubmissionWizard-JobWizardInfoBar-PolicyNumber");
     
    }

}