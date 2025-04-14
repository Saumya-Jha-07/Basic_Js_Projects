document.addEventListener( 'DOMContentLoaded',function(){
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const ChoicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");
  const restartButton = document.getElementById("restart-btn");
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Neptune"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Jane Austen",
        "Charles Dickens",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  let currQueIdx = 0;
  let score = 0;

  // step 1
  startBtn.addEventListener("click", startQuiz);

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");

    showQuetion();
  }

  function showQuetion() {
    nextBtn.classList.add("hidden");
    questionText.innerText = questions[currQueIdx].question;

    ChoicesList.innerHTML = ""; // clearing previous choices
    questions[currQueIdx].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.innerText = choice;
      // li.addEventListener('click' , selectAnswer(choice))  -> we can't pass parameters as of now bcoz it will evaluate that fn rn .. so SOLN ?
      li.addEventListener("click", () => selectAnswer(choice)); // nameless Arrow fn : SOLN
      ChoicesList.appendChild(li);
    });
  }

  // step 2
  function selectAnswer(choice) {
    const correctAnswer = questions[currQueIdx].answer;
    if (choice == correctAnswer) {
      score++;
    }
    nextBtn.classList.remove("hidden");
  }

  // step 3
  nextBtn.addEventListener("click", function () {
    // step 5 : part 1
    if (currQueIdx == 2) {
      displayResult();
      return;
    }

    // step 4
    currQueIdx++;
    showQuetion();
  });


  // step 5 : part 2
  function displayResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.innerHTML = `${score} out of ${questions.length}`

    restartButton.addEventListener("click", restart); // step 6
  }

  // step 6
  function restart() {
    currQueIdx = 0
    score = 0
    resultContainer.classList.add('hidden')
    
    startQuiz()
  }
})