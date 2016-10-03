// js/controllers/main.js

angular.module('todoController', [])

    // inject the Todo service factory into our controller
    .controller('mainController', function($scope, $http, Todos) {
        $scope.formData = {};

        // GET =======================
        // when landing on the page get all the todos from the node api and show them
        // use the service to get all the todos
        Todos.get()
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        //$scope.todos = [{"_id": {"$oid": "57eded6090f72323641698fb"},"text": "z great test 001","__v": 0}];

        // CREATE =======================
        // when submitting the add form, send the text to the node api
        $scope.createTodo = function() {
            console.log('createTodo()');

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            // people can't just hold enter to keep adding the same to-do anymore
            if (!$.isEmptyObject($scope.formData)) {

                // call the create function from our service (returns a promise object)
                Todos.create($scope.formData)
                    .success(function(data) {
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.todos = data;
                    });

            }
        }

        // DELETE ===============================
        // delete a todo after checking it
        $scope.deleteTodo = function(id) { 
            console.log('deleteTodo()');
            if (id == undefined)
                return;

            Todos.delete(id)
                .success(function(data) {
                    $scope.todos = data;
                });
        }
    });