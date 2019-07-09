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
    question: 'Jaki jest najlepszy język programowania?',
    answers: ['C++', 'Fortran', 'JavaScript', 'Java'],
    correctAnswer: 2,
}, {
    question: 'Jaki jest najlepszy język programowania?',
    answers: ['C++', 'Fortran', 'JavaScript', 'Java'],
    correctAnswer: 2,
}]