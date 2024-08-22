import NavBar from "./NavBar"
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function AddBook(props){
    const navigate = useNavigate()
    const [name,setName] = useState("")
    const [author,setAuthor] = useState("")
    const [page,setPage] = useState(null)
    const [pathbook,setPathbook] = useState(null)
    const [coverpicture,setCoverpicture] = useState(null)
    const [data,setData] = useState()
    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('http://localhost:5000/board')
        .then(response => setData(response.data))
        .catch(err => {
            console.log(err)
            navigate('/login')
        })
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        const information = {
            name,
            author,
            pages: page,
            pathbook,
            coverPicture: coverpicture || "default",
            publisherid: data.id
        }
        console.log(information)
        axios.post('http://localhost:5000/book/addbook',information,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        .then(response => console.log(response))
        .catch(err => console.log(err))
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

    const handlePathBook = (e)  => {
        setPathbook(e.target.files[0])
    }

    const handleCoverPicture = (e) => {
        setCoverpicture(e.target.files[0])
    }

    const handleReset = (e) => {
        setName("")
        setAuthor("")
        setPage("")
        setPathBook(null)
        setCoverpicture(null)
    }

    return(
        <>
            <NavBar  auth={props.auth}/>
            <div>
                <h1>Add a book</h1>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Name of book :</td> 
                                <td>
                                    <input type="text" value={name} onChange={(e) => handleName(e)} required/>
                                </td>   
                            </tr>
                            <tr>
                                <td>
                                    author :    
                                </td>
                                <td>
                                    <input type="text" value={author} onChange={(e) => handleAuthor(e)} required/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Pages :
                                </td>
                                <td>
                                    <input type="number" min="1" value={page} onChange={(e) => handlePage(e)} required/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    select book pdf :
                                </td>
                                <td>
                                    <input type="file" value={pathbook} onChange={(e) => handlePathBook(e)} required/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Cover picture : 
                                </td>
                                <td>
                                    <input type="file" value={coverpicture} onChange={(e) => handleCoverPicture(e)} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                <button>Submit</button>
                <button onClick={handleReset}>Reset</button>
                </form>
            </div>
        </>
    )
}

export default AddBook