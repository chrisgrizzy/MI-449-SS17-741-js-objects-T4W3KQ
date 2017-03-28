// ----
// DATA
// ----

// A couple jokes to start with
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

var savedjokes = window.localStorage.getItem('jokes')

if (savedjokes) {
  jokes = JSON.parse(savedjokes)
}
// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  // userJokeInput.value = requestedJokeInput.value
  // userJokeSetup.value = requestedJokeInput.value
  // userJokePunchline.value = requestedJokeInput.value
  if (jokes[requestedJokeInput.value]) {
    jokeBox.innerHTML = '<p>' + jokes[requestedJokeInput.value]['setup'] + '</p>' + '<p>' + jokes[requestedJokeInput.value]['punchline'] + '</p>'
  } else { jokeBox.textContent = 'No matching joke found' }
}
// Teach joke machine a new joke

var rememberButton = document.getElementById('rememberjoke')
var userJokeInput = document.getElementById('jokeabout')
var userJokeSetup = document.getElementById('jokesetup')
var userJokePunchline = document.getElementById('userpunchline')
var teachNewJoke = function () {
  var about = userJokeInput.value
  var setup1 = userJokeSetup.value
  var punchline = userJokePunchline.value
  jokes[about] = {punchline}
  var a = (jokes[about] = {punchline})
  a['setup'] = setup1
  updateJokesMenu()
  window.localStorage.setItem('jokes', JSON.stringify(jokes))
  window.localStorage.setItem('jokesMenuList', JSON.stringify(jokesMenuList))
}

// Forget a joke

var forgetButton = document.getElementById('forgetkey')
var forgetJokeInput = document.getElementById('forgetInput')
var forgetJoke = function () {
  if (jokes[forgetJokeInput.value]) {
    // window.localStorage.setItem('jokes', JSON.stringify(jokes))
    window.alert('YAY it deleted')
    delete jokes[forgetJokeInput.value]
    updateJokesMenu()
    window.localStorage.setItem('jokes', JSON.stringify(jokes))
  } else { window.alert('NOOO') }
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------
rememberButton.addEventListener('click', teachNewJoke)
forgetButton.addEventListener('click', forgetJoke)

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
window.addEventListener('storage', function () {
    // do your checks to detect
    // changes in objects
}, false)
