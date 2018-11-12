var express = require('express'),
    cors = require('cors'),
    bodyparser = require('body-parser'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    app = express();

app.use(cors({
  origin: 'http://localhost:4200',
}));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

mongoose.connect('mongodb://localhost:27017/angular2Assesment');


const newUser = mongoose.model('user', {
  firstname: {type: String},
  lastname: {type: String},
  username: {type: String},
  email: {type: String},
  password: {type: String}
});
app.post('/registration', function(req, res) {
  new newUser(req.body).save().then((resp) => {
    res.send({
      status: true
    })
  }, (err) => {
    console.log('Error: ' + err);
  })
});

app.post('/authenticate', (req, res) => {
  var token = jwt.sign({'uname': req.body.username}, 'marlabs-secret-key', {expiresIn: '1h'});

  if(req.body.username && req.body.password) {
    newUser.find({username: req.body.username, password: req.body.password})
      .exec((err, userdata) => {
        if(err) {
          res.send({
            status: false
          })
        } else {
            if(userdata.length === 0) {
              res.send({
                isLoggedIn: false
              })
            } else {
              res.send({
                isLoggedIn: true,
                token: token
              })
            }
          }
      })
    } else {
      res.send({
      status: false
    })
  }
});

app.use(function(req, res, next) {
  var token = req.body.authtoken || req.query.authtoken || req.headers['authtoken'];

  jwt.verify(token, 'marlabs-secret-key', function(err, decoded) {
    if(err) {
      res.send({
        err: true,
        msg: 'Invalid request'
      })
    } else {
      req.decoded = decoded;
      next();
    }
  });
});

const posts = mongoose.model('post', {
  title: {type: String},
  description: {type: String},
  createdBy: {type: String},
  likedBy: {type: Array}
});

app.post('/createpost', function(req, res) {
  var newPost = {
    title: req.body.title,
    description: req.body.description,
    createdBy: req.decoded.uname,
    likedBy: []
  };

  let Post = new posts(newPost);
  Post.save().then((resp) => {
    res.send({
      status: true
    })
  }, (err) => {
    res.send({
      status: err
    })
  })
});

app.get('/getposts', function(req, res) {
  posts.find().exec((err, data) => {
    if(err) {
      res.send({
        status: false
      })
    } else {
      res.send(data);
    }
  });
});

app.post('/updatepost', function(req, res){
  posts.findOneAndUpdate({_id: req.body.post_id}, {title: req.body.title, description: req.body.description},
    function(err, doc){
    if(err) {
      res.send({
        err: err
      })
    } else {
      res.send({
        status: true
      })
    }
  })
});

app.post('/deletepost', function(req, res) {
  posts.findOneAndDelete({_id: req.body.post_id},
    function(err, doc){
      if(err) {
        res.send({
          err: err
        })
      } else {
        res.send({
          status: true
        })
      }
    })
});

const comments = mongoose.model('comments', {
  comment_id: {type: String},
  createdBy: {type: String},
  title: {type: String},
  description: {type: String}
});

app.post('/addcomment', function(req, res) {
  var newComment = {
    comment_id: req.body.post_id,
    createdBy: req.decoded.uname,
    title: req.body.title,
    description: req.body.description
  };

  var Comments = new comments(newComment);
  Comments.save().then((resp) => {
    res.send({
      status: true
    })
  }, (err) => {
    console.log('Error: ' + err);
  })
});

app.get('/getcomments', function(req, res) {
  comments.find({comment_id: req.query.post_id}).exec((err, data) => {
    if(err) {
      res.send({
        status: false
      })
    } else {
      res.send(data);
    }
  })
});


app.listen(3000, function(){
  console.log('App is running @ localhost:3000');
});
