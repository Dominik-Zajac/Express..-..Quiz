const question = document.querySelector('#question');

function fillQuestionElements(data) {
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

function sendAnswer(answerIndex) {
    fetch(`/answer/${answerIndex}`, {
            method: 'POST',
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        });
};

const buttonsAnswer = document.querySelectorAll('button');

for (const button of buttonsAnswer) {
    button.addEventListener('click', (event) => {
        const answerIndex = event.target.dataset.answer;
        sendAnswer(answerIndex);
    });
};