// app/models/todo.js

var mongoose = require('mongoose');

// define models =======================
module.exports = mongoose.model('Todo', {
    text: String,
    done: Boolean
});
