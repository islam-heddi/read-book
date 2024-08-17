import NavBar from './NavBar'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
        console.log(data)
    }, [data])

    const body = data && (
        <div>
            <h1>Welcome to Read Book</h1>
            <p>Hello, Mr {data.name || " "}</p>
            <p>Email: {data.email || " "}</p>
            <p>You were born in {data.date || " "}</p>
        </div>
    )

    return (
        <>
            <NavBar auth={props.auth} />
            {!data ? "Loading..." : body}
        </>
    )
}

export default Board
