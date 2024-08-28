import NavBar from './NavBar'
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom'

function MyBooks(props){
    const {id} = useParams()
    const navigate = useNavigate()
    const [data,setData] = useState()
    const [isInProfile,setIsInProfile] = useState(typeof props.inprofile !== 'undefined')
    const [message,setMessage] = useState("")
    useEffect(() => {
        let idofbooks;
        if(typeof props.profileid !== 'undefined') idofbooks=props.profileid
        else idofbooks = id;
        axios.get('http://localhost:5000/book/mybooks/'+idofbooks)
        .then(response => {
            setData(response.data)
            console.log(data)
        })
        .catch(err => {
            navigate(-1)
            console.log(err)
        })
    },[])

    useEffect(() => {
        if(data){
            if(data.length == 0){
                setMessage("Unfortunately it seems like you didnt upload a book")
            }
        }
    },[data])

    const handleDelete = (id) => {
        axios.delete('http://localhost:5000/book/deletebook/'+id)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }

    const ShowData = data && (
        data.map((value,index) => <div className='bookcontainer'>
            <div className="bookitem" onClick={() => navigate("/showbook/"+value._id)} key={index}>                
                <ul>
                    <img src={value.coverPicture == "default"? 'http://localhost:5000/defaultpictures/default.png':`http://localhost:5000/${value.coverPicture}`} width="259px" height="194px" alt="cover picture" />
                    <li>name : {value.name}</li>
                    <li>Pages : {value.pages}</li>
                    <li>author : {value.author}</li>
                </ul>
            </div>
            <div>
                <button className='updbtn' onClick={() => navigate("/updatebook/"+value._id)}>Update info</button>
                <button className='errbtn' onClick={() => handleDelete(value._id)}>Delete book</button>
            </div>
        </div>)
    )

    return(
        <>
            {isInProfile? "" : <NavBar auth={props.auth}/>}
            {!data? "loading ...":ShowData}
            {message == "" ? "": <div><h1>{message}</h1></div>}
        </>
    )
}

export default MyBooks