const guessedLettersElement  = document.querySelector (".guessed-letters");
const buttonGuess = document.querySelector (".guess");
const letterInput = document.querySelector (".letter");
const wordInProgress = document.querySelector (".word-in-progress");
const remaining = document.querySelector (".remaining");
const remainingSpan = document.querySelector (".remaining span");
const message = document.querySelector (".message");
const hiddenButton = document.querySelector (".play-again"); 

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8; 

const getWord = async function () {
    const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text ();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
}
getWord (); 



const placeholder = function (word) {
    
    const placeholderLetters = [];
    for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
}; 

getWord(); 

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
            countRemainingGuesses (guess);
            showGuessedLetters ();

            ;
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

const countRemainingGuesses = function (guess) {
    const upperWord = word.toUpperCase (); 
    if (!upperWord.includes (guess)) {
        message.innerText = `Ooops! The word has no letter ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
        
    };
    
    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingSpan.innerText =  `${remainingGuesses} guesses`;
            
        }
    
};



const checkWin = function () {
    if (word.toUpperCase ()=== wordInProgress.innerText){
        message.classList.add ("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>.`;
        
        startOver (); 
    }
    
}; 
 const startOver = function () {
     buttonGuess.classList.add("hide"); 
     remaining.classList.add("hide"); 
     guessedLettersElement.classList.add("hide"); 
     hiddenButton.classList.remove("hide"); 

 };

 hiddenButton.addEventListener ("click", function () {
     message.classList.remove ("win");
     guessedLetters = []; 
     remainingGuesses = 8; 

     guessedLettersElement.innerHTML = "";
     message.innerText = "";
     remainingSpan.innerText = `${remainingGuesses} guesses`;

     getWord (); 

     buttonGuess.classList.remove("hide"); 
     remaining.classList.remove("hide"); 
     guessedLettersElement.classList.remove("hide"); 
     hiddenButton.classList.add("hide"); 


 }); 


