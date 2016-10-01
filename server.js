// server.js

// setup ===================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');                     // log requests to the console (express4)
var bodyParser = require('body-parser');            // pull information from HTML POST (express4)
var methodOverride = require('method-override');    // simulate DELETE and PUT (express4)

// configuration =====================

// pull environment variables from cf user defined service
var vcap_services = JSON.parse(process.env.VCAP_SERVICES);
//console.log('vcap_services: ' + vcap_services);

// assign mongodb credentials from cf env vars
var _MONGO_USER = vcap_services["user-provided"]["0"].credentials.username;
//console.log('_MONGO_USER: ' + _MONGO_USER);
var _MONGO_PW = vcap_services["user-provided"]["0"].credentials.password;
//console.log('_MONGO_PW: ' + _MONGO_PW);
var _MONGO_URL = vcap_services["user-provided"]["0"].credentials.url;
//console.log('_MONGO_URL: ' + _MONGO_URL);

mongoose.connect('mongodb://' + _MONGO_USER + ':' + _MONGO_PW + '@' + _MONGO_URL);

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// define models =======================
var Todo = mongoose.model('Todo', {
    text: String
});

// sets port 8080 to default or unless otherwise specified in the environment
app.set('port', process.env.PORT || 8080);

// routes ==================

    // api ----------------------------------

        // get all todos
        app.get('/api/todos', function(req, res) {
            // use mongoose to get all todos in the db
            Todo.find(function(err, todos) {
                // if error retreiving datam send the error
                if (err) {
                    res.send(err);
                }

                res.json(todos);
            });
        });

        // create todo and send back all todos after creation
        app.post('/api/todos', function(req, res) {
                // create a todo
                Todo.create({
                    text: req.body.text,
                    done: false
                }, function(err, todo) {
                    if (err) {
                        res.send(err);
                    }

                    // get and return all the todos after you create another
                    Todo.find(function(err, todos) {
                        if(err) {
                            res.send(err);
                        }

                        res.json(todos);
                    });
                }
            );
        });

        // delete a todo
        app.delete('/api/todos/:todo_id', function(req, res) {
            Todo.remove({
                _id : req.params.todo_id
            }, function(err, todo) {
                if (err)
                    res.send(err);

                // get and return all the todos after you create another
                Todo.find(function(err, todos) {
                    if (err)
                        res.send(err)
                    res.json(todos);
                });
            });
        });

    // app ----------------------
    app.get("*", function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

var _PORT = app.get('port');
app.listen(_PORT);
console.log("App listening on port " + _PORT);
