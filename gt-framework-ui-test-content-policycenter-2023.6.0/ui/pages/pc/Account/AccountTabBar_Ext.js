import { PcfButton, PcfComponent, PcfTextInput } from "@gtui/gt-ui-framework";
import { AccountTabBar } from "../../gw/generated/policycenter/pages/navigation/tabBar/AccountTabBar";

export class AccountTabBar_Ext extends AccountTabBar {

    tabBarAccountTab_AccounNumberSearchItem_Button = PcfButton('#TabBar-AccountTab-AccountTab_AccountNumberSearchItem_Button');
    accountTabAccountTab_AccountNumberSearchItem_ext = PcfTextInput('#TabBar-AccountTab-AccountTab_AccountNumberSearchItem');
}