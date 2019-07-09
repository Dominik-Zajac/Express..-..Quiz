function showNextQuestion() {
    fetch('/question', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        });
}

showNextQuestion();