import NavBar from './NavBar'
import MyBooks from './MyBooks'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Profile(props){
    const [data,setData] = useState()
    const [date,setDate] = useState("")
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:5000/board')
        .then(response => setData(response.data))
        .catch(err => {
            console.log(err)
            navigate('/login')
        })
    },[navigate])
    
    useEffect(() => {
        if(data){
            setDate(data.date.split('T')[0])
            console.log(date)
        }
    },[data])

    useEffect(() => {
        document.title = "Profile"
    })

    const profile = data && (
        <>
            <h1>My Profile</h1>
            <p>Hello, Mr {data.name || " "}</p>
            <p>Email: {data.email || " "}</p>
            <p>You were born in {date || " "}</p>
        </>
    )

    return(<>
        <NavBar auth={props.auth}/>
        <div>
            {!data? "Loading ..." : profile }
            <h1>My shared book</h1>
            {!data? "":<MyBooks inprofile={true} profileid={data.id}/>}
        </div>
    </>)
}

export default Profile