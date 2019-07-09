const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log('Servers is listening at http://localhost:3000/');
});

let goodAnswers = 0;
let callToAFriendUsed = false;
let questionToTheCrowdUsed = false;
let halfOnHalfUsed = false;

const questions = [{
    question: 'Jaki jest najlepszy język programowania?',
    answers: ['C++', 'Fortran', 'JavaScript', 'Java'],
    correctAnswer: 2,
}, {
    question: 'JCzy programowanie jest ciekawe?',
    answers: ['Nie wiem', 'Oczywiście, że tak', 'Nie', 'Tak'],
    correctAnswer: 3,
}, {
    question: 'Chcesz zjeść pizzę?',
    answers: ['Nawet dwie!', 'Jestem na diecie', 'Nie, dziękuję', 'Wolę brokuły'],
    correctAnswer: 0,
}];

app.get('question', (req, res) => {

    if (goodAnswers === questions.length) {
        res.json({
            winner: true,
        });
    } else {
        const nextQuestion = questions[goodAnswers];

        const {
            question,
            answers
        } = nextQuestion;

        res.json({
            question,
            answers,
        });
    }
})