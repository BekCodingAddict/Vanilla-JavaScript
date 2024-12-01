//Book class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI class: Handle UI Task
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static clearFileds() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert position-absolute top-0 end-0 me-3 w-25 w-sm-50 shadow-sm fixed-right rounded-3 alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const body = document.querySelector("body");
    const container = document.querySelector(".container .mt-4");
    body.insertBefore(div, container);

    //make vanish in 3sec
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static deleteBook(target) {
    if (target.classList.contains("delete")) {
      target.parentElement.parentElement.remove();
    }
  }
}

// Store Class:Handle Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addBooks(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add boooks
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  //get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //validation
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Pleas fill in all fileds!", "danger");
  } else {
    // Instatntiate book
    const book = new Book(title, author, isbn);
    // Add Book to UI
    UI.addBookToList(book);

    //add books to store
    Store.addBooks(book);

    //show success message
    UI.showAlert("Book successfully added!", "success");
    //Clear flields
    UI.clearFileds();
  }
});

// Event: Remove Books
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);

  //remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //show success message
  UI.showAlert("Book successfully removed!", "warning");
});
