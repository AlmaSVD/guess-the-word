const guessedLettersElement  = document.querySelector (".guessed-letters");
const buttonGuess = document.querySelector (".guess");
const letterInput = document.querySelector (".letter");
const wordInProgress = document.querySelector (".word-in-progress");
const remaining = document.querySelector (".remaining");
const remainingSpan = document.querySelector (".remaining span");
const message = document.querySelector (".message");
const hiddenButton = document.querySelector (".play-again"); 

const word = "magnolia";
const guessedLetters = [];


const placeholder = function (word) {
    
    const placeholderLetters = [];
    for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
}; 

placeholder (word);

buttonGuess.addEventListener ("click", function (e){
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const goodGuess = validateInput (guess);

    if (goodGuess) {
        makeGuess (guess); 
    };
    letterInput.value = "";  
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/
    if (input.length === 0) {
        message.innerText = "Please enter a letter"
        }
    else if (input.length > 1 ) {
        message.innerText = "Please enter a single letter"
    }
    else if (!input.match(acceptedLetter))  {
        message.innerText = "Please enter a letter from A to Z"
    }

    else {
        return input; 

    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase ();
    if (guessedLetters.includes (guess)) {
        
            message.innerText = "You already guessed that letter! Please try again.";
        }
        else {
            guessedLetters.push (guess);
            console.log (guessedLetters);
            
            showGuessedLetters ();
            updateWordInProgress (guessedLetters); 
        }
    };

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement ("li");
        li.innerText = letter; 
        guessedLettersElement.append (li); 
        }
    }; 
 
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase() ; 
    const wordArray = wordUpper.split("");
    console.log (wordArray);
    const updatedArray = [];
    for (const letter of wordArray) {
    
        if (guessedLetters.includes (letter)) {
        updatedArray.push(letter.toUpperCase());
        }
        else  {
        updatedArray.push ("●");  
        }
    }
    wordInProgress.innerText = updatedArray.join(""); 
    checkWin ()
};


const checkWin = function () {
    if (word.toUpperCase ()=== wordInProgress.innerText){
        message.classList.add ("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>.`;
    }
}; 

