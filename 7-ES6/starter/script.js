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