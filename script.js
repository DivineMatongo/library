const myLibrary = [];
const displayArea = document.querySelector(".main-body");

function Book(title, author, pages, read) {
    if (!new.target) {
        throw new Error("Constructor must be invoked using the new keyword");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();

    this.info = function() {
        const read = this.read ? "already read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read}`;
    };
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(
        new Book(title, author, pages, read)
    );
}

function refresh() {
    displayArea.innerHTML = "";
    myLibrary.forEach(book => displayBook(book));
}

function displayBook(book) {
    const
        title = document.createElement("h3"),
        author = document.createElement("p"),
        pages = document.createElement("p"),
        read = document.createElement("p")
    ;

    title.classList.add("title");
    author.classList.add("author");
    pages.classList.add("pages");
    read.classList.add("read");
    
    title.textContent = book.title;
    author.textContent = `by ${book.author}`;
    pages.textContent = `${book.pages} pages`;
    read.textContent = book.read ? "Already read" : "Not read yet";

    const card = document.createElement("div");
    card.classList.add("card");
    card.append(title, author, pages, read);

    displayArea.appendChild(card);
}