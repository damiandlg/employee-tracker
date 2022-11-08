const express = require('express');
const promptUser = require("./index");
const PORT = process.env.PORT || 3001;
const db = require('./db/ connect')
const app = express();


app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req, res) => {
    res.status(404).end();
});



db.connect(err => {
    if (err) throw err;
    console.log('Database Connected');
    app.listen(PORT, () => {
        console.log(`Server Running ${PORT}`);
        promptUser();
    });
});

