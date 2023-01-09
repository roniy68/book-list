// Book Class 
class Book {
  constructor(name, author){
    this.name = name;
    this.author = author;
  }
}

// Books Array
let bookList = [];


// remove book from booklist array
function removeBook(book) {
  bookList.splice(bookList.indexOf(book), 1);
}

// update local storage when a book is added,deleted or window unloaded
function updateLocalStorage() {
  localStorage.setItem('book-list', JSON.stringify(bookList));
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
    removeButton.onclick = () => {
      removeBook(book);
      loadBooksList();
      updateLocalStorage();
    };
    bookDiv.appendChild(removeButton);
    displaySection.appendChild(bookDiv);
  });
}

window.onload = () => {
  // initialise booklist for the first time  with null array
  if (localStorage.getItem('book-list') === null) {
    bookList = [];
  } else {
    bookList = JSON.parse(localStorage.getItem('book-list'));
  }
  loadBooksList();
};

window.onunload = () => {
  updateLocalStorage();
};

const bookForm = document.getElementById('form-book-submit');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
bookForm.onsubmit = (event) => {
  event.preventDefault();
  const book = { title: bookTitle.value, author: bookAuthor.value };
  bookList.push(book);
  loadBooksList();
  updateLocalStorage();
  bookForm.reset();
};