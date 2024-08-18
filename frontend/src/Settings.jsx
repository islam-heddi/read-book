import NavBar from './NavBar'
import {useNavigate} from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {getYear} from 'date-fns'


function Settings(props) {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState(new Date());
    const [newdate,setNewdate] = useState("")
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:5000/board')
            .then(response => {
                setData(response.data);
                setName(response.data.name);
                setEmail(response.data.email);
                setDate(response.data.date);
                setNewdate(response.data.date)
                console.log(newdate)
                setDate(new Date(newdate.getYear(),newdate.getMonth(),newdate.getDay()))
            })
            .catch(err => navigate('/login'));
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
    };

    const handleReset = () => {
        setName(data.name);
        setEmail(data.email);
        setDate(data.date);
    };

    const informationPart = data && (
        <div>
            <h1>Change the Information</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>Name:</td>
                            <td>
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    placeholder='Enter your name' 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder='email@email.com' 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Date:</td>
                            <td>
                                <input 
                                    type="date" 
                                    value={date} 
                                    onChange={(e) => setDate(e.target.value)} 
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Submit</button>
                <button type="button" onClick={handleReset}>Reset</button>
            </form>
        </div>
    );

    const passwordPart = data && (
        <div>
            <h1>Change the Password</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>Current Password:</td>
                            <td>
                                <input type="password" placeholder='************' />
                            </td>
                        </tr>
                        <tr>
                            <td>New Password:</td>
                            <td>
                                <input type="password" placeholder='************' />
                            </td>
                        </tr>
                        <tr>
                            <td>Retype New Password:</td>
                            <td>
                                <input type="password" placeholder='************' />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Submit</button>
                <button type="button" onClick={handleReset}>Reset</button>
            </form>
        </div>
    );

    const removePart = data && (
        <div>
            <h1>Are you sure you want to remove this account?</h1>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>Type the password:</td>
                            <td>
                                <input type="password" placeholder='************' />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Remove this account</button>
            </form>
        </div>
    );

    const [part, setPart] = useState(informationPart);

    const handleInformation = () => {
        setPart(informationPart);
    };

    const handleChangePassword = () => {
        setPart(passwordPart);
    };

    const handleDeleteAccount = () => {
        setPart(removePart);
    };

    return (
        <>
            <NavBar auth={props.auth} />
            <div className='container'>
                <menu>
                    <ul className='listinfo'>
                        <li onClick={handleInformation}>Change Information</li>
                        <li onClick={handleChangePassword}>Change Password</li>
                        <li onClick={handleDeleteAccount}>Delete Account</li>
                    </ul>
                </menu>
                {!data ? "Loading..." : part}
            </div>
        </>
    );
}

export default Settings;
