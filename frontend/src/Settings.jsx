import NavBar from './NavBar';
import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {getYear, getMonth, getDate} from 'date-fns';

function Settings(props) {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:5000/board')
            .then(response => {
                const { name, email, date } = response.data;
                setData(response.data);
                setName(name);
                setEmail(email);
                // Ensure date is parsed correctly
                const parsedDate = new Date(date);
                setDate(parsedDate.toISOString().split('T')[0]); // Format as yyyy-mm-dd
            })
            .catch(err => navigate('/login'));
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
    };

    const handleReset = () => {
        if (data) {
            setName(data.name);
            setEmail(data.email);
            setDate(new Date(data.date).toISOString().split('T')[0]); // Format as yyyy-mm-dd
        }
    };

    const handleName = (e) => {
        setName(e.target.name)
    }

    const handleEmail = (e) => {
        setEmail(e.target.email)
    }

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
                                    onChange={(e) => handleName(e)} 
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
                                    onChange={(e) => handleEmail(e)} 
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

    const passwordPart = (
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

    const removePart = (
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
