let myLibrary = [];
let bookGrid = document.getElementById('book-grid')

function Book(name, author, year, pages, isRead) {
  this.name = name;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(name, author, year, pages, isRead) {
  myLibrary.push(new Book(name, author, year, pages, isRead))
}

function reloadLibrary(){
    for(let i = 0; i <= myLibrary.length - 1; i++){
        let book = document.createElement('div')
        let bookName = document.createElement('h2')
        let bookAuthor = document.createElement('h4')
        let bookYear = document.createElement('p')
        let bookPages = document.createElement('p')
        let bookRead = document.createElement('p')
        bookName.innerHTML = myLibrary[i].name
        bookAuthor.innerHTML = `By ${myLibrary[i].author}`
        bookYear.innerHTML = `Released in ${myLibrary[i].year}`
        bookPages.innerHTML = `Page count: ${myLibrary[i].pages}`
        bookRead.innerHTML =`Read: ${checkStatus(i)}`
        book.append(bookName, bookAuthor, bookYear, bookPages, bookRead)
        bookGrid.appendChild(book)
    }
}

function checkStatus(id){
    if(myLibrary[id].isRead === true){
        return '<img src="yes.svg" width="50px" height="50px"></img>'
    }
    else{
        return '<img src="no.svg" width="50px" height="50px"></img>'
    }
}