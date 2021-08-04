let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    if (this.read) {
        return `${this.title} by ${this.author}, ${this.pages} pages, read.`
    } else {
        return `${this.title} by ${this.author}, ${this.pages} pages, not read yet.`
    }
}

Book.prototype.toggleRead = function() {
    this.read ? this.read = false : this.read = true;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    book.index = myLibrary.length;
    myLibrary.push(book);
}

function removeBook(index) {
    console.log(index);
    myLibrary.splice(index, 1);
    reindexLibraryBooks();
    displayBooksFromLibrary();
}

function reindexLibraryBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        myLibrary[i].index = i;
    }
}

const table = document.querySelector("#table");

function addBookToTable(book) {
    const tr = document.createElement('tr');
    const title = document.createElement("td");
    const author = document.createElement("td");
    const pages = document.createElement("td");
    const read = document.createElement("td");
    const removeBtn = document.createElement("button");
    const readBtn = document.createElement("button");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    book.read ? read.textContent = "Yes" : read.textContent = "No";
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";
    removeBtn.id = book.index;
    removeBtn.onclick = function () { removeBook(removeBtn.id) };
    readBtn.textContent = "Toggle Read";
    readBtn.onclick = function() {
        book.toggleRead();
        displayBooksFromLibrary();
    }

    tr.appendChild(title);
    tr.appendChild(author);
    tr.appendChild(pages);
    tr.appendChild(read);
    td1.appendChild(removeBtn);
    td2.appendChild(readBtn);
    tr.append(td1);
    tr.append(td2);
    table.appendChild(tr); 
}

function displayBooksFromLibrary() {
    while (table.hasChildNodes()) {
        table.removeChild(table.lastChild);
    }

    addHeadersToTable();

    myLibrary.forEach(addBookToTable);
}

function addHeadersToTable() {
    const tr = document.createElement('tr');
    const title = document.createElement("th");
    const author = document.createElement("th");
    const pages = document.createElement("th");
    const read = document.createElement("th");
    const remove = document.createElement("th");
    const toggleRead = document.createElement("th");

    title.textContent = "Title";
    author.textContent = "Author";
    pages.textContent = "Pages";
    read.textContent = "Read";
    remove.textContent = "Remove";
    toggleRead.textContent = "Toggle Read";

    tr.appendChild(title);
    tr.appendChild(author);
    tr.appendChild(pages);
    tr.appendChild(read);
    tr.appendChild(remove);
    tr.appendChild(toggleRead);
    table.appendChild(tr); 
}

function showForm() {
    const form = document.getElementById("new-book");
    form.style.visibility = "visible";
}

function hideForm() {
    const form = document.getElementById("new-book");
    form.style.visibility = "hidden";
}

function submitBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("yes").checked;

    addBookToLibrary(title, author, Number(pages), read);
    displayBooksFromLibrary();
    hideForm();
}

addBookToLibrary("Lord of the Flies", "William Golding", 193, true);
addBookToLibrary("A Song of Ice and Fire", "George R. R. Martin", 392, false);

displayBooksFromLibrary();