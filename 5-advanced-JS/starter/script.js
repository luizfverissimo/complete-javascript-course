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
