const express = require('express');
const app = express();
const Sequelize = require('sequelize');
var bodyParser = require('body-parser')
const config = require('./config');
const sequelize = new Sequelize(config.db_url);
const User = require('./User.model')

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.post('/api/user/create', function (req, res) {
    User.create(req.body.user).then((user)=>{
        res.send(user);
    });
});

app.get('/api/user/all',function(req,res){
    User.findAll().then((users)=>{
        res.send(users);
    });
});

app.get('/api/user/search/:text',function(req,res){
    if(req.params.text != '*'){
        User.findAll({where: { 
            $or:[{firstName : {like :'%'+req.params.text+'%'}},
            {lastName: {like : '%'+req.params.text+'%'}},
            {email: {like : '%'+req.params.text+'%'}}]
        }
        }).then((users)=>{
            res.send(users);
        });
    }else{
        User.findAll().then((users)=>{
            res.send(users);
        });
    }
});

app.get('/api/user/:id',function(req,res){
    User.findById(req.params.id).then((user)=>{
        res.send(user);
    });
});

app.post('/api/user/update',function(req,res){
    let user = req.body.user;
    User.update({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isActive: user.isActive
        },
        {where: { id : user.id }}
    ).then(()=>{
        res.send(true);
    });
});

app.delete('/api/user/:id',function(req,res){
    let user = req.params.id;
    User.destroy(
        {where: { id : req.params.id }}
    ).then(()=>{
        res.send(true);
    })
});


sequelize.sync({force: true}).then(()=>{
    User.bulkCreate(config.users).then(()=>{
        app.listen(8080);
    });
});
