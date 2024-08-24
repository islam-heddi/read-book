import NavBar from './NavBar'
import { useNavigate,useParams } from 'react-router-dom'
import {useState,useEffect} from 'react'
import axios from 'axios'
function UpdateBook(props){
    const {id} = useParams()
    const navigate = useNavigate()
    const [data,setData] = useState()
    const [name,setName] = useState("")
    const [author,setAuthor] = useState("")
    const [pages,setPages] = useState(null)
    const [isChangeCover,setIsChangeCover] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")
    useEffect(() => {
        axios.get('http://localhost:5000/book/findbook/'+id)
        .then(response => setData(response.data))
        .catch(err => {
          //  navigate(-1)
            console.log(err)
        })
    },[])

    useEffect(() => {
        setName(!data?"":data.name)
        setPages(!data?"":data.pages)
        setAuthor(!data?"":data.author)
    },[])

    const changeCover = data && (
            <tr>
                <td>
                    Cover picture :
                </td>
                <td>
                    <input type="file" />
                </td>
            </tr>
    )

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleAuthor = (e) => {
        setAuthor(e.target.value)
    }

    const handlePages = (e) => {
        setPages(e.target.value)
    }

    const handleReset = (e) => {
        e.preventDefault()
        setName(data.name)
        setPages(data.pages)
        setAuthor(data.author)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const information = {
            coverPicture : "default",
            pages,
            name,
            author
        }
        axios.put('http://localhost:5000/book/updatebook/'+data._id,information)
        .then(response => {
            console.log(response.data)
            navigate('/board')
        })
        .catch(err => {
            setErrorMessage(err)
        })
    }

    const UpdateBook = data && (
        <div>
            <h1>Update the book</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Name :
                            </td>
                            <td>
                                <input type="text" value={name} onChange={(e) => handleName(e)} required/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Author :
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
                                <input type="number" min="1" value={pages} onChange={(e) => handlePages(e)} required/>
                            </td>
                        </tr>
                        {!isChangeCover? <tr><td>Wanna change the cover ?</td><td><button onClick={() => setIsChangeCover(true)}>Change the cover</button></td></tr>:changeCover}
                    </tbody>
                </table>
                <button>Update</button>
                <button type='reset' onClick={handleReset}>Reset</button>
            </form>
            <p className='error'>{errorMessage}</p>
        </div>
    )

    return(
    <>
        <NavBar auth={props.auth}/>
        {!data? "Loading .....":UpdateBook}
    </>
    )
}

export default UpdateBook