import {ContactSearch} from "../../../pages/gw/generated/policycenter/pages/search/ContactSearch"
import {NewContact} from "../../../pages/gw/generated/policycenter/pages/contact/newContact/NewContact"
import {ContactTabBar} from "../../../pages/gw/generated/policycenter/pages/navigation/tabBar/ContactTabBar"
import { t } from 'testcafe';
import world from "../../../util/pc/world.js";

const contactSearch = new ContactSearch();
const newContact = new NewContact();
const contactTabBar = new ContactTabBar();

export class ContactScenario {
    constructor() {}

    async createNewContact() {
        if (world.contactType == "Company") {
            world.contact.name = "New Company Inc.";
            world.contact.taxID = "11-2222222";

            await this.selectContactTabNewContactNewCompany();
            await newContact.newContactContactPanelSetContactCVContactDVContactNameInputSetGlobalContactNameInputSetName.setValue(world.contact.name);
        }
        else if (world.contactType == "Person") {
            world.contact.firstName = "Donna";
            world.contact.lastName = "Smith";
            world.contact.taxID = "999-88-7777";

            await this.selectContactTabNewContactNewPerson();
            await newContact.newContactContactPanelSetContactCVContactDVContactNameInputSetGlobalPersonNameInputSetFirstName.setValue(world.contact.firstName);
            await newContact.newContactContactPanelSetContactCVContactDVContactNameInputSetGlobalPersonNameInputSetLastName.setValue(world.contact.lastName);
        }

        await newContact.newContactContactPanelSetContactCVContactDVAddressInputSetglobalAddressContainerGlobalAddressInputSetAddressLine1.setValue("45 Rose Street");
        await newContact.newContactContactPanelSetContactCVContactDVAddressInputSetglobalAddressContainerGlobalAddressInputSetCity.setValue("Foster City");
        await t.pressKey('tab'); // trigger post on change
        await newContact.newContactContactPanelSetContactCVContactDVAddressInputSetglobalAddressContainerGlobalAddressInputSetState.selectOptionByValue('CA');
        await newContact.contactDVAddressType.selectNthOption(1);
        await newContact.newContactContactPanelSetContactCVContactDVOfficialIDInputSetOfficialIDDV_Input.setValue(world.contact.taxID);
        await this.clickUpdateButton()
    }

    async searchForContact(searchCriteria) {
        await this.selectContactTabBarContactSearch();
        
        await contactSearch.contactSearchScreenContactType.selectOptionByValue(world.contactType);

        if (searchCriteria == "First and Last Name") {
            await contactSearch.contactSearchContactSearchScreenBasicContactInfoInputSetGlobalPersonNameInputSetFirstName.setValue(world.contact.firstName);
            await contactSearch.contactSearchContactSearchScreenBasicContactInfoInputSetGlobalPersonNameInputSetLastName.setValue(world.contact.lastName)
        }
        else if (searchCriteria == "Name")
            contactSearch.contactSearchContactSearchScreenBasicContactInfoInputSetGlobalContactNameInputSetName.setValue(world.contact.name);
        else if (searchCriteria == "Tax ID")
            await contactSearch.basicContactInfoInputSetTaxID.setValue(world.contact.taxID);
        
        await contactSearch.contactSearchContactSearchScreenSearchAndResetInputSetSearchLinksInputSetSearch.click();
    }

    checkContactSearchResult() {
        const rowFilter = "not(.gw-header-row):not(.gw-footer-row):not(.gw-isSmartHeader)";
        return contactSearch.contactSearchScreenContactSearchResultsLV.component.find("tr:" + rowFilter).count;
    }

    async openTabBarContactTabMenuItem() {
		!await contactTabBar.tabBarContactTab.component.hasClass('gw-hasOpenSubMenu') && await t.click(contactTabBar.tabBarContactTab.component.find('div.gw-action--expand-button'));
	}
    
    async selectContactTabNewContactNewCompany() {
		await this.openTabBarContactTabMenuItem();
		await t
            .hover(contactTabBar.contactTabNewContact.component)
            contactTabBar.newContactNewCompany.click();
         
	}

    async selectContactTabNewContactNewPerson() {
		await this.openTabBarContactTabMenuItem();
		await t
            .hover(contactTabBar.contactTabNewContact.component)
            contactTabBar.newContactNewPerson.click();
        
	}

    async selectContactTabBarContactSearch() {
        await this.openTabBarContactTabMenuItem();
        await contactTabBar.contactTabSearch.click();
    }

    async clickUpdateButton() {
        if (await newContact.newContactForceDupCheckUpdate.component.exists && await newContact.newContactForceDupCheckUpdate.component.visible) {
            await newContact.newContactForceDupCheckUpdate.click();
        }
        else {
            await newContact.newContactUpdate.click();
        }
    }
}