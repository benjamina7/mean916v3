// spec.js

describe('Filters', function(){ //describe your object type
    beforeEach(module('Testorama')); //load module
    describe('reverse',function(){ //describe your app name
        var reverse;
        beforeEach(inject(function($filter){ //initialize your filter
            reverse = $filter('reverse',{});
        }));
        it('Should reverse a string', function(){  //write tests
            expect(reverse('don')).toBe('nod'); //pass
            expect(reverse('Sweet')).toBe('teewS'); //pass
            //expect(reverse('bort')).toBe('license plate'); // this test should fail
        });
    });
});