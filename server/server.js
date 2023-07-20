const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(5001, () => console.log("listening on port 5001"));