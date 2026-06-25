// HTML elements on the page
const
    displayArea = document.querySelector(".main-body"),
    bookDialog = document.querySelector("#add-book-dialog"),
    bookDialogForm = document.querySelector("#add-book-dialog > form"),
    bookTitle = document.querySelector("#title");
    bookAuthor = document.querySelector("#author");
    bookPages = document.querySelector("#pages");
    readYes = document.querySelector("#yes");
;
// Array that will hold book objects
const myLibrary = [];
// Stores reference to the book object currently selected by the user
let selectedCard;


/**
*   Constructor function for Book objects
*   @param {string} title
*   @param {string} author
*   @param {number} pages
*   @param {boolean} read True if the book has been read by the user
*/
function Book(title, author, pages, read) {
    if (!new.target) {
        throw new Error("Constructor must be invoked using the new keyword");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    // A unique id that will be used to find the object in the Array
    this.id = crypto.randomUUID();
}


/**
 * Creates a book object and adds it to the library array
 * 
 * @param {string} title 
 * @param {string} author 
 * @param {number} pages 
 * @param {boolean} read True if the book has been read by the user
 */
function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(
        new Book(title, author, pages, read)
    );
}


/**
 * Collects information from the dialog box and adds a book object to the array
 */
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


/**
 * Refreshes the display area when a book is added or removed from the array
 */
function refresh() {
    displayArea.innerHTML = "";
    myLibrary.forEach(book => displayBook(book));
}


/**
 * Creates a boook card and adds it to the display area
 * 
 * @param {Book} book Book object to be displayed on the card
 */
function displayBook(book) {
    const
        title = document.createElement("h3"),
        separator = document.createElement("div"),
        author = document.createElement("p"),
        pages = document.createElement("p"),
        read = document.createElement("p")
    ;

    title.classList.add("title");
    separator.classList.add("separator");
    author.classList.add("author");
    pages.classList.add("pages");
    read.classList.add("read");
    
    title.textContent = book.title;
    author.textContent = `by ${book.author}`;
    pages.textContent = `${book.pages} pages`;
    read.textContent = book.read ? "✅ Read" : "❌ Not read";

    const card = document.createElement("div");
    card.id = book.id;
    card.classList.add("card");
    card.append(title, separator, author, pages, read);

    displayArea.appendChild(card);
}


/**
 * Finds and removes a book from the library array
 * 
 * @param {string} id The unique id of the book 
 */
function deleteBookByID(id) {
    myLibrary.forEach((book, index) => {
        if (book.id === id) {
            // Prompt the user to confirm deletion
            if (confirm(`Delete "${book.title}"?`)) {
                myLibrary.splice(index, 1);
                // Refresh the display to reflect array changes
                refresh();
            }
        }
    });
}


// Event handler for buttons in the Header section
document.querySelector(".header").addEventListener("click", (e) => {
    // Add Book button
    if (e.target.id === "add-book-btn") {
        bookDialog.showModal();
    // Delete button
    } else if (e.target.id === "del-book-btn") {
        // If no book card is selected, variable will be null
        if (selectedCard) {
            deleteBookByID(selectedCard.id);
        }
    }
});


// Event handler for buttons in the dialog buttons
bookDialogForm.addEventListener("click", (e) => {
    if (e.target.id === "submit-dialog") {
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
    }}
);


// Handler for clicks on the book cards
displayArea.addEventListener("click", (e) => {
    const clickedCard = e.target.closest(".card");
    selectCard(clickedCard);
});


/**
 * Changes the currently selected book card
 * @param {HTMLElement} targetCard 
 */
function selectCard(targetCard) {
    // If selectedCard is not null, then a card is currently selected
    if (selectedCard) {
        selectedCard.classList.remove("selected");
    }
    // If targetCard is not null, then a card was clicked
    if (targetCard) {
        targetCard.classList.add("selected");
    }
    selectedCard = targetCard;
}


/**
 * Create a few mock books on startup
 */
function fillLibrary() {
    addBookToLibrary(
        "Harry Potter",
        "J.K. Rowling",
        836,
        true
    );
    addBookToLibrary(
        "Malazan",
        "Steven Erikson",
        1243,
        false
    );
    addBookToLibrary(
        "Kingkiller",
        "Pat Rothfuss",
        782,
        true
    );
    addBookToLibrary(
        "Stormlight",
        "Brando Sando",
        1480,
        false
    );
    refresh();
}

fillLibrary();