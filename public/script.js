const question = document.querySelector('#question');
const gameBoard = document.querySelector('#game-board');
const subtitle = document.querySelector('h2');
const buttonsAnswer = document.querySelectorAll('.answer-btn');
const goodAnswersSpan = document.querySelector('#good-answers');
const tipDiv = document.querySelector('#tip');

function fillQuestionElements(data) {
    if (data.winner === true) {
        gameBoard.style.display = 'none';
        subtitle.innerText = 'Wygrana';
        return;
    }

    if (data.loser === true) {
        gameBoard.display = 'none';
        Http2SecureServer.innerText = 'Sprobuj ponownie.';
        return;
    }

    question.innerText = data.question;

    for (const i in data.answers) {
        const answerElement = document.querySelector(`#answer${Number(i) + 1}`);
        answerElement.innerText = data.answers[i];
    };
};

function showNextQuestion() {
    fetch('/question', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            fillQuestionElements(data);
        });
};

showNextQuestion();

function handleAnswerFeedback(data) {
    goodAnswersSpan.innerText = data.goodAnswers;
    showNextQuestion();
};

function sendAnswer(answerIndex) {
    fetch(`/answer/${answerIndex}`, {
            method: 'POST',
        })
        .then(res => res.json())
        .then(data => {
            handleAnswerFeedback(data);
        });
};


for (const button of buttonsAnswer) {
    button.addEventListener('click', (event) => {
        const answerIndex = event.target.dataset.answer;
        sendAnswer(answerIndex);
    });
};

// Call to a friends
function handleFriendsAnswer(data) {
    tipDiv.innerText = data.text;
};

function callToAFriend() {
    fetch('/help/friend', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            handleFriendsAnswer(data);
        });
};

document.querySelector('#callToAFriend').addEventListener('click', callToAFriend);

// Half on half answer
function handleHalfOnHalfAnswer(data) {
    if (typeof data.text === 'string') {
        tipDiv.innerText = data.text;
    } else {
        for (const button of buttonsAnswer) {
            if (data.answersToRemove.indexOf(button.innerText) > -1) {
                button.innerText = '';
            }
        }
    }
};

function halfOnHalf() {
    fetch('/help/half', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            handleHalfOnHalfAnswer(data);
        });
};

document.querySelector('#halfOnHalf').addEventListener('click', halfOnHalf);

// Question to the crowd
function handleCrowdAnswer(data) {
    if (typeof data.text === 'string') {
        tipDiv.innerText = data.text;
    } else {
        data.chart.forEach((percent, index) => {
            buttonsAnswer[index].innerText = `${buttonsAnswer[index].innerText}: ${percent}%`;
        })
    }
};

function questionToTheCrowd() {
    fetch('/help/crowd', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            handleCrowdAnswer(data);
        });
};

document.querySelector('#questionToTheCrowd').addEventListener('click', questionToTheCrowd);