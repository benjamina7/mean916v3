// app/routes.js

var path = require("path");
var Todo = require('./models/todo');

module.exports = function(app) {

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
        res.sendFile('./public/index.html', { root: path.join(__dirname, '/..') }); // load the single view file (angular will handle the page changes on the front-end)
    });
}