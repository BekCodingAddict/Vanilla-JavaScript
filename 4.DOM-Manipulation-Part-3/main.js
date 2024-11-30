//EVENT
// var button = document
//   .getElementById("button")
//   .addEventListener("click", buttonClick);

// function buttonClick(e) {
//   //console.log("Button clicked");
//   //   console.log(e);
//   //   console.log(e.target);
//   //   console.log(e.target.className);
//   //   console.log(e.target.classList);
//   //   var output = document.getElementById("output");
//   //   output.innerHTML = "<h3>" + e.target.id + "</h3>";
//   //   console.log(e.type);
//   //browser window position
//   //   console.log(e.clientX);
//   //   console.log(e.clientY);
//   //mouse position actual element
//   //   console.log(e.offsetX);
//   //   console.log(e.offsetY);
//   //KEYBOARD KEY EVENTS
//   //   console.log(e.altKey);
//   //   console.log(e.ctrlKey);
//   //   console.log(e.shiftKey);
//   //   console.log(e);
// }

// var button = document.getElementById("button");
// var box = document.getElementById("box");
// var output = document.querySelector("#output");
// button.addEventListener("click", runEvent);
// button.addEventListener("dblclick", runEvent);
// button.addEventListener("mousedown", runEvent);
// button.addEventListener("mouseup", runEvent);
// box.addEventListener("mouseenter", runEvent);
// box.addEventListener("mouseleave", runEvent);
// box.addEventListener("mouseover", runEvent);
// box.addEventListener("mousemove", runEvent);

var itemInput = document.querySelector('input[type="text"]');
var form = document.querySelector("form");
var select = document.querySelector("select");

// itemInput.addEventListener("keydown", runEvent);
// itemInput.addEventListener("keyup", runEvent);
// itemInput.addEventListener("keypress", runEvent);

// itemInput.addEventListener("focus", runEvent);
// itemInput.addEventListener("blur", runEvent);
// itemInput.addEventListener("cut", runEvent);
// itemInput.addEventListener("paste", runEvent);
// itemInput.addEventListener("copy", runEvent);
// itemInput.addEventListener("input", runEvent);
// itemInput.addEventListener("input", runEvent);

// select.addEventListener("change", runEvent);
// select.addEventListener("input", runEvent);

form.addEventListener("submit", runEvent);
function runEvent(e) {
  e.preventDefault();
  console.log("EVENT TYPE: " + e.type);

  //   output.innerHTML =
  //     "<h3>MouseX:" + e.offsetX + "</h3><h3>MouseY:" + e.offsetY + "</h3>";
  //   box.style.backgroundColor = "rgb(" + e.offsetX + "," + e.offsetY + ",40)";
  //   document.body.style.backgroundColor =
  //     "rgb(" + e.offsetX + "," + e.offsetY + ",40)";

  //   document.getElementById("output").innerHTML =
  //   "<h3>" + e.target.value + "</h3>";
  //   console.log(e.target.value);
}
