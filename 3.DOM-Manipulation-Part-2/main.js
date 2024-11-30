// TRAVERSING THE DOM
var itemList = document.querySelector("#items");
//parentNode
// console.log(itemList.parentNode);
// itemList.parentNode.style.background = "#f4f4f4";
// console.log(itemList.parentNode.parentNode);

//PARENT ELEMENT
// console.log(itemList.parentElement);
// itemList.parentElement.style.background = "#f4f4f4";

//CHILD NODE
// console.log(itemList.childNodes); // describe with line break
// console.log(itemList.children);
// console.log(itemList.children[1]);
// itemList.children[1].style.background = "yellow";

// FRIST CHILD
// console.log(itemList.firstChild);
// console.log(itemList.firstElementChild);
// itemList.firstElementChild.style.color = "red";

// LAST CHILD
// console.log(itemList.lastChild);
// console.log(itemList.lastElementChild);

//NEXT SIBLING
// console.log(itemList.nextSibling);

//NEXT ELEMENT SIBLING
// console.log(itemList.nextElementSibling);

//PERVIOUS SIBLING
// console.log(itemList.previousSibling);
// console.log(itemList.previousElementSibling);
// itemList.previousElementSibling.style.color = "red";

//CREATE ELEMENT

var newDiv = document.createElement("div"); //CREATE A DIV
newDiv.className = "newDiv"; // adding class
newDiv.id = "newDivId"; // adding id
newDiv.setAttribute("title", "New Div"); //adding attributes

var newDivText = document.createTextNode("Hello New Div"); // create new text node
newDiv.appendChild(newDivText); // adding text into div

// adding new div to DOM
var container = document.querySelector("header .container");
var h1 = document.querySelector("header h1");
container.insertBefore(newDiv, h1);
// styling
newDiv.style.fontSize = "30px";

console.log(newDiv);
