///////////////////////////////////////
// Lecture: Hoisting

//functions

/*
//function declaration
//calcAge(1990) - pode funcionar antes da function declaration
function calcAge(year){
    console.log(2020 -year)
}

//function expression
//retirement(1990) - só funciona se for colocado após a function expression
var retirement = function(year){
    console.log(65 - (2020 - year))
}
//variables

//console.log(age) - retorna undefined - todas as variaveis são criadas undefined - para utilizar essa variavel precisa ser após a sua definição
var age = 23 // armazenado no global exection context object
console.log(age)

function foo(){
    var age = 65 //armazenado no foo exection context object
    console.log(age)
}

foo()
console.log(age)// pega a informação da variável global
*/


///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third() //devido a lexicalidade essa função consegue chamar a função third()
    }
}

function third() { //essa função somente pode acessar as variáveis A e D
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword

//console.log(this)
/*
calcAge(1985)

function calcAge(year){
    console.log(2020 - year)
    console.log(this)
}
*/

var john = {
    name: 'John',
    yearOfBirth: 1990,
    calculateAge: function(){
        console.log(this)
        console.log(2020 - this.yearOfBirth)
        /*
        function innerFunction(){
            console.log(this)
        }
        innerFunction()
        */
    }
}

john.calculateAge()

var mike = {
    name: 'Mike',
    yearOfBirth: 1984
}

mike.calculateAge = john.calculateAge
mike.calculateAge()




