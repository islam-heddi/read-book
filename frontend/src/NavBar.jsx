import {useNavigate} from 'react-router-dom'
function NavBar(){
    const navigate = useNavigate()

    return(
    <header>
        <h1>RBOOK</h1>
        <menu>
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
        </menu>
    </header>)
}

export default NavBar