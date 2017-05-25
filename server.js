const express = require('express');
const app = express();
const Sequelize = require('sequelize');
var bodyParser = require('body-parser')

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port

// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());

const sequelize = new Sequelize('postgres://eojappvvfrwmiz:264ba6a763efb8af48a3c7eed42402a5a2c0ffb0e7e5f2758a1361933a4188e6@ec2-54-227-237-223.compute-1.amazonaws.com:5432/dcjoq8j6died7j');
const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  isActive:{
      type: Sequelize.BOOLEAN
  }
});

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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
    let user = req.body.user.id;
    User.update({
            isActive: false
        },
        {where: { id : req.params.id }}
    ).then(()=>{
        res.send(true);
    })
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});


sequelize.sync({force: true}).then(()=>{
    User.bulkCreate([{
        firstName: 'Leanne',
        lastName: 'Flinn',
        email:'Flinn@gmail.com',
        mobile:''
    },{
        firstName: 'Edward',
        lastName: 'Bryd',
        email:'Edward@gmail.com',
        mobile:''
    },{
        firstName: 'Curtis',
        lastName: 'Verde',
        email:'Verde@gmail.com',
        mobile:''
    },
    {
        firstName: 'Rikki',
        lastName: 'Castleman',
        email:'Castleman@gmail.com',
        mobile:''
    },{
        firstName: 'Yuri',
        lastName: 'Shelly',
        email:'Shelly@gmail.com',
        mobile:''
    },{
        firstName: 'Anton',
        lastName: 'Grieve',
        email:'Anton@gmail.com',
        mobile:''
    },{
        firstName: 'Jenna',
        lastName: 'Verde',
        email:'Verde@gmail.com',
        mobile:''
    },{
        firstName: 'Warren',
        lastName: 'Karst',
        email:'Karst@gmail.com',
        mobile:''
    }]).then(()=>{
        app.listen(process.env.PORT || 8080);
    });
});
