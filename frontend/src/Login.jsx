import axios from "axios";
import NavBar from "./NavBar";
import React,{useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
function Login(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [labelbuttonPassword,setLabelButtonPassword] = useState("Show")
    const [typePassword,settypePassword] = useState("password")
    const [errorMessage,setErrorMessage] = useState("")
    const navigate = useNavigate()
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const hanldePassword = (e) => {
        setPassword(e.target.value)
    }
    const hanldeReset = (e) => {
        e.preventDefault()
        setEmail("")
        setPassword("")
    }
    const ShowPassword = (e) => {
        e.preventDefault()    
        setLabelButtonPassword(prevLabel => prevLabel === "Show" ? "Hide" : "Show");
        settypePassword(prevType => prevType === "password" ? "text" : "password"); 
    }
    axios.defaults.withCredentials = true

    const handleSubmit = (e) => {
        e.preventDefault()
        const information = {
            email,
            password,
        }
        axios.post('http://localhost:5000/login',information)
        .then(response => navigate('/board'))
        .catch(err => {
            console.log(err)
            setErrorMessage(err.response.data.error)
        })
    }

    useEffect(() => {
        document.title = "Login"
    },[])

    return(
        <>
            <NavBar />
            <div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Email : 
                    </label>
                    <input type="text" value={email} onChange={(e) =>  handleEmail(e)} placeholder="Enter your email"/><br />
                    <label>
                        Password :
                    </label>
                    <input type={typePassword} value={password} onChange={(e) => hanldePassword(e)} placeholder="************"/><button onClick={ShowPassword}>{labelbuttonPassword}</button><br />
                    <button>Validate</button>
                    <button onClick={hanldeReset}>Reset</button>
                </form>
                <p className="error">{errorMessage}</p>
            </div>
        </>
    )
}

export default Login