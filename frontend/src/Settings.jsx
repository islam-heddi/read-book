import NavBar from './NavBar'
import {useNavigate} from 'react-router-dom'
import React,{useEffect} from 'react'
function Settings(props){
    const navigate = useNavigate()
    useEffect(() => {
        if(!props.auth)
            navigate('/login')
    },[])
    return(
        <>
        <NavBar />
        </>
    )
}

export default Settings