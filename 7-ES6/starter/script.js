///////////////////////////////////////////////////////////////////////////
//Lecture: Let and const

//ES5 code
/*
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller'

console.log(name5);
*/

//ES6
/*
const name6 = 'Jane Smith'
let age6 = 23
name6 = 'Jane Miller' //not work

console.log(name6) 
*/

//ES5
/*
function driversLicense5(passedTest){
    if (passedTest){
        console.log(firstName)
        var firstName = 'John'
        var yeaOfBrith = 1990
    }
    console.log(firstName + 'born in ' + yeaOfBrith + ' is now officialy allowed to drive a car')
}

driversLicense5(true)

//ES6

function driversLicense6(passedTest){
    console.log(firstName)
    let firstName
    const yeaOfBrith = 1990

    if (passedTest){
        firstName = 'John'      

    }
    console.log(firstName + 'born in ' + yeaOfBrith + ' is now officialy allowed to drive a car') //not work - outside of the block
}

driversLicense6(true)
*/
/*
var i = 23

for(var i = 0; i < 5; i++){
    console.log(i)
}

console.log(i)
*/

////////////////////////////////////////////////////////////////////////////
//Blocks and IIFEs
/*
//ES6
{
    const a = 1
    let b = 2
    var c = 3
}

//console.log(a + b)
console.log(c)

//ES5

(function(){

})()
*/

//////////////////////////////////////////////////////////////////////////
//Strings
/*
let firstName = 'John'
let lastName = 'Smith'
const yeaOfBrith = 1990

function calcAge(year){
    return 2020 - year
}

//ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yeaOfBrith + '. Today, he is ' + calcAge(yeaOfBrith) + ' years old.' )

//ES6
console.log(`This is ${firstName} ${lastName}. He was borh in ${yeaOfBrith}. Today, he is ${calcAge(yeaOfBrith)} years old.`)

const n = `${firstName} ${lastName}`
console.log(n.startsWith('J'))
console.log(n.endsWith('th'))
console.log(n.includes('oh'))
*/

///////////////////////////////////////////////////
//Arrow functions:
/*
const years = [1990, 1965, 1982, 1937]

//ES5
var ages5 = years.map(function(el){
    return 2020 - el
})
console.log(ages5)

//ES6
let ages6 = years.map(el => 2020 - el)
console.log(ages6)

ages6 = years.map((el, index) => `Age element ${index + 1}: ${2016 - el}`)
console.log(ages6)

ages6 = years.map((el, index) => {
    const now = new Date().getFullYear()
    const age = now - el
    return `Age element ${index + 1}: ${age}`
})
console.log(ages6)
*/

//////////////////////////////////////////////////////////////////////////////
//Arrow function - lexical this keyword
/*
//ES5
var box5 = {
    color: 'green',
    position: 1,
    clickme: function(){        
        var self = this
        document.querySelector('.green').addEventListener('click', function(){
            var str = 'This box number: ' + self.position + ' and it is ' + self.color
            alert(str) 
        })
    }
}
//box5.clickme()

//ES6

const box6 = {
    color: 'green',
    position: 1,
    clickme: function(){        
        document.querySelector('.green').addEventListener('click',() => {
            var str = 'This box number: ' + this.position + ' and it is ' + this.color
            alert(str) 
        })
    }
}
//box6.clickme()
*/
/*
const box66 = {
    color: 'green',
    position: 1,
    clickme: () => {        
        document.querySelector('.green').addEventListener('click',() => {
            var str = 'This box number: ' + this.position + ' and it is ' + this.color
            alert(str) 
        })
    }
}
box66.clickme()
*/
/*
//ES5
function Person(name){
    this.name = name
}

Person.prototype.myFriends5 = function(friends){
    
    var arr = friends.map(function(el){
        return this.name + ' is friends with' + el
    }.bind(this))
    console.log(arr)
}

var friends = ['Bob', 'Jane', ' Mark']
new Person('John').myFriends5(friends)

//ES6

Person.prototype.myFriends6 = function(friends){    
    let arr = friends.map(el => `${this.name} is friend with ${el}`)
    console.log(arr)
}

new Person('Mike').myFriends6(friends)
*/

//////////////////////////////////////////////////////////////////////////////
//Destrucuring

//ES5
/*
var john = ['John', 26]
var name = john[0]
var age = john[1]
*/
/*
//ES6
const [name, age] = ['John', 26]
console.log(name)
console.log(age)

const obj = {
    firstName: 'John',
    lastName: 'Smith'
}

const {firstName, lastName} = obj
console.log(firstName)
console.log(lastName)

const {firstName: a, lastName: b} = obj
console.log(a)
console.log(b)

function calcAgeRetirement(year){
    const age = new Date().getFullYear() - year
    return [age, 65 - age]
}

const [age2, retirement] = calcAgeRetirement(1990)
console.log(age2)
console.log(retirement)
*/

//////////////////////////////////////////////////////////////////////////////
//Arrays
/*
const boxes = document.querySelectorAll('.box')
*/
//ES5
/*
var boxesArr5 = Array.prototype.slice.call(boxes)

boxesArr5.forEach(function(cur){
    cur.style.backgroundColor = 'dodgerblue'
})
*/
//ES6
/*
const boxesArr6 = Array.from(boxes)
boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue')
*/
/*
//ES5
for(var i = 0; i < boxesArr5.length; i++){
    if(boxesArr5[i].className === 'box blue'){
        continue        
    }

    boxesArr5[i].textContent = 'I changed to blue'
}
*/

//ES6
/*
for(const cur of boxesArr6) {
    if(cur.className.includes('blue')) {
        continue
    }
    cur.textContent = 'I changed to blue'
}
*/
//find elements in an Array
//ES5
/*
var ages = [12, 17, 8, 21, 14, 11]

var full = ages.map(function(cur){
    return cur >= 18
})
console.log(full)

console.log(full.indexOf(true))
console.log(ages[full.indexOf(true)])

//ES6
console.log(ages.findIndex(cur => cur >= 18))
console.log(ages.find(cur => cur >= 18))
*/

/////////////////////////////////////////////////////////////////////////////
//Spread operator
/*
function addFourAges (a, b, c, d){
    return a + b + c + d
}

var sum1 = addFourAges(18, 30, 12, 21)
console.log(sum1)

//ES5
var ages = [18, 30, 12, 21]
var sum2 = addFourAges.apply(null, ages)

console.log(sum2)

//ES6
const sum3 = addFourAges(...ages)
console.log(sum3)

const familySmith = ['John', 'Jane', 'Mark']
const familyMiller = ['Mary', 'Bob', 'Ann']
const bigFamily = [...familySmith, 'Lily', ...familyMiller]

console.log(bigFamily)

const h = document.querySelector('h1')
const boxes = document.querySelectorAll('.box')

const all = [h, ...boxes]
Array.from(all).forEach(cur => cur.style.color = 'purple')
*/

///////////////////////////////////////////////////////////////////////////////
//Rest parameters - function
/*
//ES5
function isFullAge5(){
    //console.log(arguments)
    var argsArr = Array.prototype.slice.call(arguments)
    
    argsArr.forEach(function(cur){
        console.log((2020 - cur) >= 18)
    })
}

//isFullAge5(1990, 2005, 1965)
//isFullAge5(1990, 2005, 1965, 2016, 1987)

//ES6
function isFullAge6(...years){
    years.forEach(cur => console.log((2020 - cur) >= 18))
    
}

//isFullAge6(1990, 2005, 1965)
isFullAge6(1990, 2005, 1965, 2016, 1987)
*/
/*
//ES5
function isFullAge5(limit){
    //console.log(arguments)
    var argsArr = Array.prototype.slice.call(arguments, 1)
    //console.log(argsArr)
    argsArr.forEach(function(cur){
        console.log((2020 - cur) >= limit)
    })
}

//isFullAge5(16, 1990, 2005, 1965)
//isFullAge5(1990, 2005, 1965, 2016, 1987)

//ES6
function isFullAge6(limit, ...years){
    years.forEach(cur => console.log((2020 - cur) >= limit))
    
}

//isFullAge6(1990, 2005, 1965)
isFullAge6(16, 1990, 2005, 1965, 2016, 1987)
*/

///////////////////////////////////////////////////////////////////////////////
//Defaut parameters
/*
function SMithPerson(firstName, yearOfBrith, lastName, nationality) {
  lastName === undefined ? lastName = "Smith" : lastName = lastName;
  nationality === undefined ? nationality = 'american' : nationality = nationality

  this.firstName = firstName;
  this.yearOfBrith = yearOfBrith;
  this.lastName = lastName;
  this.nationality = nationality;
}

var john = new SMithPerson("John", 1990);

var emily = new SMithPerson('Emily', 1983, 'Diaz', 'spanish')
*/
/*
//ES6
function SmithPerson (firstName, yearOfBirth, lastName = 'Smith', nationality = 'american') {
    this.firstName = firstName;
    this.yearOfBirth = yearOfBirth;
    this.lastName = lastName;
    this.nationality = nationality;
}

var john = new SmithPerson("John", 1990);

var emily = new SmithPerson('Emily', 1983, 'Diaz', 'spanish')
*/

///////////////////////////////////////////////////////////////////////////////
//Maps - data structure
/*
const question = new Map()

question.set('question', 'What is the offical name of the lastest major JavaScript version?')
question.set(1, 'ES5')
question.set(2, 'ES6')
question.set(3, 'ES2015')
question.set(4, 'ES7')
question.set('correct', 3)

question.set(true, 'Correct answer!')
question.set(false, 'Wrong, try again')

console.log(question.get('question'))
//console.log(question.size)

if (question.has(4)) {
    //question.delete(4)
    //console.log('Answer 4 is here')
}

//question.clear()

//question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}`))

for (let [key, value] of question.entries()){
    if (typeof(key) === 'number'){
        console.log(`Answer ${key}: ${value}`)
    }
}

const ans = parseInt(prompt('Write the correct answer'))

console.log(question.get(ans === question.get('correct')))
*/

///////////////////////////////////////////////////////////////////////////////
//Classes

//ES5
/*
var Person5 = function(name, yearOfBirth, job) {
    this.name = name
    this.yearOfBirth = yearOfBirth
    this.job = job
}

Person5.prototype.calculateAge = function(){
    var age = new Date().getFullYear - this.yearOfBirth
    console.log(age)
}

var john5 = new Person5('John', 1990, 'teacher')

//ES6
class Person6 {
    constructor (name, yearOfBirth, job){
        this.name = name
        this.yearOfBirth = yearOfBirth
        this.job = job
    }

    calculateAge() {
        let age = new Date().getFullYear - this.yearOfBirth
        console.log(age)
    }

    static greetting(){
        console.log('Hey there!')
    }
}

const john6 = new Person6('John', 1990, 'teacher')

Person6.greetting()
*/

///////////////////////////////////////////////////////////////////////////////
//Classe e subclasses

//ES5
/*
var Person5 = function(name, yearOfBirth, job) {
    this.name = name
    this.yearOfBirth = yearOfBirth
    this.job = job
}

Person5.prototype.calculateAge = function(){
    var age = new Date().getFullYear() - this.yearOfBirth
    console.log(age)
}

var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals){
    Person5.call(this, name, yearOfBirth, job)
    this.olympicGames = olympicGames
    this.medals = medals
}



Athlete5.prototype = Object.create(Person5.prototype)

Athlete5.prototype.wonMedal = function(){
    this.medals++
    console.log(this.medals)
}

var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10)
johnAthlete5.calculateAge()
johnAthlete5.wonMedal()

//ES6
class Person6 {
    constructor (name, yearOfBirth, job){
        this.name = name
        this.yearOfBirth = yearOfBirth
        this.job = job
    }

    calculateAge() {
        let age = new Date().getFullYear() - this.yearOfBirth
        console.log(age)
    }
}

class Athlete6 extends Person6 {
    constructor (name, yearOfBirth, job, olympicGames, medals){
        super(name, yearOfBirth, job)
        this.olympicGames = olympicGames
        this.medals = medals
    }

    wonMedal(){
        this.medals++
        console.log(this.medals)
    }
}

const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10)

johnAthlete6.wonMedal()
johnAthlete6.calculateAge()
*/

/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/
///////////////////////////////////////////////////////////////////////////////
//Minha resolução:
///////////////////////////////////////////////////////////////////////////////
//Constructors

class Elements {
    constructor (name, buildYear){
        this.name = name
        this.buildYear = buildYear
    }

    calculateAge(){
        let age = new Date().getFullYear() - this.buildYear
        return age
    }
    
}

class Street extends Elements {
    constructor (name, buildYear, length, size = 'normal'){
        super (name, buildYear)
        this.length = length
        this.size = size
    }
}

class Parks extends Elements {
    constructor(name, buildYear, treeNumber, parkArea){
        super(name, buildYear)
        this.treeNumber = treeNumber
        this.parkArea = parkArea
    }

    calcDensity(){
        let treeDensity = this.treeNumber / this.parkArea
        return treeDensity
    }
}

///////////////////////////////////////////////////////////////////////////////
//Construção de parques (3) e ruas (4).

let parks, streets

let park1 = new Parks('Central Park', 1985, 972, 25)
let park2 = new Parks('East Park', 1990, 2054, 13)
let park3 = new Parks('South Park', 1936, 5430, 165)

let street1 = new Street('1st street', 1936, 5, 'big')
let street2 = new Street('Lincon Avenue', 1976, 13,)
let street3 = new Street('Beira-mar street', 1990, 3, 'huge')
let street4 = new Street('Rural street', 1940, 10, 'small')

parks = [park1, park2, park3]
streets = [street1, street2, street3, street4]

///////////////////////////////////////////////////////////////////////////////
//Dados para o relatório

//Média da idade dos parques
let calcAverageParkAge = () => {
    let sumAges = 0
    let average
    parks.forEach(cur => {
        sumAges += cur.calculateAge()
    })
    average = sumAges / parks.length
    //relatório no console
    console.log(`Our ${parks.length} parks have an average of ${Math.floor(average)} years`)
}

//Calcula a densidade de árvores de cada parque
let treeDensity = () => {
    parks.forEach(cur => {
        console.log(`${cur.name} has a tree density of ${Math.floor(cur.calcDensity())} trees per square km.`)
    })
}

//Parques com mais de 1000 árvores
let treeCount = () => {
    parks.forEach(cur => {
        let limitTree = 1000
        if(cur.treeNumber > limitTree){
            console.log(`${cur.name} has more than ${limitTree} trees`)
        }
    })
}

//Média do comprimento das ruas
let calcAverageStreetLength = () =>{
    let sumLength = 0
    let average
    streets.forEach(cur => sumLength += cur.length)
    average = sumLength / streets.length
    console.log(`Our ${streets.length} streets have a total length of ${sumLength} km, with an average of ${average} km`)
}

let streetsInfo = () => {
    streets.forEach(cur => console.log(`${cur.name}, built in ${cur.buildYear} , is a ${cur.size} street.`))
}

//Função relatório final
let buildReport = () => {
    console.log(`----PARKS REPORT----`)
    calcAverageParkAge()
    treeDensity()
    treeCount()
    console.log(`----STREETS REPORT----`)
    calcAverageStreetLength()
    streetsInfo()
}

buildReport()

///////////////////////////////////////////////////////////////////////////////
//Teacher's Solution - Está na pasta final