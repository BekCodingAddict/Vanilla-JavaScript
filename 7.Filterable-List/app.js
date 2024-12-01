let filterInput = document.getElementById("filterInput"); // get input element
filterInput.addEventListener("keyup", filterNames);

function filterNames(e) {
  var filterValue = document.getElementById("filterInput").value.toUpperCase(); //get value of inputs
  var ul = document.getElementById("names"); //get names from ul
  var li = document.querySelectorAll("li.collection-item"); // get list from ul
  // loop through collection item list
  for (let i = 0; i < li.length; i++) {
    let a = li[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
