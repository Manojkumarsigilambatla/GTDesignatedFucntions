import { PolicyTabBar } from '../../pages/gw/generated/policycenter/pages/navigation/tabBar/PolicyTabBar.js';
import { QuoteScreen } from "../../pages/pc/SubmissionWizard/QuoteScreen"
import {Selector, t} from "testcafe";

let policyTabBar = new PolicyTabBar ();
let quoteScreen = new QuoteScreen ();

export class PCHelper {

    async goToPolicy(policyNumber){
        await t.click(Selector('#TabBar-PolicyTab > div.gw-action--expand-button'));
        await t.typeText(policyTabBar.policyTabPolicyTab_PolicyRetrievalItem.component, policyNumber).pressKey('enter');
    }

    /*
     * This method can be called only when the current UI page is quote screen
     */
    async getPolicyNumber(){
        return (await quoteScreen.viewPolicyLink.component.textContent).match(/\d+/).toString();
    }
}
