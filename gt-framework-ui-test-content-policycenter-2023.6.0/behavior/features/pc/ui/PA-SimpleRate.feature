@ignore
Feature: PC Simple Rate

Background: 
    Given I am a user with the Producer role
    And a Personal account

@personal_auto @DesignatedFunction @quote_submission @simple_rate @AccessibiltyScanning
Scenario: Forms inferred when quoting a Personal Auto submission
    Given a Personal Auto submission with a vehicle
    When I quote the submission
    Then the submission should be quoted
    And a premium should exist for the vehicle