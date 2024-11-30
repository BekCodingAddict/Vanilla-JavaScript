// console.log(window) // all methods here

//Single element selector
// const form = document.getElementById("my-form");
// const container = document.querySelector(".container");

//Multiple Element selector
// const listItems = document.querySelectorAll(".item");
// const Items = document.getElementsByClassName("item");
// const itemsList = document.getElementsByTagName("li");

// const ul = document.querySelector(".items");
// ul.remove();
// ul.lastElementChild.remove();
// ul.firstElementChild.remove();

// ul.firstElementChild.textContent = "Hello";
// ul.children[1].textContent = "Hello Brad";
// ul.lastElementChild.innerHTML = "<h4>Hello vanilla</h4>";

// const btn = document.querySelector(".btn");
// console.log(btn.style);
// btn.style.background = "red";

// btn.addEventListener("click", (e) => {
//   e.preventDefault();
//   //   console.log(e);
//   document.querySelector("#my-form").style.background = "#ccc";

//   document.querySelector("body").classList.add("bg-dark");
//   document.querySelector(".items").lastElementChild.innerHTML =
//     "<h1>Hello</h1>";
// });

// btn.addEventListener("mouseover", (e) => {
//   e.preventDefault();
//   //   console.log(e);
//   document.querySelector("#my-form").style.background = "#ccc";

//   document.querySelector("body").classList.add("bg-dark");
//   document.querySelector(".items").lastElementChild.innerHTML =
//     "<h1>Hello</h1>";
// });

const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");

myForm.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  if (nameInput.value === "" || emailInput.value === "") {
    msg.classList.add("error");
    msg.innerHTML = "Please enter all fields";

    setTimeout(() => msg.remove(), 3000);
  } else {
    const li = document.createElement("li");
    li.appendChild(
      document.createTextNode(`${nameInput.value}:${emailInput.value}`)
    );
    userList.appendChild(li);

    //claar fileds
    nameInput.value = "";
    emailInput.value = "";
  }
}
