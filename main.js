let bookList;
function loadBooksList() {
  const displaySection = document.querySelector('.display-book');
}

window.onload = function () {
  if (localStorage.getItem('book-list') === null) {
    bookList = [];
  } else {
    bookList = JSON.parse(localStorage.getItem('book-list'));
  }
  // TODO add book loading function to display-book section
  loadBooksList();
};

window.onunload = function () {
  localStorage.setItem('book-list', JSON.stringify(bookList));
};

const bookForm = document.getElementById('form-book-submit');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
bookForm.onsubmit = function (event) {
  event.preventDefault();
  const book = { title: bookTitle.value, author: bookAuthor.value };
  bookList.push(book);
  loadBooksList();
  console.log(bookList);
};