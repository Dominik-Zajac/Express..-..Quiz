import {
    Http2SecureServer
} from 'http2';

const question = document.querySelector('#question');
const gameBoard = document.querySelector('#game-board');
const subtitle = document.querySelector('h2');

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

const goodAnswersSpan = document.querySelector('#good-answers');

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

const buttonsAnswer = document.querySelectorAll('button');

for (const button of buttonsAnswer) {
    button.addEventListener('click', (event) => {
        const answerIndex = event.target.dataset.answer;
        sendAnswer(answerIndex);
    });
};

function callToAFriend() {
    fetch('/help/friend', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        });
};