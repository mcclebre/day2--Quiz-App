const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex 

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0 
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while( answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(event) {
    const selectedButton = event.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    
}

function setStatusClass(element, correct) { 
    clearStatusClass(element) 
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) { 
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is 5 + 5?',
        answers: [
            { text: '10', correct: true },
            { text: '0', correct: false},
            { text: '55', correct: false},
            { text: '12', correct: false}
        ]
    },

    {
        question: 'How many women have landed on the moon?',
        answers: [
            { text: '1', correct:  false},
            { text: '4', correct: false},
            { text: '0', correct: true},
            { text: '3', correct: false}
        ]
    },

    {
        question: 'Who is the cutest person in this house?',
        answers: [
            { text: 'Osiris', correct:  true},
            { text: 'Mimi', correct: true},
            { text: 'Siborg', correct: true},
            { text: 'Baby Boy', correct: true}
        ]
    },

    {
        question: 'Who is the best at making little quizes?',
        answers: [
            { text: 'Me', correct:  false},
            { text: 'Myself', correct: false},
            { text: 'I', correct: false},
            { text: 'Brevan', correct: true}
        ]
    },

    {
        question: 'Is this a cool project?',
        answers: [
            { text: 'Eh', correct:  false},
            { text: 'Kinda cool', correct: true},
            { text: 'This sucks', correct: false},
            { text: 'Oh my god, this is the greatest', correct: false}
        ]
    },
]