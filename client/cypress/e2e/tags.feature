Feature: View and Interact with Tags
  As a user of Fake Stack Overflow
  I want to view all tags and the associated questions
  So that I can easily browse questions by tags and see their details

  Scenario: Add a question with new tags and verify the tags exist
    Given The user is viewing the homepage "http://localhost:3000"
    When The user adds a new question with tags "test1 test2 test3"
    Then The user should see the tags "test1", "test2", and "test3" listed in the Tags page

  Scenario: Verify all default tags are displayed
    Given The user is viewing the homepage "http://localhost:3000"
    When The user navigates to the Tags page
    Then The user should see the tags "react", "javascript", "android-studio", "shared-preferences", "storage", and "website"

  Scenario: Check question count associated with tags
    Given The user is viewing the homepage "http://localhost:3000"
    When The user navigates to the Tags page
    Then The user should see the correct number of questions associated with each tag

  Scenario Outline: View questions under the tag
    Given The user is viewing the homepage "http://localhost:3000"
    When The user navigates to the Tags page and clicks on the "<tag>" tag
    Then The user should see questions related to the "<tag>" tag

    Examples:
      | tag              |
      | react            |
      | javascript       |
      | android-studio   |

  Scenario: Create a new question with a new tag and find it through the tag
    Given The user is viewing the homepage "http://localhost:3000"
    When The user adds a new question with the tag "test1-tag1"
    And The user navigates to the Tags page and clicks on the "test1-tag1" tag
    Then The user should see the newly created question listed under that tag