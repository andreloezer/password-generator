var pass = '';
var blocksize = 4;
var element = document.getElementsByClassName('checkbox');
var parameters = {
    lower_case: true,
    upper_case: true,
    numbers: true,
}
var lower_case_char = "abcdefghijklmnopqrstuvwxyz";
var upper_case_char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers_char = "0123456789";

function toggleButtonState(elementId) { // Function toggles the class of the cicked button

  parameters[elementId] = !parameters[elementId];
  if (parameters[elementId]) {
    document.getElementById(elementId).className = 'checkbox enable';
  }
  else {
    document.getElementById(elementId).className = 'checkbox disable';
  }
}

// Calls the toggle function for the clicked button
for (key in parameters) {
  document.getElementById(key).addEventListener("click", function(e) {
    toggleButtonState(this.id);
  }, false);
}

function generatePassword() { // Function that generates the password

  var size = document.getElementById('size_input').value; // Lenght of the password

  var characters = '';

  // Concat the respective characters to var characters for wich button clicked

  for (key in parameters) {
    if (parameters[key]) {
      characters = characters.concat(window[key + '_char'])
    }
  }

  // Checks to ensure the password can be created
  if (characters.length == 0) {
    password.innerHTML="It's needed at least one type of characters";
    spaced_paragraph.innerHTML= '';
  }
  else if (size == 0) {
    password.innerHTML="The size needs to be at least 1";
    spaced_paragraph.innerHTML= '';
  }
  // If the password can be created then...
  else {
    characters.split('');
    var random = '';
    // Generates the random password
    for (var i = 0; i < size; i++) {
      random += characters[Math.round(Math.random() * (characters.length -1))];
    }
    password.innerHTML= random;

    // Splits the password into blocks with the size of 'blocksize'
    var spacedPassword = random;
    var arrayPassword = [];
    for (var i = 0; i < random.length; i += blocksize) {
      arrayPassword.push(spacedPassword.slice(i, i + blocksize))
    }
    // Separate wich block of the password with '-'
    var joinedPassword = arrayPassword.join('-');
    spaced_paragraph.innerHTML = joinedPassword;
  }
}

generate_button.onclick = generatePassword;

// Pressing some keys of the keyboard will trigger especifics functions
// Keycodes -> https://css-tricks.com/snippets/javascript/javascript-keycodes/
document.onkeypress = function (e) {
  switch (e.code) {

  case "NumpadEnter":
  case "Enter":
    generatePassword();
    break;

  case "KeyL":
    toggleButtonState('lower_case');
    break;

  case "KeyU":
    toggleButtonState('upper_case');
    break;

  case "KeyN":
    toggleButtonState('numbers');
    break;
  }
}
