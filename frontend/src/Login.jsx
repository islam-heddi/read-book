import NavBar from "./NavBar";
import React,{useState} from 'react'

function Login(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [labelbuttonPassword,setLabelButtonPassword] = useState("Show")
    const [typePassword,settypePassword] = useState("password")
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

    return(
        <>
            <NavBar />
            <div>
                <h1>Login</h1>
                <form>
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
            </div>
        </>
    )
}

export default Login