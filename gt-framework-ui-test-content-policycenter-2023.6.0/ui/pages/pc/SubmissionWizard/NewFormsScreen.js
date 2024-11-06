'use strict';
import { PcfComponent, PcfListView } from '@gtui/gt-ui-framework';

export class NewFormsScreen {
    constructor() {
        this.formsScreen = PcfComponent("#SubmissionWizard-Forms");
        this.formsDetailViewListView = PcfListView("#SubmissionWizard-FormsScreen-FormsDV-FormsLV");
        this.formsLVFirstRow = PcfComponent("#SubmissionWizard-FormsScreen-FormsDV-FormsLV-0-0");
    }

}