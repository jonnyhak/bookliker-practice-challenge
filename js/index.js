document.addEventListener("DOMContentLoaded", function() {

    const booksCollection = document.querySelector("#list")

    const renderBook = (bookObj) => {
        // booksCollection.dataset.id = ramenObj.id
        const li = document.createElement('li')
        li.textContent = bookObj.title

        booksCollection.append(li)
    }
    
    const getBooks = () => {
        fetch('http://localhost:3000/books')
            .then(response => {
                return response.json()
            }).then((booksArr) => {
                booksArr.forEach((bookObj) => {
                    renderBook(bookObj)
                })
            })
    }

   




    getBooks()


});
