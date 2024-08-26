import NavBar from './NavBar'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AllBooks from './AllBooks'

function Board(props) {
    const [data, setData] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get('http://localhost:5000/board')
            .then(response => {
                setData(response.data)
                props.setAuth(true)
            })
            .catch(err => {
                console.log(err)
                navigate('/login')
            })
    }, [navigate, props])

    useEffect(() => {
        document.title = "Read a book"
    },[])

    useEffect(() => {
        console.log(data)
    }, [data])

    const body = data && (
        <div>
            <h1>Welcome to Read Book</h1>
            <button onClick={() => navigate('/addbook')}>Add a book</button>
            <button onClick={() => navigate('/mybooks/'+data.id)}>My published books</button>
            <AllBooks />
        </div>
    )

    return (
        <>
            <NavBar auth={props.auth}/>
            {!data ? "Loading..." : body}
        </>
    )
}

export default Board
