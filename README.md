
### Technologies
* Backend: MongoDB/Express
Stores users and events data using document data structure, provides better read performance, as well as the ability to retrieve related data with a single database query. 

* Frontend: React/Node.js
Using Axios library, with good defaults to work with JSON data, to make XMLHttpRequests from the browser for a better error handlers.

* Speech Recognition:
 Translate user's input speech into text by following provided command option to signup/login users.

* AWS
Around the block host user's events' images using AWS to increase app speed and agility.

### Feature: SpeechRecognition for sign-up/login form

We utilized the SpeechRecognition interface of the Web Speech API on our sign-up/login form, so when users say keywords like "name", "email", "password" and "submit", it will trigger the change of input fields and capture the cooresponding input to the fields. 

By strategically arranging the if/else conditions, we make sure that we have the right input in the right fields if user follow our convention saying **"my name is ..., my email is .... my password is ..., submit!"**

```javascript
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

....

mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

      if (transcript.includes("submit")) {
      //cleaned up the spaces in the email field and submit

      } else if (transcript.includes("password")) {
        // slice and replace certain keywords in the transcript to have the right password input
        // use this.setState to dynamically set the password field
       
      } else if (transcript.includes("email")) {
        // slice and replace certain keywords (such as "at" to "@") in the transcript to have the right email input
        // use this.setState to dynamically set the email field
        
      } else if (transcript.includes("name")) {
        // slice and replace certain keywords in the transcript to have the right name input
        // use this.setState to dynamically set the name field
      }
}

```
