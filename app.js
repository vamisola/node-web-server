const express = require('express');
const fs = require('fs');

var app = express();

app.set('view engine', 'ejs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});


app.use((req, res, next) => {
    res.render('maintenance');
});

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.render('home', {
         pageTitle: 'Home Page',
         welcomeMessage: 'Welcome to my website',
    });
});

app.get('/about', (req,res) => {
    res.render('about',{
        pageTitle: 'About Page',
    });
});

// /bad - send back json with errorMessage

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
    
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log('server is up and running!');
});