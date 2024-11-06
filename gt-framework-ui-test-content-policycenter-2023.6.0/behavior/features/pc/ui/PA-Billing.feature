@ignore
Feature: Personal Auto Policy Billing

Background: 
    Given I am a user with the Producer role
    And a Personal account

@personal_auto @DesignatedFunction @bind_submission @billing_event  
Scenario: Create Bind Billing Event
    Given a Quoted Personal Auto submission
    When I bind the submission
    Then a billing event is created

@personal_auto @DesignatedFunction @issue_submission @billing_event
Scenario: Create Issue Billing Event
    Given a Quoted Personal Auto submission
    When I issue the submission
    Then a billing event is created