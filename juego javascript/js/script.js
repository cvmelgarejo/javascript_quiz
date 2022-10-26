const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreTracker = document.getElementById('score-tracker');
const scoreUpElement = document.getElementById('score-up');


let randomQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
});

function startGame() {
  startButton.classList.add('hide');
  randomQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  scoreTracker.classList.remove('hide');
  setNextQuestion();
  scoreUpElement.textContent = 0;
};

function setNextQuestion() {
  resetState();
  showQuestion(randomQuestions[currentQuestionIndex]);
};

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button)
  })
};

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
};

/* Checks if selected button is part of the correct dataset */
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  
  processResults(correct);
  setStatusClass(document.body, correct);

  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })

  if (randomQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
};

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
};

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
};


/* Game questions with 4 total choices */
let questions = [{
    question: 'Pregunta 1',
    answers: [{
        text: 'Esta es la correcta',
        correct: true
      },
      {
        text: 'falsa',
        correct: false
      },
      {
        text: 'f',
        correct: false
      },
      {
        text: 'f',
        correct: false
      },
    ]
  },
  {
    question: "Pregunta 2",
    answers: [{
        text: 'f',
        correct: false
      },
      {
        text: 'v',
        correct: true
      },
      {
        text: 'f',
        correct: false
      },
      {
        text: 'f',
        correct: false
      },
    ]
  },
  {
    question: "Pregunta 3",
    answers: [{
        text: 'f',
        correct: false
      },
      {
        text: 'f',
        correct: false
      },
      {
        text: 'f',
        correct: false
      },
      {
        text: 'v',
        correct: true
      },

    ]
  },
  {
    question: 'Pregunta 4',
    answers: [{
        text: 'v',
        correct: true
      },
      {
        text: 'f',
        correct: false
      },
      {
        text: 'f',
        correct: false
      },
      {
        text: 'f',
        correct: false
      },
    ]
  },
  {
    question: 'Pregunta 5',
    answers: [{
        text: 'f',
        correct: false
      },
      {
        text: 'f',
        correct: false
      },
      {
        text: "f",
        correct: false
      },
      {
        text: 'v',
        correct: true
      },
    ]
  },
];


function processResults(isCorrect) {
  if (!isCorrect) {
    return;
  }
  
  const scoreUp = parseInt(scoreUpElement.textContent, 10) || 0;

  scoreUpElement.textContent = scoreUp + 100;
}
