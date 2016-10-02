// server.js

// setup ===================
var express = require('express');
var app = express();
var cfenv = require("cfenv");
var mongoose = require('mongoose');
var morgan = require('morgan');                     // log requests to the console (express4)
var bodyParser = require('body-parser');            // pull information from HTML POST (express4)
var methodOverride = require('method-override');    // simulate DELETE and PUT (express4)

// configuration =====================

// force the port
var _PORT = 8080;
if (process == undefined)
    process = new process();
if (process.env == undefined)
    process.env = {};
process.env.PORT = _PORT;
app.set('port', _PORT);

// pull environment variables from cf user defined service
var appEnv = cfenv.getAppEnv();
//console.log(JSON.stringify(appEnv));
//console.log('process.env.MyEnvironmentVariable1 : ' + process.env.MyEnvironmentVariable1);

var mongoCredentials = appEnv.getServiceCreds('mongolab1');
//console.log('getServiceCreds: ' + JSON.stringify(mongoCredentials));


mongoose.connect('mongodb://' + mongoCredentials.username + ':' + mongoCredentials.password + '@' + mongoCredentials.url);

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

app.listen(appEnv.port, appEnv.bind, function() {
    console.log("server starting on " + appEnv.url + " !");
});
