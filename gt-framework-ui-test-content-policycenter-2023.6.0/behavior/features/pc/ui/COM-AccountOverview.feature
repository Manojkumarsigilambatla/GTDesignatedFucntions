@ignore
Feature: PC Account Overview

Background: 
    Given I am a user with the Producer role

@common @DesignatedFunction @view_account_summary
Scenario: Viewing an account overview
    Given a Personal account
    When I need to quickly understand an account I haven’t reviewed
    Then I can find an overview of the account