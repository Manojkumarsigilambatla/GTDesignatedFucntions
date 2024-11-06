'use strict';
import { PcfTextInput } from '@gtui/gt-ui-framework';
import { PcfSelectInput } from '@gtui/gt-ui-framework';
import { PcfButton } from '@gtui/gt-ui-framework';


export class NewPersonAccountScreen {
    constructor() {
        this.addressLine1 = PcfTextInput("#CreateAccount-CreateAccountScreen-CreateAccountDV-AddressInputSet-globalAddressContainer-GlobalAddressInputSet-AddressLine1");
        this.city = PcfTextInput("#CreateAccount-CreateAccountScreen-CreateAccountDV-AddressInputSet-globalAddressContainer-GlobalAddressInputSet-City");
        this.addressType = PcfSelectInput("#CreateAccount-CreateAccountScreen-CreateAccountDV-AddressType");
        this.producerCode = PcfSelectInput("#CreateAccount-CreateAccountScreen-CreateAccountDV-ProducerSelectionInputSet-ProducerCode");
        this.organizationButton = PcfButton("#CreateAccount-CreateAccountScreen-CreateAccountDV-ProducerSelectionInputSet-Producer-SelectOrganization");
        this.updateButton = PcfButton("#CreateAccount-CreateAccountScreen-Update");
        this.forceDupCheckUpdateButton = PcfButton("#CreateAccount-CreateAccountScreen-ForceDupCheckUpdate ");
    }

}