class BookCollection {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('book-list'));
  }

  getBooks() {
    return this.books;
  }

  addBook(book) {
    this.books.push(book);
    this.#writeLocalStorage();
  }

  removeBook(book) {
    this.books.splice(this.books.indexOf(book), 1);
    this.#writeLocalStorage();
  }

  #writeLocalStorage() {
    localStorage.setItem('book-list', JSON.stringify(this.books));
  }
}

// load booklist in main page 'display-book' section
function loadBooksList() {
  const displaySection = document.querySelector('.display-book-container');
  const books = new BookCollection();
  while (displaySection.firstChild) {
    displaySection.removeChild(displaySection.firstChild);
  }
  let i = 1;
  books.getBooks().forEach((book) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-card');
    if (i % 2 === 0) { bookDiv.classList.add('book-card-grey'); }
    i += 1;
    bookDiv.innerHTML = `<div class='text-content'>
      <h4>"${book.title}"</h2>
      <h4>by ${book.author}</h3>
      </div>
    `;
    const removeButton = document.createElement('div');
    removeButton.classList.add('button-remove');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => {
      books.removeBook(book);
      loadBooksList();
    };
    bookDiv.appendChild(removeButton);
    displaySection.appendChild(bookDiv);
    displaySection.appendChild(document.createElement('hr'));
  });
}

window.onload = () => {
  // initialise booklist for the first time  with null array
  if (localStorage.getItem('book-list') === null) {
    const books = [];
    localStorage.setItem('book-list', JSON.stringify(books));
  }
  loadBooksList();
};

const bookForm = document.getElementById('form-book-submit');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
bookForm.onsubmit = (event) => {
  event.preventDefault();
  const books = new BookCollection();
  /* eslint-disable no-undef */
  books.addBook(new Book(bookTitle.value, bookAuthor.value));
  loadBooksList();
  bookForm.reset();
};

const listbtn = document.getElementById('list-books-link');
const addBookBtn = document.getElementById('add-books-link');
const contactBtn = document.getElementById('contact-link');

const displayBk = document.querySelector('.display-book');
const addBk = document.querySelector('.add-book');
const contact = document.querySelector('.contact-section');
listbtn.onclick = function () {
  displayBk.style.display = 'block';
  addBk.style.display = 'none';
  contact.style.display = 'none';
};

addBookBtn.onclick = function () {
  displayBk.style.display = 'none';
  addBk.style.display = 'block';
  contact.style.display = 'none';
};

contactBtn.onclick = function () {
  displayBk.style.display = 'none';
  addBk.style.display = 'none';
  contact.style.display = 'block';
};