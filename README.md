# library
Small project to practice creating and managing JavaScript objects and DOM manipulation. The project was done as part of The Odin Project course.

The theme and styling of the page was taken from a previous project, the Admin Dashboard.

## Highlights
- I really enjoyed having to go out of my way to learn about modal dialog boxes in order to add them to the project. It was nice to learn something on demand like that.
- Implementing a mechanism for the user to select a book so as to delete it was surprisingly more complicated than I thought. I decided to not use the simple ***focus*** and ***active*** properties and instead keep an internal track of the selected card, and style it with CSS. I think there are much easier of doing that, but I enjoyed the challenge.

## Challenges and Lessons
- I learnt about HTMLElement.closest("selector") which finds the closest parent of an element that matches the selector. It was useful to be able to find the appropriate book card that was clicked by the user if they clicked on some nested elements.
- As mentioned before, I enjoyed learning about dialog boxes and how they can be called.
- Had to revisit form validation with JS in order to properly validate data entered in the dialog box by the user when adding a book.