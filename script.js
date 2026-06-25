const
    myLibrary = [],
    displayArea = document.querySelector(".main-body"),

    bookDialog = document.querySelector("#add-book-dialog"),
    bookDialogForm = document.querySelector("#add-book-dialog > form"),
    bookTitle = document.querySelector("#title");
    bookAuthor = document.querySelector("#author");
    bookPages = document.querySelector("#pages");
    readYes = document.querySelector("#yes");
;

let selectedCard;

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

function processBookDialog() {
    addBookToLibrary (
        bookTitle.value,
        bookAuthor.value,
        bookPages.value,
        readYes.checked
    )
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
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

document.querySelector("body").addEventListener("click", (e) => {
    if (e.target.id === "add-book-btn") {
        bookDialog.showModal();

    } else if (e.target.id === "submit-dialog") {
        e.preventDefault();
        if (bookDialogForm.checkValidity()) {
            processBookDialog();
            bookDialog.close();
            refresh();
        } else {
            bookDialogForm.reportValidity();
        }

    } else if (e.target.id === "cancel-dialog") {
        bookDialog.close();
    
    }
});

displayArea.addEventListener("click", (e) => {
    const clickedCard = e.target.closest(".card");
    selectCard(clickedCard);
})

function selectCard(targetCard) {
    if (selectedCard) {
        selectedCard.classList.remove("selected");
    }
    if (targetCard) {
        targetCard.classList.add("selected");
    }
    selectedCard = targetCard;
}