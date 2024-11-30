var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");
//delete event
itemList.addEventListener("click", removeItem);
//form submit event
form.addEventListener("submit", addItem);
//filter event
filter.addEventListener("keyup", filterItem);

//add items
function addItem(e) {
  e.preventDefault();

  //get input value
  var newItem = document.getElementById("item").value;

  //create new li element
  var li = document.createElement("li");

  li.className = "list-group-item"; //add class
  li.appendChild(document.createTextNode(newItem)); //add text node with input value
  var deleteBtn = document.createElement("button"); // create a delete btn
  deleteBtn.className = "btn btn-danger btn-sm float-right delete"; // adding class
  deleteBtn.appendChild(document.createTextNode("X")); // adding dele btn text
  li.appendChild(deleteBtn); // append delete btn to li inside
  itemList.appendChild(li); // make child li to ul
  document.getElementById("item").value = "";
}

function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure?")) {
      var li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
}

//filter items
function filterItem(e) {
  //convert lowercase
  var text = e.target.value.toLowerCase();
  // get list
  var items = itemList.getElementsByTagName("li");
  //convert to Array
  Array.from(items).forEach(function (item) {
    var itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) !== -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
