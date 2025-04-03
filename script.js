
//start of name
let userName = prompt("Hello, What is your name?")

let responseImg = document.getElementById('response-img')
let responseText = document.getElementById('response-text')
let greeting = document.getElementById('greeting')

userName ? document.getElementById('greeting').innerText=` Welcome ${userName} follow the instructions to play!` 
: document.getElementById('greeting').innerText='Anonymous!'




// Word List
const wordList = [
    'gold',
    'luck',
    'clover',
    'rain',
    'charm',
    'parade',
    'leprechaun',
    'treasure',
    'celebration',
    'greenery',
    'shenanigans',
    'tradition'
  ]
  
  //declare variable 
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6
let winTotal = 0
let loseTotal = 0

const scoreboard = document.getElementById('scoreboard')

const updateScoreboard = () => {
    if (scoreboard) {
        scoreboard.innerHTML = `Wins: ${winTotal} | Losses: ${loseTotal}`
    }
}

// win and lose sound 
const winSound = new Audio('sounds/winSound.mp3')
const loseSound = new Audio('sounds/loseSound.mp3')
const wrongGuess = new Audio('sounds/wrong guess.mp3')
const rightGuess = new Audio('sounds/rightGuess.mp3')
//start game function
function startGame(level) {
    //reset game
    wrongGuesses = 0
    guessedLetters = []

    selectedWord = getRandomWord(level)

    displayedWord = '_'.repeat(selectedWord.length)

    updatedDifficultyDisplay(level)

    updateUI()



    //show game area and difficulty display, hide selection buttons 
    document.getElementById('gameArea').classList.remove('d-none')
    document.getElementById('gameArea').classList.add('d-block')

    document.getElementById('difficultyBox').classList.remove('d-none')
    document.getElementById('difficultyBox').classList.add('d-block')

    document.getElementById('difficultySelection').classList.add('d-none')
    //auto focus on input
    document.getElementById('letterInput').focus()
}

function getRandomWord(level) {
    let filteredWords = wordList.filter(word => {
        if (level === 'easy') return word.length <= 4
        if (level === 'medium') return word.length >= 5 && word.length <= 7
        if (level === 'hard') return word.length >= 8
    })

    return filteredWords[Math.floor(Math.random() * filteredWords.length)]
}

//update difficulty display 
function updatedDifficultyDisplay(level) {
    let difficultyBox = document.getElementById('difficultyBox')
    difficultyBox.classList.remove('easy', 'medium', 'hard')

    if (level === 'easy') {
        difficultyBox.textContent = 'Difficulty: Easy'
        difficultyBox.classList.add('easy')
    } else if (level === 'medium') {
        difficultyBox.textContent = 'Difficulty: Medium'
        difficultyBox.classList.add('medium')
    } else if (level === 'hard') {
        difficultyBox.textContent = 'Difficulty: Hard'
        difficultyBox.classList.add('hard')
    }
}

function updateUI() {
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ')

}

function guessLetter () {
    let inputField = document.getElementById('letterInput') // Get input field
    let guessedLetter = inputField.value.toLowerCase() // Convert input to lowercase
  
    //Check if input is a valid letter (A-Z)
    if (!guessedLetter.match(/^[a-z]$/)){
      alert('Please enter a valid letter (A-Z)!') // Alert user if invalid input
      inputField.value = '' // Clear input field
      return // Exit function
    }
    
  
    //Check if letter was already guessed
    if(guessedLetters.includes(guessedLetter)){
      alert(`You already guessed '${guessedLetter}'. Try a different letter!`)
      inputField.value = '' // Clear input field
      return
    }
  
    //Store guessed letter
    guessedLetters.push(guessedLetter)
  
    //Check if guessed letter is in the selected word
    if (selectedWord.includes(guessedLetter)){
      updateCorrectGuess(guessedLetter)
    } else {
      updateWrongGuess(guessedLetter)
    }
  
    inputField.value = '' // Clear input field
    document.getElementById('letterInput').focus() // Refocus input field for next guess
  
  }

function updateWrongGuess (guessedLetter) {
    wrongGuesses++

    document.getElementById('wrongLetters').textContent += `${guessedLetter}`
    document.getElementById('shamrock').src = `imgs/shamrock${6-wrongGuesses}.jpg`

    if (wrongGuesses === maxMistakes) {
        endGame(false)
    }
}

function updateCorrectGuess(guessedLetter) {
    let newDisplayedWord = ''

    for (let i=0; i < selectedWord.length; i++){
        if (selectedWord[i] === guessedLetter) {
            newDisplayedWord += guessedLetter
        } else {
        newDisplayedWord += displayedWord[i]
        }
    }

    displayedWord = newDisplayedWord
    updateUI()

    if (!displayedWord.includes('_')) {
        endGame(true)
    }
}

function endGame(won){


    if(won){
        document.getElementById('right').classList.remove('d-none')
        document.getElementById('right').classList.add('d-block')
        winSound.play()
        winTotal++
        updateScoreboard()
    }else{
     document.getElementById('wrong').textContent = `You lost! Kilgore gets no gold. Word was: ${selectedWord}`
        document.getElementById('wrong').classList.remove('d-none')
        document.getElementById('wrong').classList.add('d-block')
        loseSound.play()
        loseTotal++
        updateScoreboard()
    }
}
//enter key event listener 
document.getElementById('letterInput').addEventListener('keydown', function(event){
    if (event.key === 'Enter'){
        guessLetter()
    }
})

function restartGame() {
    wrongGuesses = 0
    selectedWord = ''
    displayedWord = ''
    guessedLetters = ''
    wrongLetters = ''
    document.getElementById('shamrock').src = `imgs/shamrock6.jpg`
        document.getElementById('wrongLetters').textContent = `Wrong Letters:`
    document.getElementById('letterInput').value = ''
    document.getElementById('difficultySelection').classList.remove('d-none')
    document.getElementById('difficultySelection').classList.remove('d-none')
    document.getElementById('gameArea').classList.add('d-none')
    document.getElementById('gameArea').classList.add('d-none')
    document.getElementById('difficultyBox').classList.add('d-none')
    document.getElementById('right').classList.add('d-none')
    document.getElementById('wrong').classList.add('d-none')

}