//BASICS
// const s = "Hello";
// console.log(typeof s);

// const s2 = new String("hello2");
// console.log(typeof s2);

// console.log(navigator); // current browser data

// const book1 = {
//   title: "Book One",
//   author: "John Doe",
//   year: 2003,
//   getSummary: () => {
//     return `${this.title} was written by ${this.author} in ${this.year}`;
//   },
// };

// console.log(Object.values(book1));
// console.log(Object.keys(book1));

//CONSTRUCTOR
function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;
}

//PROTOTYPES
Book.prototype.getSummary = () => {
  return `${this.title} was written by ${this.author} in ${this.year}`;
};
// const book = new Book("Book1", "John Doe", 2034);
// const boo2 = new Book("Book2", "Jane Doe", 2323);
// // console.log(Object.values(boo2));
// // console.log(boo2.__proto__.constructor);

// console.log(boo2.getSummary());
// console.log(boo2);

// //Inheritance
// function Magazine(title, author, year, month) {
//   Book.call(this, title, author, year);
//   this.month = month;
// }

// //inherite Prototype
// Magazine.prototype = Object.create(Book.prototype);

// const mag = new Magazine("Mag One", "John", 2111, "Jan");
// // console.log(mag);

// console.log(mag);
