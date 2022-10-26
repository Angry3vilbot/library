let myLibrary = [];
let bookGrid = document.getElementById('book-grid')
let overlay = document.getElementById('overlay')
let form = document.getElementById('book-form')
let submit = document.getElementById('submit')
let remover = document.getElementById('remover')

class Book {
    constructor(name, author, year, pages, isRead, toggleRead) {
        this.name = name;
        this.author = author;
        this.year = year;
        this.pages = pages;
        this.isRead = isRead;
        this.toggleRead = toggleRead;
    }
  }

function addBookToLibrary(name, author, year, pages, isRead) {
  myLibrary.push(new Book(name, author, year, pages, isRead))
}

function deleteBook(){
    let a = myLibrary.indexOf(this)
    myLibrary.splice(a, 1)
    this.remove()
}

function changeStatus(i){
    if (myLibrary[i].isRead) {
		myLibrary[i].isRead = false;
	} else {
		myLibrary[i].isRead = true;
	}
	reloadLibrary();
}

function removeBooks(){
    if (bookGrid.getAttribute('deleting') !== 'true'){
        for(const child of bookGrid.children){
            child.classList.add('shake')
            child.addEventListener('click', deleteBook)
        }
        remover.innerHTML = "Stop Removing"
        bookGrid.setAttribute('deleting', 'true')
    }
    else{
        for(const child of bookGrid.children){
            child.removeEventListener('click', deleteBook)
        }
        remover.innerHTML = "Remove Books"
        bookGrid.setAttribute('deleting', 'false')
    }
}

function reloadLibrary(){
    bookGrid.textContent = '';
    for(let i = 0; i <= myLibrary.length - 1; i++){
        let book = document.createElement('div')
        let bookName = document.createElement('h2')
        let bookAuthor = document.createElement('h4')
        let bookYear = document.createElement('p')
        let bookPages = document.createElement('p')
        let bookRead = document.createElement('p')
        let toggleRead = document.createElement('button')
        toggleRead.innerHTML = 'Change Read Status'
        toggleRead.setAttribute('onclick', `changeStatus(${i})`)
        bookName.innerHTML = myLibrary[i].name
        bookAuthor.innerHTML = `By ${myLibrary[i].author}`
        bookYear.innerHTML = `Released in: ${myLibrary[i].year}`
        bookPages.innerHTML = `Page count: ${myLibrary[i].pages}`
        bookRead.innerHTML =`Read: ${checkStatus(i)}`
        bookRead.classList.add(`bookRead`)
        book.append(bookName, bookAuthor, bookYear, bookPages, bookRead, toggleRead)
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

function revealForm(){
    overlay.classList.add("active")
    form.classList.add("active")
}

function hideForm(){
    overlay.classList.remove("active")
    form.classList.remove("active")
}

function submitBook(){
    let a = document.getElementById('name')
    let b = document.getElementById('author')
    let c = document.getElementById('year')
    let d = document.getElementById('count')
    let e = document.getElementById('check')
    a = a.value
    b = b.value
    c = c.value
    d = d.value
    if(e.checked == true){
        e = true
    }
    else{
        e = false
    }
    addBookToLibrary(a, b, c, d, e)
    hideForm()
    reloadLibrary()
}

submit.addEventListener('click', submitBook)