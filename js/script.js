const guessedLetters = document.querySelector (".guessed-letters");
const buttonGuess = document.querySelector (".guess");
const letterInput = document.querySelector (".letter");
const wordInProgress = document.querySelector (".word-in-progress");
const remaining = document.querySelector (".remaining");
const remainingSpan = document.querySelector (".remaining span");
const message = document.querySelector (".message");
const hiddenButton = document.querySelector (".play-again"); 

const word = "magnolia";

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
    const guess = letterInput.value;
    console.log (guess);
    letterInput.value = ""; 

});