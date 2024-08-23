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

    const ShowData = data && (
        data.map((value,index) => <>
            <div className="bookitem" onClick={() => navigate("/showbook/"+value._id)} key={index}>                
                        <ul>
                            <li>name : {value.name}</li>
                            <li>Pages : {value.pages}</li>
                            <li>author : {value.author}</li>
                        </ul>
                    </div>
        </>)
    )

    return(
        <>
            <NavBar auth={props.auth}/>
            {!data? "loading ...":ShowData}
        </>
    )
}

export default MyBooks