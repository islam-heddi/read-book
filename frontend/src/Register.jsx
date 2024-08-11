import NavBar from "./NavBar"
import React,{useState} from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom'
function Register(){
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [date,setDate] = useState(new Date())
    const [gender,setGender] = useState("") 
    const [result,setResult] = useState()
    const navigate = useNavigate()
    
    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleGender = (str) => {
        setGender(str)
    }
    const handleDate = (e) => {
        setDate(e.target.value)
    }
    const handleReset = (e) => {
        e.preventDefault()
        setName("")
        setEmail("")
        setPassword("")
        setGender("")
        setDate(new Date())
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setResult(<div>
            <p>Name : {name}</p>
            <p>Email : {email}</p>
            <p>Password : {password}</p>
            <p>Date : {date}</p>
            <p>gendere : {gender}</p>
        </div>)
        const information = {
            name,
            dateofbirth : date,
            gender,
            email,
            password
        }
        axios.post('http://localhost:5000/register',information)
        .then((response) =>{ console.log(response)
            if(response.status == 200) navigate('/')
        })
        .catch(err => console.log(err))
    }
    return(
        <>
            <NavBar />
            <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Name : </label>
                <input type="text" value={name} onChange={(e) => handleName(e)} placeholder="Enter your Name" required/><br />
                <label>Email : </label>
                <input type="email" value={email} onChange={(e) => handleEmail(e)} placeholder="Enter your Email"required/><br />
                <label>Password : </label>
                <input type="password" value={password} onChange={(e) => handlePassword(e)} placeholder="*********"required/><br />
                <label>Gender : </label>
                male <input type="radio" name="gender" checked={gender == "male" } onChange={() => handleGender("male")}required/> ////
                female <input type="radio" name="gender" checked={gender == "female"}  onChange={() => handleGender("female")}required/><br />
                <label>Date of birth : </label>
                <input type="date" value={date} onChange={(e) => handleDate(e)}required/><br/>
                <button>Submit</button>
                <button onClick={handleReset}>Reset</button>
            </form>
            </div>
            {result}
        </>
    )
}

export default Register