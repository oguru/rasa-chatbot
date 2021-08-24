# Protolyst Tech Test

## Description
To create a ReactJS web application: a simple "message queue" system utilising redux as the store for the messages.

## Requirements

**The interface will be comprised of:**
- A text box to enter string text
- A button to submit a message
- A notification space to display messages for 5 seconds
 
**How it works:**
- When the user clicks the button to submit the message (string contained in the text box) it will be added into the redux store.
- A component should retrieve the message from the redux store, and it should be displayed on the screen within the notification space.
- After a 5 second delay, the message should be removed from the store, which in turn removes it from the component displaying it and the screen.

**Considerations:**
 
- You can use as many or few react components as you like BUT they must be functional components, and not class based components.
- It should be possible to add multiple messages to the queue. e.g. At 0 seconds we enter a message press the button, then 1 second later we enter a new message press the button again. We should see **two** messages on screen. Then at 5 seconds the first one should disappear (5 seconds after it was added), and then at 6 seconds in, the second one should disappear (5 seconds after it was added).


## Submission Info
I greatly enjoyed this exercise and extended it to include a themed UI and animations.

Due to this, the timer was intentionally extended to 7 seconds for a better user experience.

Several tests have been written to demonstrate my testing capabilities.

## Setup
1 - Clone the repository.\
2 - Install dependencies with ```yarn install``` or ```npm install```.\
3 - Run ```yarn start``` or ```npm run start``` in the project directory from the command line .\
4 - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
5 - Run ```yarn test``` or ```npm run test``` to run tests.

## Hosted Link
#### [Link](https://francisroadallotments.co.uk/) to live site.
