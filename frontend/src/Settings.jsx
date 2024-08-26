import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

function Settings(props) {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [errorMessage,setErrorMessage] = useState("")
    const [form, setForm] = useState({
        name: '',
        email: '',
        date: '',
        currentPassword: '',
        newPassword: '',
        rnewPassword: '',
        password: ''
    });
    const [view, setView] = useState('information');

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:5000/board')
            .then(response => {
                const { name, email, date } = response.data;
                setData(response.data);
                setForm(prevForm => ({
                    ...prevForm,
                    name,
                    email,
                    date: new Date(date).toISOString().split('T')[0]
                }));
            })
            .catch(() => navigate('/login'));
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const information = {
            id: data.id,
            name: form.name,
            email: form.email,
            date: form.date
        }
        // Handle form submission logic here
        axios.put('http://localhost:5000/updateuser',information)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    };

    const handleReset = () => {
        if (data) {
            setForm({
                ...form,
                name: data.name,
                email: data.email,
                date: new Date(data.date).toISOString().split('T')[0],
                currentPassword: '',
                newPassword: '',
                rnewPassword: '',
                password: ''
            });
        }
    };

    const handleSubmitPassword = (e) => {
        e.preventDefault()
        if(form.newPassword != form.rnewPassword) {
            setErrorMessage("Error : the new password doesnt match The retyped password")
            return 0;
        }
        console.log(data.id)
        console.log(form.currentPassword)
        const information = {
            id: data.id,
            currentpassword: form.currentPassword
        }
        console.log(information)
        axios.post('http://localhost:5000/verify',information)
        .then(response => {
            if(response.status == 400) {
                setErrorMessage("Error : current password is wrong")
                return 0;
            }
            console.log(response)
        })
        .catch(err => console.log(err))
        axios.put('http://localhost:5000/updatepassword/'+data.id,{newpassword:form.newPassword})
        .then(response => {
            console.log(response)
        })
        .catch(err => console.log(err))
    }

    const handleRemoveSubmit = async (e) => {
        e.preventDefault()
        const information = {
            id: data.id,
            currentpassword: form.password
        }
        try{
            const res1 = await axios.post('http://localhost:5000/verify',information)
            const res2 = await axios.delete('http://localhost:5000/deleteuser/'+data.id)
            navigate('/login')
        }catch(err){
            setErrorMessage(err.response.data)
            console.log(err)
        }
    }

    const renderView = () => {
        switch (view) {
            case 'information':
                return (
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
                                                name="name"
                                                value={form.name} 
                                                onChange={handleChange} 
                                                placeholder='Enter your name' 
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Email:</td>
                                        <td>
                                            <input 
                                                type="email" 
                                                name="email"
                                                value={form.email} 
                                                onChange={handleChange} 
                                                placeholder='email@email.com' 
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Date:</td>
                                        <td>
                                            <input 
                                                type="date" 
                                                name="date"
                                                value={form.date} 
                                                onChange={handleChange} 
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
            case 'password':
                return (
                    <div>
                        <h1>Change the Password</h1>
                        <form onSubmit={handleSubmitPassword}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Current Password:</td>
                                        <td>
                                            <input 
                                                type="password"
                                                name="currentPassword"
                                                value={form.currentPassword}
                                                onChange={handleChange} 
                                                placeholder='************' 
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>New Password:</td>
                                        <td>
                                            <input 
                                                type="password"
                                                name="newPassword"
                                                value={form.newPassword} 
                                                onChange={handleChange} 
                                                placeholder='************'
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Retype New Password:</td>
                                        <td>
                                            <input 
                                                type="password"
                                                name="rnewPassword"
                                                value={form.rnewPassword}
                                                onChange={handleChange}
                                                placeholder='************' 
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type="submit">Submit</button>
                            <button type="button" onClick={handleReset}>Reset</button>
                        </form>
                        <p className='error'>{errorMessage}</p>
                    </div>
                );
            case 'remove':
                return (
                    <div>
                        <h1>Are you sure you want to remove this account?</h1>
                        <form onSubmit={handleRemoveSubmit}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Type the password:</td>
                                        <td>
                                            <input 
                                                type="password"
                                                name="password"
                                                value={form.password} 
                                                onChange={handleChange}
                                                placeholder='************'
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className='errbtn' type="submit">Remove this account</button>
                        </form>
                        <p className='error'>{errorMessage}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <NavBar auth={props.auth} />
            <div className='container'>
                <menu>
                    <ul className='listinfo'>
                        <li onClick={() => setView('information')}>Change Information</li>
                        <li onClick={() => setView('password')}>Change Password</li>
                        <li onClick={() => setView('remove')}>Delete Account</li>
                    </ul>
                </menu>
                {!data ? "Loading..." : renderView()}
            </div>
        </>
    );
}

export default Settings;
