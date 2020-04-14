// Function constructor

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