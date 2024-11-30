//Examine the Codument Object
// console.dir(document);
// console.log(document.domain);
// console.log(document.URL);
// console.log(document.title);
// // document.title = "Hello";
// console.log(document.head);
// console.log(document.body);
// console.log(document.all);
// console.log(document.all[10]);

// console.log(document.forms);
// console.log(document.links);
// console.log(document.images);

//Get Element By Id
// console.log(document.getElementById("header-title"));
// const headerTitle = document.getElementById("header-title");
// const header = document.getElementById("main-header");
// console.log(headerTitle);
// headerTitle.textContent = "Hello";
// headerTitle.innerText = "Hey";
// console.log(headerTitle.textContent);
// console.log(headerTitle.innerText);
// headerTitle.innerHTML = "<h1>Hello</h1>";
// header.style.borderBottom = "solid 3px black";

// GET ELEMENTS CLASS NAME
var items = document.getElementsByClassName("list-group-item");
// console.log(items);
// console.log(items[1]);
// items[1].textContent = "Hello 2";
// items[1].style.fontWeight = "bold";
// items[1].style.background = "yellow";

for (var i = 0; i < items.length; i++) {
  if (i % 2 === 0) {
    items[i].style.background = "#f4f4f4";
  } else {
    items[i].style.background = "#aaa";
  }
}

// GET ELEMENTS BY TAG NAME

var li = document.getElementsByTagName("li");
console.log(li);

for (var i = 0; i < li.length; i++) {
  if (i % 2 === 0) {
    li[i].style.background = "#f4f4f4";
  } else {
    li[i].style.background = "#123456";
    li[i].style.color = "white";
  }
}

// Query SELECTOR
var header = document.querySelector("#main-header");
header.style.borderBottom = "solid 4px #123456";

var input = document.querySelector("input"); // Only select first input htm element
input.value = "Add Items";

var submit = document.querySelector('input[type="submit"');
submit.value = "Save";

var item = document.querySelector(".list-group-item"); // Only Select frist of element that have class like
item.style.color = "#123456";

var lastItem = document.querySelector(".list-group-item:last-child"); // Selecting last child of element same class
lastItem.style.fontWeight = "bold";

var secondItem = document.querySelector(".list-group-item:nth-child(2)");
secondItem.style.background = "cyan";
secondItem.style.color = "#123456";
secondItem.style.fontWeight = "bold";

// QUERY SELECT ALL
var titles = document.querySelectorAll(".title");
// console.log(titles);
titles[0].style.fontWeight = "bold";

var odd = document.querySelectorAll("li:nth-child(odd)");
var even = document.querySelectorAll("li:nth-child(even)");
var emoji = "📦";
var emoji2 = "📝";

for (var i = 0; i < odd.length; i++) {
  odd[i].textContent = `${emoji} ${odd[i].textContent}`;
}
for (var i = 0; i < even.length; i++) {
  even[i].textContent = `${emoji2} ${even[i].textContent}`;
}
