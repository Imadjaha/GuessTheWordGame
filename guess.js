// Setting Game Name
let gameName = "Guess The Word Game";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Created By Aimad Bouchouaf`;

// Setting Game Options
let numbersOfTries = 6;
let numbersOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;
let numberOfUsedHints = 0 ;


// Manage Words
let wordToGuess = "";
const words = [
  "Create",
  "Update",
  "Delete",
  "Master",
  "Branch",
  "Mainly",
  "String",
  "Method",
  "Object",
  "Binary",
  "Switch",
  "Return",
  "Define",
  "Public",
  "Buffer",
  "Socket",
  "Thread",
  "Buffer",
  "Struct",
  "Global",
  "Search",
  "Assert",
  "Vector",
  "Import",
  "Output",
  "Random"

];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");
let messageAreaHint = document.querySelector(".messageHint");
// console.log(wordToGuess); // to see printed word


// Manage Hints

document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);


function generateInput() {
  const inputsContainer = document.querySelector(".inputs");

  for (let i = 1; i <= numbersOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disabled-inputs");

    for (let j = 1; j <= numbersOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }

    inputsContainer.appendChild(tryDiv);
  }
  // focus on First Input In first Try Element
  inputsContainer.children[0].children[1].focus();

  // Disable All Inputs Except First One
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs > input"
  );
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");

  inputs.forEach((input, index) => {
    // Convert Input To UpperCAse
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus(); // if nextInput exists
    });

    input.addEventListener("keydown", function (event) {
      // console.log(event);
      const currentIndex = Array.from(inputs).indexOf(event.target); // Or this
      // console.log(currentIndex);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);

function handleGuesses() {
  let successGuess = true;
  // console.log(wordToGuess);
  for (let i = 1; i <= numbersOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    // console.log(letter);
    const actaulLetter = wordToGuess[i - 1];

    // Game Logic
    if (letter === actaulLetter) {
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      // Letter Is Correct  But In Wrong Place
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }

  // check If User  Win The game or not
  if (successGuess) {
    messageArea.innerHTML = `You Win The word Is <span>${wordToGuess}</span>`;
    if(numberOfHints ===2){
   messageAreaHint.innerHTML = `<span style= "font-weight: bold; color:orange">Wow You Win Without Using Any Hints </span>`
    }
    else{
      messageAreaHint.innerHTML = `<span>You Win Using ${numberOfUsedHints - numberOfHints} Hints </span>`
    }

    // Add Disabled Class ON All Try Divs
    let alltries = document.querySelectorAll(".inputs > div");
    alltries.forEach((tryDiv) =>  tryDiv.classList.add("disabled-inputs"));
    // Disable Guess Button
    guessButton.disabled = true ;
    getHintButton.disabled = true;
// Lose Logic
  } else {
    document.querySelector(`.try-${currentTry}`).classList.add("disabel-inputs");
    const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    currentTryInputs.forEach((input) => (input.disabled = true));
    
    currentTry++;

    const nextTryInputs = document.querySelectorAll(`.try-${(currentTry)} input`);
    nextTryInputs.forEach((input)=>{ (input.disabled=false) });

    let el = document.querySelector(`.try-${currentTry}`);
    if(el){
      document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
      el.children[1].focus();
    }
    else{
          // Disable Guess Button
    guessButton.disabled = true ;
    getHintButton.disabled = true;
    messageArea.innerHTML= `You Lose the Word Is <span>${wordToGuess}</span>`;
    }
  }

}

function getHint(){
  if (numberOfHints > 0 ){
    numberOfHints-- ;
    numberOfUsedHints++ ;
   
    document.querySelector(".hint span").innerHTML = numberOfHints;

  }
  if(numberOfHints === 0 ) {getHintButton.disabled = true;}

  const enabledInputs = document.querySelectorAll("input:not([disabled])") ;
  const emptyEnabledInputs  = Array.from(enabledInputs).filter((input) => input.value === "");

  if(emptyEnabledInputs.length > 0){
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const indexToFill =  Array.from(enabledInputs).indexOf(randomInput);

    if(indexToFill !== -1){
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}


function handleBackspace(event){

  if(event.key === "Backspace"){
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);

    if(currentIndex > 0){
      const currentInput = inputs[currentIndex] ;
      const prevInput = inputs[currentIndex - 1];
      currentInput.value  = "";
      prevInput.value = "";
      prevInput.focus();
    }
  }
}

document.addEventListener("keydown" , handleBackspace);

window.onload = function () {
  generateInput();
};


// Get the restart button by its ClassName
const restartButton = document.querySelector(".restart");

// Add an event listener to the button
restartButton.addEventListener('click', function() {
    // Reload the page
    location.reload();
});
