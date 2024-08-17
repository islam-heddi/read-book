import {useNavigate} from 'react-router-dom'
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

    }

    const Auth = 
    <ul>
        <li onClick={HandleDeconnect}>Deconnect</li>
        <li onClick={() => navigate('/settings')}>Settings</li>
    </ul>

    return(
    <header>
        <h1>RBOOK</h1>
        <menu>
            {props.auth?Auth:notAuth}
        </menu>
    </header>)
}

export default NavBar