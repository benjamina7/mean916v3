// public/core.js

var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page get all the todos from the node api and show them
    $http.get('api/todos') // do a get call to the api
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // $scope.todos = [{
    //                     "_id": {
    //                         "$oid": "57eded6090f72323641698fb"
    //                     },
    //                     "text": "z great test 001",
    //                     "__v": 0
    //                 }];

    // when submitting the add form, send the text to the node api
    $scope.createTodo = function() {
        console.log('createTodo()');
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    // delete a todo after checking it
    $scope.deleteTodo = function(id) { 
        console.log('deleteTodo()');
        if (id == undefined)
            return;
            
        $http.delete('api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
}