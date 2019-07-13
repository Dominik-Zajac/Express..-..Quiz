function gameRoutes(app) {
    let goodAnswers = 0;
    let isGameOver = false;

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
};

module.exports = gameRoutes;