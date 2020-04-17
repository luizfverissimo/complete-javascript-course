// Function constructor
/*
var john = {
  name: "John",
  yearOfBirth: 1990,
  job: "teacher",
};

var Person = function (name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
  }

Person.prototype.calculateAge = function(){
    console.log(2020 - this.yearOfBirth)
  }

Person.prototype.lastName = 'Smith'

var john = new Person("John", 1990, "teacher");
var jane = new Person('Jane', 1969, 'designer')
var mark = new Person('Mark', 1948, 'retired')

john.calculateAge()
jane.calculateAge()
mark.calculateAge()

console.log(john.lastName)
console.log(jane.lastName)
console.log(mark.lastName)

var RuningDistante = function (name, distance, time){
    this.name = name
    this.distance = distance
    this.time = time
}

RuningDistante.prototype.velocity = function(){
    console.log(`${this.name} percorreu ${this.distance} Km em ${this.time} horas, sua velocidade foi de ${this.distance / this.time} km/h`)
}

var john1 = new RuningDistante('John', 15, 1.2)
var mark1 = new RuningDistante('Mark', 12, .5)
var jane1 = new RuningDistante('Jane', 42, 4)

john1.velocity()
mark1.velocity()
jane1.velocity()
*/

//Object.creat
/*
var personProto = {
  calculateAge: function(){
    console.log(2020 - this.yearOfBirth)
  }
}

var john = Object.create(personProto)
john.name = 'John'
john.yearOfBirth = 1990
john.job = 'teacher'

var jane = Object.create(personProto,
  {
    name: {value: 'Jane'},
    yearOfBirth: {valeu: 1969},
    job: {value: 'designer'}

})
*/
/*
//Primitives vs Objetcts

//Primitives
// variáveis guardando primitivos, a variável b guardou uma cópia de a(23)
var a = 23
var b = a
a = 46
console.log(a)//mostra 46
console.log(b)//mostra 23

//objects
var obj1 = {
  name: 'John',
  age: 26
}

var obj2 = obj1 //ambos guarda uma referência que apontam para o mesmo local da memória
obj1.age = 30
console.log(obj1.age)// mostra 30
console.log(obj2.age)// mostra 30

//Functions

var age = 26
var obj = {
  name: 'Jonas',
  city: 'Lisbon'
}

function change(a, b){
  a = 30
  b.city = 'San Francisco'
}

change(age, obj)
console.log(age)
console.log(obj.city)
*/

//Functions: passing functions as arguments
/*
var years = [1990, 1965, 1937, 2005, 1998];
function arrayCalc(arr, fn) {
  var arrRes = [];
  for (var i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  return arrRes;
}

function calculateAge(el) {
  return 2020 - el;
}

function isFullAge(el) {
  return el >= 19;
}

function MaxHR(el){
  if (el >= 19 && el <= 81){
    return Math.round(206.9 - (0.67 * el))
  } else {
    return -1
  }
  
}


var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge)
var rates = arrayCalc(ages, MaxHR)

console.log(ages);
console.log(fullAges)
console.log(rates)
*/

//Functions returning Functions
/*
function interviewQuestion(job) {
  if (job === "designer") {
    return function (name) {
      console.log(name + ", can you please explain what UX design is?");
    };
  } else if (job === "teacher") {
    return function (name) {
      console.log(`What subject do you teach, ${name}?`);
    };
  } else {
    return function (name) {
      console.log(`Hello ${name}, what do you do?`);
    };
  }
}

var teacherQuestion = interviewQuestion("teacher");
var designerQUestion = interviewQuestion('designer')

teacherQuestion("John");
designerQUestion('John')
designerQUestion('Jane')
designerQUestion('Mark')

interviewQuestion('teacher')('Mark')
*/
/*
// IIFE
(function (goodLuck) {
  var score = Math.random() * 10
  console.log(score >= 5 - goodLuck)
})(5); //cria um novo escopo escondido da variável global - privacidade de dados - não conseguimos acessar de fora
*/

//Closures
/*
function retirement(retirementAge){
  var a = ' year left until retirement.'
  return function(yearOfBirth){
    var age = 2020 - yearOfBirth
    console.log((retirementAge - age) + a)
  }
}

var retirementUS = retirement(66)
retirementUS(1990)
var retirementGermany = retirement(65)
retirementGermany(1990)
var retirementIceland = retirement(67)
retirementIceland(1990)
*/

//Interview example with closures
// minha resolução:
/*
function interviewQuestion(name){
  var teacher = `What subject do you teach, ${name}?`
  var design = name + ", can you please explain what UX design is?"
  var a = `Hello, ${name}!`
  return function(job){
    if (job === 'designer'){
      console.log(design)
    } else if (job === 'teacher'){
      console.log(teacher)
    } else {
      console.log(a)
    }
  }
}

var john = interviewQuestion('John')
var mark = interviewQuestion('Mark')
var jane = interviewQuestion('Jane')

john('teacher')
mark('designer')
jane('')
*/
//resolução do professor
/*
function interviewQuestion(job){
  return function(name){
    if(job === 'designer'){
      console.log(name + ", can you please explain what UX design is?")
    } else if (job === 'teacher'){
      console.log(`What subject do you teach, ${name}?`)
    } else {
      console.log(`Hello ${name}, what do you do?`)
    }
  }
}

interviewQuestion('designer')('John')
*/

// Bind, Call and Apply

var john = {
  name: "John",
  age: 26,
  job: "teacher",
  presentation: function (style, timeOfDay) {
    if (style === "formal") {
      console.log(
        `Good ${timeOfDay}, Ladies and gentlemen! I'm ${this.name}, I'm a ${this.job} and I'm ${this.age} years old.`
      );
    } else if (style === "friendly") {
      console.log(
        `Hey! What's up? I'm ${this.name}, I'm a ${this.job} and I'm ${this.age} years old. Have a nice ${timeOfDay}`
      );
    }
  },
};

var emily = {
  name: "Emily",
  age: 35,
  job: "designer",
};

john.presentation("formal", "morning");
john.presentation.call(emily, "friendly", "afternoon");

//john.presentation.apply(emily, ['friendly', 'afternoon'])

var johnFriendly = john.presentation.bind(john, "friendly");
johnFriendly("morning");
johnFriendly("night");

var emilyFormal = john.presentation.bind(emily, "formal");
emilyFormal("afternoon");
