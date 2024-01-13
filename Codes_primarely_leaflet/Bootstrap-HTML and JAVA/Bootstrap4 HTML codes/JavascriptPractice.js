//This is basic stuf//
//alert('hello world');//a function that gives a message//
console.log('yo');// we are interacting with the console//
console.error("this is an error for pratice");// console interaction//
// variable //
// in javascript their are three way to get a variable which are var,let and const. generally we do not want to use the var type because of the fact that var is global.

// with let we cas re-assign values//
let age=40;
age=31;
age=24;
age=14;
console.log(age);
// with const you can not do this as you would get an error//

//DATA Types//
// Strings,Numbers,Boolean,Null,Undefined,Symbol//
const name="mustafa";
const agea=21;
const rating=4.5;//their is no float in java script//
const iscool=true;
const x=null
const y =undefined;
let z;
console.log(name,agea,rating,iscool,x,y)
const d= 'temperature,mama,dada'
//to check the type//
console.log(typeof(name));
console.log(typeof(agea));
console.log(typeof(rating));
console.log(typeof(iscool));
console.log(typeof(y));
console.log(typeof(x));
console.log(d.split(','))
// STRINGS//
//concatination//
console.log('My name is'+name+"and i am" + agea + 'years old')
//template literals//
const dad= `My name is ${name} and I am ${agea} years old`
//commands//
console.log(dad)
console.log(dad.length);
console.log(dad.toUpperCase());
console.log(dad.toLowerCase());
console.log(name.substring(0,3).toUpperCase());
console.log(name.split(''));
console.log(d.split(','));
// Their are two ways to create an array//
//The old method//
const numbers=new Array(1,2,3,4,50);
console.log(numbers);
// new method to create arrays//
const numbersa=['mustafa',2,'gotya',3]
console.log(numbersa);
console.log(numbersa.length);
console.log(numbersa[1]);
console.log(numbersa.push('mangoes'));//push is used to enter an element to the last of a list//
console.log(numbersa);
console.log(numbersa.unshift('hahahahah'));// unshift is used to enter an element in the begining of the list//
console.log(numbersa)
numbersa.pop();//same as python//
console.log(numbersa)
//Object Literals//
const person=
{
		Firstname:'Abdal',
		Lastname:'Asif',
		hobies:['sports','playstation','reading'],
		//object within an object//
		address:
		{
			street:'lsls',
			city:'islaabasd'

		}

}
console.log(person)//to get all of the object//
console.log(person.Lastname)//the get Lastname from the object//
console.log(person.address.city)
console.log(person.hobies[2])
console.log(person.address.street)
//new method//
const{Firstname,Lastname,address:{city}}=person
console.log(Firstname)
//Arrays of objects//
const todos=
[
	{
		id:1,
		text:'meeting with my boss'

	},
	{
		id:2,
		text:'damn danieal'

	},
	{
		id:3,
		text:'girl that booty looks proper'

	}
	
];

console.log(todos)
console.log(todos[1].text.substring(0,4))
//converting the object into JSON format//
const todosJason=JSON.stringify(todos);
console.log(todosJason)
//for//
for (var i = 0; i < 10; i++) {// first thing in for is the variable than comes the condition and then iteration.
	if (i%2==0){
		console.log(i);
	}
	else{
		console.log("odd");
	}
}
const list=[1,2,3,4]
const list2=[1,2,3]
var f=0
for (var i =0; i<list.length; i++) {
	f=f+list[i];
	console.log(f)
}

//While loop//
let j=0;
let e=0;
while(j<list2.length){
	e=e+list2[j]
	console.log(e)
	j++
}
// High order array methdo for itterations in array//
// map (which creates a new array from an array so output is in the form of array),filter(which creates a new array based on the conditions you give)//
todos.forEach(function(todo){
	console.log(todo.text)
});
//forEach by arow method
//map
todos.forEach((todo)=> console.log(todo.text))
const java= todos.map(function(todo){
	return todo.text;
});
console.log(java);
//filter
const javad= todos.filter(function(todo){
	return todo.id%2===0;//third = matches the data types
});
console.log(javad);
// map and fiter combined
const javadi= todos.filter(function(todo){
	return todo.id%2===0 || todo.id==2;
}).map(function(todoz){
	return todoz.text;
});
console.log(javadi)
//Turnery operater which is used to assign a value based on a condition
const variable=10
const newvariable= variable>10 ? "red" : "blue" // ? refers to THEN and : refers to else
console.log("Your variable is",newvariable)
// switches which are used to evaluate conditions
switch (newvariable) { // it is the name of the variable on which you apply conditioning
	case "red":
		console.log("your color is red") // it would return this value if this condition is statisfied
		break;
	case "blue":
		console.log("your color is blue")
		break;
	default:
		console.log("You choosed wrong Mofo")
		break;
}
// Functions
function AddNums(num1,num2){  
	return num1 + num2;
}
console.log(AddNums(4,5))
// or you can create functions like this
function SubNum(num1,num2){
	console.log(num1 - num2);
}
SubNum(10,4)
// Arow functions are a new method to write functions 
const AddNumss = (num1,num2) =>{  
	return num1 + num2;
}
console.log(AddNumss(4,5))
// in Arow Functions you donot need the {} brackets and you do not need the return as well
const Mulnums= (num1,num2)=> num1 * num2 
console.log("The function returns the result",Mulnums(2,2))
// for single variable you donot need the ()


// object orientaded programming

//Constructor Function
function being(Firstnames,Lastnames,DOB){
	this.Firstnames=Firstnames;
	this.Lastnames=Lastnames;
	//this.DOB=DOB; to pass it as a string
	this.DOB=new Date(DOB) //to pass it as a string object
	this.getmon= function(){ // to get dob
		return this.DOB.getMonth()
	}
	this.GetFullName= function()
	{
		return `${this.Firstnames}  ${this.Lastnames}` // to return the first and last name costum funtion
	}
}
//Instantiate objects
const being1=new being("Mustafa","Haider","5-2-1998");
const being2=new being("Abdal","Asif","6-7-1998");
console.log("This is the result",being1)
console.log("This is the result of the second",being2)
console.log("the year Abdal was born is",being2.DOB.getFullYear())
console.log("The FullName is",being1.GetFullName())
console.log("The Month is",being2.getmon())
// Creating a Class
class playstation {
	Constructor(names,deveoper,DOB){
	this.names=names;
	this.developers=developers;
	//this.DOB=DOB; to pass it as a string
	this.DOB=new Date(DOB)
	}

}
const  playstation4= new playstation("SpiderMan","Insomaniac","4-5-2018");
console.log("The Name of the game is", playstation4.Firstnames);

//DOM
console.log(window);// it represents all the objets that can be used
// Element selectors
// Single Selector
const element= document.getElementById('forumn')
console.log("The element selected is",element)
const query= document.querySelector('h1') // different method do get element
console.log("The element you selected through querySelector is",query)
//Multiple Selector
const multi= document.querySelectorAll('.item')
console.log("Your nodelist is",multi)
multi.forEach((mul)=>console.log(mul))
//multi.firstElementChild.textContent="hello"
const kab=document.querySelector('.btn');
//kab.style.background = 'red' 
// the addEventListener takes two arguments one in the '' is the event and the other is the function
// in some cases the function requires the event parameter function(e) where e is the event parameter
//kab.addEventListener('click',function color(){
//kab.addEventListener('mouseover',function color(){
kab.addEventListener('mouseout',function color(){
	//color.preventDefault();
	//console.log(color);
	document.querySelector('#forumn').style.background = 'red'
	//multi.lastElementChild.innerHTML='<h1>Baba</h1>';
});