import {useNavigate} from 'react-router-dom'
import axios from 'axios'
function NavBar(props){
    const navigate = useNavigate()
    const notAuth =
    <ul>
        <li onClick={() => navigate('/')}>
            Home
        </li>
        <li onClick={() => navigate('/login')}>
            Login
        </li>
        <li onClick={() => navigate('/register')}>
            Register
        </li>
    </ul>

    const HandleDeconnect = () => {
        axios.post('http://localhost:5000/deconnect')
        .then(Response => {
            console.log(Response)
            navigate('/login')
        })
    }

    const Auth = 
    <ul>
        <li onClick={HandleDeconnect}>Deconnect</li>
        <li onClick={() => navigate('/settings')}>Settings</li>
    </ul>

    const handleLogo = () => {
        navigate(props.auth?'/board':'/login')
    }

    return(
    <header>
        <h1 className={props.auth?"headlogo":""} onClick={handleLogo}>RBOOK</h1>
        <menu>
            {props.auth?Auth:notAuth}
        </menu>
    </header>)
}

export default NavBar