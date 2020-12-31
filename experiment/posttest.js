
// Don't touch the below code

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------
  const myQuestions = [
    {
      question: "Which of the following statements are associated with complete dynamic balancing of rotating systems?<br>A. The system is automatically statically balanced.<br>B .Resultant couple due to all inertia forces is zero.<br>C. Centre of masses of the system lies on the axis of rotation.<br>D. Support reactions due to forces are zero but not due to couples.",
      answers: {
        a: "A, C and D only",
        b: "A, B, C and D",
        c: "B, C and D only",
        d: "A, B and C only"
      },
      correctAnswer: "a"
    },
    {
      question: "An important assumption made by this technique of calculating balancing of masses is that:",
      answers: {
        a: "vibration amplitude is inversely proportional to the force producing the vibration",
        b: "vibration amplitude is equal to the force producing the vibration",
        c: "vibration amplitude is proportional to the force producing the vibration",
        d: "None of the above"
      },
      correctAnswer: "c"
    },
    {
      question: "Rotation in different planes require the balancing of-",
      answers: {
        a: "Force",
        b: "Moment",
        c: "Both",
        d: "None of these"
      },
      correctAnswer: "c"
    },
    {
      question: "Gear box is an example of-",
      answers: {
        a: "Balancing in one plane",
        b: "Balancing in different plane",
        c: "Reciprocating balancing",
        d: "None of these"
      },
      correctAnswer: "b"
    },
    {
      question: "In balancing of multiple mass in multiple plane, the net force and moment should be-",
      answers: {
        a: "Net force &gt; net moment",
        b: "Net moment &gt; net force",
        c: "Net force = 0, net moment ≠ 0",
        d: "Net force = 0, net moment = 0"
      },
      correctAnswer: "d"
    }
  ];




// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
