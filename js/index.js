document.addEventListener("DOMContentLoaded", function() {

    const booksCollection = document.querySelector("#list")
    const bookShow = document.querySelector("#show-panel")

    const renderBook = (bookObj) => {
        // booksCollection.dataset.id = ramenObj.id
        const li = document.createElement('li')
        li.textContent = bookObj.title

        li.addEventListener("click", (e) => {
            bookShow.innerHTML = ""
            getBook(bookObj.id)
        })

        booksCollection.append(li)
    }

    const renderDetails = bookObj => {
        
        const img = document.createElement("img")
        img.src = bookObj.img_url

        const h2 = document.createElement("h2")
        h2.textContent = bookObj.title

        const h4 = document.createElement("h4")
        h4.textContent = bookObj.subtitle

        const h6 = document.createElement("h6")
        h6.textContent = bookObj.author

        const p = document.createElement("p")
        p.textContent = bookObj.description

        const ul = document.createElement("ul")

        bookObj.users.forEach((userObj) => {
            const li = document.createElement("li")
            li.textContent = userObj.username
            ul.append(li)
        })

        const likeBtn = document.createElement("button")
        likeBtn.textContent = "Like"

        bookShow.append(img, h2, h4, h6, p, ul, likeBtn)
        
        bookShow.addEventListener("click", (e) => {
            const userObj = {"id":1, "username":"pouros"}
            if (e.target.textContent === "Like") {
                bookObj.users.push(userObj)
                updateBook(bookObj.id, bookObj.users )

                const li = document.createElement("li")
                li.textContent = userObj.username
                ul.append(li)

                likeBtn.textContent = "Unlike"
            } else if (e.target.textContent === "Unlike") {
                bookObj.users.pop()

                updateBook(bookObj.id, bookObj.users )
                
                likeBtn.textContent = "Like"
            }
        })
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

    const getBook = id => {
        fetch(`http://localhost:3000/books/${id}`)
            .then(response => {
                return response.json()
            }).then((renderDetails))
    }

    const updateBook = (id, users) => {
        fetch(`http://localhost:3000/books/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                users: users
            })
        })
            .then(response => {
                return response.json()
            }).then(console.log)
    }

   




    getBooks()
    getBook(1)

});
