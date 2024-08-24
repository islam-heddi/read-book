import NavBar from './NavBar'
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom'

function MyBooks(props){
    const {id} = useParams()
    const navigate = useNavigate()
    const [data,setData] = useState()
    useEffect(() => {
        axios.get('http://localhost:5000/book/mybooks/'+id)
        .then(response => {
            setData(response.data)
            console.log(data)
        })
        .catch(err => {
            navigate(-1)
            console.log(err)
        })
    })

    const handleDelete = (id) => {
        axios.delete('http://localhost:5000/book/deletebook/'+id)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }

    const ShowData = data && (
        data.map((value,index) => <div className='bookcontainer'>
            <div className="bookitem" onClick={() => navigate("/showbook/"+value._id)} key={index}>                
                <ul>
                    <li>name : {value.name}</li>
                    <li>Pages : {value.pages}</li>
                    <li>author : {value.author}</li>
                </ul>
            </div>
            <div>
                <button onClick={() => navigate("/updatebook/"+value._id)}>Update info</button>
                <button onClick={() => handleDelete(value._id)}>Delete book</button>
            </div>
        </div>)
    )

    return(
        <>
            <NavBar auth={props.auth}/>
            {!data? "loading ...":ShowData}
            
        </>
    )
}

export default MyBooks