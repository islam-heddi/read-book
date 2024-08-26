import NavBar from "./NavBar"
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AddBook(props) {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [author, setAuthor] = useState("")
    const [page, setPage] = useState(null)
    const [pathbook, setPathbook] = useState(null)
    const [coverpicture, setCoverpicture] = useState(null)
    const [data, setData] = useState()
    const [messageError,setMessageError] = useState("")

    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get('http://localhost:5000/board')
            .then(response => setData(response.data))
            .catch(err => {
                console.log(err)
                navigate('/login')
            })
    }, [navigate])

    useEffect(() => {
        document.title = "Add a book"
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()

        formData.append('name', name)
        formData.append('author', author)
        formData.append('pages', page)
        formData.append('pathbook', pathbook)
        formData.append('coverPicture', coverpicture || "default")
        formData.append('publisherid', data?.id)

        axios.post('http://localhost:5000/book/addbook', formData, {
            headers: {
                "content-type": "multipart/form-data",
            },
        })
            .then(response => {
                console.log(response)
                navigate('/board')
            })
            .catch(err => {
                console.log(err)
                setMessageError(err.response.data)
            })
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleAuthor = (e) => {
        setAuthor(e.target.value)
    }

    const handlePage = (e) => {
        setPage(e.target.value)
    }

    const handlePathBook = (e) => {
        setPathbook(e.target.files[0])
    }

    const handleCoverPicture = (e) => {
        setCoverpicture(e.target.files[0])
    }

    const handleReset = () => {
        setName("")
        setAuthor("")
        setPage(null)
        setPathbook(null)
        setCoverpicture(null)
        document.getElementById('pathbook').value = null
        document.getElementById('coverpicture').value = null
    }

    return (
        <>
            <NavBar auth={props.auth} />
            <div>
                <h1>Add a book</h1>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Name of book:</td>
                                <td>
                                    <input type="text" value={name} onChange={handleName} required />
                                </td>
                            </tr>
                            <tr>
                                <td>Author:</td>
                                <td>
                                    <input type="text" value={author} onChange={handleAuthor} required />
                                </td>
                            </tr>
                            <tr>
                                <td>Pages:</td>
                                <td>
                                    <input type="number" min="1" value={page || ""} onChange={handlePage} required />
                                </td>
                            </tr>
                            <tr>
                                <td>Select book PDF:</td>
                                <td>
                                    <input type="file" id="pathbook" onChange={handlePathBook} required />
                                </td>
                            </tr>
                            <tr>
                                <td>Cover picture:</td>
                                <td>
                                    <input type="file" id="coverpicture" onChange={handleCoverPicture} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={handleReset}>Reset</button>
                </form>
                <p className='error'>{messageError}</p>
            </div>
        </>
    )
}

export default AddBook
