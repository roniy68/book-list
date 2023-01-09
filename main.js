let bookList;

// remove book from booklist array
function removeBook(book) {
  bookList.splice(bookList.indexOf(book), 1);
}

// load booklist in main page 'display-book' section
function loadBooksList() {
  const displaySection = document.querySelector('.display-book');
  while (displaySection.firstChild) {
    displaySection.removeChild(displaySection.firstChild);
  }
  bookList.forEach((book) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-card');
    bookDiv.innerHTML = `
      <h4>Book Name: ${book.title}</h2>
      <h4>Author: ${book.author}</h3>
    `;
    const removeButton = document.createElement('button');
    removeButton.classList.add('button-remove');
    removeButton.textContent = 'remove book';
    removeButton.onclick = function () {
      removeBook(book);
      loadBooksList();
    };
    bookDiv.appendChild(removeButton);
    displaySection.appendChild(bookDiv);
  });
}

window.onload = function () {
  // initialise booklist for the first time  with null array
  if (localStorage.getItem('book-list') === null) {
    bookList = [];
  } else {
    bookList = JSON.parse(localStorage.getItem('book-list'));
  }
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
  bookForm.reset();
};