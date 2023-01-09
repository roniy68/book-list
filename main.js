// Book Class
class Book {
  constructor(name, author) {
    this.name = name;
    this.author = author;
  }
}

// UI Class or we can add later in Book 
class UI {
  // UI : Display Books to the DOM
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(book => {
      UI.addBookToList(book);
    });
  }

  // UI : Add Books to the Table
  static addBookToList(book) {
    const list = document.querySelector('#display-book');
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">Remove</a></td>
    `;

    list.appendChild(tr);
  }

  // UI : Delete Book From Table
  static delBook(element) {
    if(element.classList.contains('delete')) {
        element.parentElement.parentElement.remove();
    }
  }

  // UI : Showing Alert to user
  static showAlert(message, className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.add-book');
    const form = document.querySelector('#form-book-submit');
    container.insertBefore(div, form);

      // Vanish the div after some time
    setTimeout(() => document.querySelector('alert').remove(), 3000);
  }

  // UI : clearing the form input fields
  static clearFields() {
    document.querySelector('#book-title').value = '';
    document.querySelector('#book-author').value = '';
  }
}

// Storage: Handle Local Storage
class Store {
  // Get books from local storage
  static getBooks() {
    let books;
    if (localStorage.getItem('book-list') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('book-list'));
    }

    return books;
  }

  // Add books to local storage
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('book-list', JSON.stringify(books));
  }

  // Remove books from local storage
  static rmBook(name) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.name === name) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('book-list', JSON.stringify(books));
  }
}

/*
      Add Events to the Page 
*/

// Event : Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event : Add a Book
document.querySelector('#form-book-submit').addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default submission

  // Get Book Values
  const name = document.querySelector('#book-title').value;
  const author = document.querySelector('#book-author').value;
  
  // Add Simple Validation && Create the Book && Add to UI
  if (name === '' || author === '') {
    UI.showAlert('PLEASE FILL IN ALL FIELDS', 'danger');
  }else {
    const book = new Book(name, author);

    UI.addBookToList(book);
    Store.addBook(book);
    
    UI.showAlert('Book Added', 'success');
    UI.clearFields();
  } 
})

// Event : Remove a Book 
document.querySelector('#display-book').addEventListener('click', (e) => {
  UI.delBook(e.target);
  Store.rmBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
  UI.showAlert('Book Removed', 'success');
})
