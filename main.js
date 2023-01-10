
class book {
  constructor(bktitle, bkauthor) {
    this.title = bktitle;
    this.author = bkauthor;
  }
}

class bookCollection {
  constructor() {
    this.books = this.#readLocalStorage();
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

  #writeLocalStorage(){
    localStorage.setItem('book-list', JSON.stringify(this.books));
  }

  #readLocalStorage(){
    return JSON.parse(localStorage.getItem('book-list'));
  }
}

// load booklist in main page 'display-book' section
function loadBooksList() {
  const displaySection = document.querySelector('.display-book');
  let books = new bookCollection();
  while (displaySection.firstChild) {
    displaySection.removeChild(displaySection.firstChild);
  }
  let i=1;
  books.getBooks().forEach((book) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-card');
    if(i%2===0){bookDiv.classList.add('book-card-grey');}
    i+=1;
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
    let books = [];
    localStorage.setItem('book-list',JSON.stringify(books));
  } 
  loadBooksList();
};

const bookForm = document.getElementById('form-book-submit');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
bookForm.onsubmit = (event) => {
  event.preventDefault();
  let books = new bookCollection();
  books.addBook(new book(bookTitle.value,bookAuthor.value));
  loadBooksList();
  bookForm.reset();
};