const totalQuestions = 20;
let currentQuestion = 1;
let answers = {};
let timeRemaining = 10 * 60; // 10 minutes in seconds
let timer;
let questions = [
    { question: "What is the capital of France?", answers: ["Berlin", "Madrid", "Paris", "Lisbon"], correctAnswer: "c" },
    { question: "Who wrote 'Hamlet'?", answers: ["Shakespeare", "Dickens", "Tolstoy", "Homer"], correctAnswer: "a" },
    { question: "Which planet is closest to the Sun?", answers: ["Venus", "Mercury", "Earth", "Mars"], correctAnswer: "b" },
    { question: "Which chemical element has the symbol O?", answers: ["Oxygen", "Gold", "Osmium", "Oganesson"], correctAnswer: "a" },
    { question: "Which country won the 2018 FIFA World Cup?", answers: ["Brazil", "France", "Germany", "Argentina"], correctAnswer: "b" },
    { question: "What is the largest ocean?", answers: ["Atlantic", "Indian", "Arctic", "Pacific"], correctAnswer: "d" },
    { question: "Who painted the Mona Lisa?", answers: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"], correctAnswer: "b" },
    { question: "Which gas is most abundant in the Earth's atmosphere?", answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correctAnswer: "c" },
    { question: "What is the square root of 144?", answers: ["10", "11", "12", "13"], correctAnswer: "c" },
    { question: "Which animal is known as the king of the jungle?", answers: ["Lion", "Tiger", "Elephant", "Leopard"], correctAnswer: "a" },
    { question: "What is the smallest country in the world?", answers: ["Monaco", "Vatican City", "Malta", "Liechtenstein"], correctAnswer: "b" },
    { question: "Which country hosted the 2008 Summer Olympics?", answers: ["China", "USA", "Brazil", "Russia"], correctAnswer: "a" },
    { question: "Which element is essential for bones and teeth?", answers: ["Iron", "Calcium", "Zinc", "Magnesium"], correctAnswer: "b" },
    { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Mars", "Jupiter", "Saturn"], correctAnswer: "b" },
    { question: "Which is the largest mammal?", answers: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], correctAnswer: "b" },
    { question: "What is the capital of Japan?", answers: ["Beijing", "Seoul", "Tokyo", "Bangkok"], correctAnswer: "c" },
    { question: "What is capital of India?", answers: ["Goa", "New  delhi", "Mumbai", "Hyderabad"], correctAnswer: "b" },
    { question: "What is the main ingredient in guacamole?", answers: ["Tomato", "Avocado", "Pepper", "Onion"], correctAnswer: "b" },
    { question: "Which metal is liquid at room temperature?", answers: ["Gold", "Iron", "Mercury", "Silver"], correctAnswer: "c" },
    { question: "Which ocean is the largest?", answers: ["Atlantic", "Pacific", "Indian", "Arctic"], correctAnswer: "b" }
];

document.getElementById('userForm').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('userInfo').style.display = 'none';
    document.getElementById('quizSection').style.display = 'flex';
    startTimer();
    generateQuestionNumbers();
    displayQuestion(currentQuestion);
});

function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;
        document.getElementById('timer').textContent = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            showResults('Time up!');
        }
    }, 1000);
}

function generateQuestionNumbers() {
    const questionList = document.getElementById('questionList');
    for (let i = 1; i <= totalQuestions; i++) {
        const li = document.createElement('li');
        li.textContent = i;
        li.id = `question_${i}`;
        li.addEventListener('click', () => displayQuestion(i));
        questionList.appendChild(li);
    }
}

function displayQuestion(questionNumber) {
    const questionContainer = document.getElementById('questionsContainer');
    const question = questions[questionNumber - 1];

    let questionHTML = `<h2>Question ${questionNumber}: ${question.question}</h2>`;
    questionHTML += `<ul class="answer-options">`;
    question.answers.forEach((answer, index) => {
        const answerLetter = String.fromCharCode(97 + index); // a, b, c, d
        questionHTML += `<li>
            <label><input type="radio" name="q${questionNumber}" value="${answerLetter}"> ${answer}</label>
        </li>`;
    });
    questionHTML += `</ul>`;

    if (questionNumber < totalQuestions) {
        questionHTML += `<button id="nextButton">Next</button>`;
    } else {
        questionHTML += `<button id="submitButton">Submit</button>`;
    }

    questionContainer.innerHTML = questionHTML;

    document.querySelectorAll(`input[name="q${questionNumber}"]`).forEach((input) => {
        input.addEventListener('change', () => {
            answers[questionNumber] = input.value;
            document.getElementById(`question_${questionNumber}`).classList.add('answered');
            if (questionNumber < totalQuestions) {
                document.getElementById('nextButton').addEventListener('click', () => displayQuestion(questionNumber + 1));
            } else {
                document.getElementById('submitButton').addEventListener('click', () => showResults());
            }
        });
    });
}

function showResults(message = 'Quiz Complete!') {
    let score = 0;
    questions.forEach((q, index) => {
        if (answers[index + 1] === q.correctAnswer) {
            score++;
        }
    });

    const userInfoDisplay = document.getElementById('userInfoDisplay');
    userInfoDisplay.innerHTML = `
        <h2>${message}</h2>
        <p>Name: ${document.getElementById('name').value}</p>
        <p>Roll No: ${document.getElementById('rollNo').value}</p>
        <p>Branch: ${document.getElementById('branch').value}</p>
        <p>Your Score: ${score} / ${totalQuestions}</p>
        <button class="btn" id="exitButton">EXIT</button>
        <button class="btn" id="reviewButton">Review</button>
    `;
    userInfoDisplay.style.display = 'block';
    document.getElementById('quizSection').style.display = 'none';
    document.getElementById('userInfoDisplay').scrollIntoView({ behavior: 'smooth' });

    clearInterval(timer);

    document.getElementById('exitButton').addEventListener('click', () => window.location.reload());
    document.getElementById('reviewButton').addEventListener('click', () => showReview());
}

function showReview() {
    const reviewSection = document.getElementById('userInfoDisplay');
    let reviewHTML = '<h2>Review Your Answers</h2>';
    questions.forEach((q, index) => {
        const questionNumber = index + 1;
        reviewHTML += `<div>
            <h3>Question ${questionNumber}: ${q.question}</h3>
            <ul class="answer-options">
                ${q.answers.map((answer, i) => `
                    <li style="color: ${answers[questionNumber] === String.fromCharCode(97 + i) ? (answers[questionNumber] === q.correctAnswer ? 'green' : 'red') : 'black'}">
                        ${String.fromCharCode(97 + i)}. ${answer}
                    </li>
                `).join('')}
            </ul>
        </div>`;
    });
    reviewSection.innerHTML = reviewHTML;
}
