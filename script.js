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

