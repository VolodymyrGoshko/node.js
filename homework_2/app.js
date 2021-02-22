const express = require('express');
const app = express();
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'static')));
app.set('view engine','.hbs');
app.engine('.hbs',expressHbs({
    defaultLayout: false
}))
app.set('views', path.join(__dirname,'static'));

const pathFromUsers = path.join(__dirname,'data','users.json');


//  Error
app.get('/error',(req, res) => {
    res.render('error');
})


// Registration
app.get('/registration', (req, res) => {
    res.render('registration');
})

app.post('/registration',(req, res) => {
    fs.readFile(pathFromUsers,(err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let users = JSON.parse(data.toString());
        let {name,email,password} = req.body
        let find = users.find(value => value.email === email)


        if (find) {
            res.redirect('/error');
            return;
        }
        users.push(req.body)
        fs.writeFile(pathFromUsers,JSON.stringify(users),err1 => {
            if (err1) {
                console.log(err1);
            }
            res.redirect('/users');
        })
    })
})

app.get('/users',(req, res) => {
    fs.readFile(pathFromUsers,(err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let allUsers = JSON.parse(data.toString());
        res.render('users',{users:allUsers});
    })
})

app.get('/users/:userId',(req, res) => {
    const {userId} = req.params;
    fs.readFile(pathFromUsers,(err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let parse = JSON.parse(data.toString());
        res.json(parse[userId])
        res.render('user',{parse:[userId]});
    })
})


//  Авторизація
app.get('/login',(req, res) => {
    res.render('login');
})

app.post('/login',(req, res) => {
    fs.readFile(pathFromUsers,(err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        let users = JSON.parse(data.toString());
        let {email,password} = req.body;
        let find = users.find(user => user.email === email && user.password === password);
        const stringify = JSON.stringify(find);
        if (!find) {
            res.redirect('/registration');
            return;
        }
        res.redirect(`/users/${stringify}`)
    })
})


app.listen(5000,() => {
    console.log('App work')
})
