@ignore 
Feature: PC Forms Inference

Background: 
    Given I am a user with the Producer role
    And a Personal account

@personal_auto @DesignatedFunction @quote_submission @forms_inference
Scenario: Forms inferred when quoting a Personal Auto submission
    Given a Personal Auto submission
    When I quote the submission
    Then forms should be inferred

@personal_auto @DesignatedFunction @bind_submission @forms_inference
Scenario: No forms inferred when binding a Personal Auto Submission
    Given a Quoted Personal Auto submission
    When I bind the submission
    Then no forms should be inferred

@personal_auto @DesignatedFunction @issue_submission @forms_inference
Scenario: Forms inferred when issuing a Personal Auto Submission
    Given a Quoted Personal Auto submission
    When I issue the submission
    Then forms should be inferred