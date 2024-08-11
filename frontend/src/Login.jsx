import NavBar from "./NavBar";

function Login(){
    return(
        <>
            <NavBar />
            <div>
                <h1>Login</h1>
                <form>
                    <label>
                        Email : 
                    </label>
                    <input type="text" placeholder="Enter your email"/><br />
                    <label>
                        Password :
                    </label>
                    <input type="password" placeholder="************"/><br />
                    <button>Validate</button>
                    <button type="reset">Reset</button>
                </form>
            </div>
        </>
    )
}

export default Login