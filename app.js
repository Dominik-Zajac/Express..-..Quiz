const express = require('express');

const app = express();

app.listen(3000, () => {
    console.log('Servers is listening at http://localhost:3000/');
});