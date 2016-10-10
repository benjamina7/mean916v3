// public/js/testorama.js

angular.module('Testorama', [])
.filter('reverse',[function(){
    return function(string){
        return string.split('').reverse().join('');
    };
}]);