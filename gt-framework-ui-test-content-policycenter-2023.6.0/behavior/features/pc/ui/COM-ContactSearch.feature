@ignore
Feature: PC Testing Example

  @common @DesignatedFunction @search_contact
  Scenario Outline: <ContactType> <Identifier> Contact Search
    Given a known <ContactType>
    When I search for that contact with their <Identifier>
    Then the contact was found

    Examples:
    | ContactType  | Identifier           |
    | Person       | First and Last Name  |
    | Person       | Tax ID               |
    | Company      | Name                 |
    | Company      | Tax ID               |