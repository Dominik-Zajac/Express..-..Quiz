function gameRoutes(app) {
    let goodAnswers = 0;
    let isGameOver = false;
    let callToAFriendUsed = false;
    let questionToTheCrowUsed = false;
    let halfOnHalfUsed = false;

    const questions = [{
        question: 'Jaki jest najlepszy język programowania?',
        answers: ['C++', 'Fortran', 'JavaScript', 'Java'],
        correctAnswer: 2,
    }, {
        question: 'Czy programowanie jest ciekawe?',
        answers: ['Nie wiem', 'Oczywiście, że tak', 'Nie', 'Tak'],
        correctAnswer: 3,
    }, {
        question: 'Chcesz zjeść pizzę?',
        answers: ['Nawet dwie!', 'Jestem na diecie', 'Nie, dziękuję', 'Wolę brokuły'],
        correctAnswer: 0,
    }];

    app.get('/question', (req, res) => {

        if (goodAnswers === questions.length) {
            res.json({
                winner: true,
            });

        } else if (isGameOver) {
            res.json({
                loser: true
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
    });

    app.post('/answer/:index', (req, res) => {

        if (isGameOver) {
            res.json({
                loser: true,
            });
        }

        const {
            index
        } = req.params;
        const question = questions[goodAnswers];
        const isGoodAnswer = question.correctAnswer === Number(index);

        if (isGoodAnswer) {
            goodAnswers++;
        } else {
            isGameOver = true;
        }

        res.json({
            correct: isGoodAnswer,
            goodAnswers
        })
    });

    app.get('/help/friend', (req, res) => {

        if (callToAFriendUsed) {
            return res.json({
                text: 'To kolo ratunkowe bylo juz wykorzystane.'
            });
        }

        callToAFriendUsed = true;

        const doesFriendKnowAnswer = Math.random() < 0.5;

        const question = questions[goodAnswers];

        res.json({
            text: doesFriendKnowAnswer ? `Hmm, wydaje mi sie ze odpowiedz to ${question.answers[question
                .correctAnswer]}` : 'Hmm, no nie wiem',
        });
    });

    app.get('/help/half', (req, res) => {
        if (halfOnHalfUsed) {
            return res.json({
                text: 'To kolo ratunkowe bylo juz wykorzystane.'
            });
        }

        halfOnHalfUsed = true;

        const question = questions[goodAnswers];

        const answersCopy = question.answers.filter((item, index) => (
            index !== question.correctAnswer
        ));

        answersCopy.splice(~~(Math.random() * answersCopy.length), 1);

        res.json({
            answersToRemove: answersCopy,
        });
    });

    app.get('/help/half', (req, res) => {
        if (halfOnHalfUsed) {
            return res.json({
                text: 'To kolo ratunkowe bylo juz wykorzystane.'
            });
        }

        halfOnHalfUsed = true;

        const question = questions[goodAnswers];

        const answersCopy = question.answers.filter((item, index) => (
            index !== question.correctAnswer
        ));

        answersCopy.splice(~~(Math.random() * answersCopy.length), 1);

        res.json({
            answersToRemove: answersCopy,
        });
    });
};

module.exports = gameRoutes;