import axios from "axios"
import React,{useEffect,useState,createContext} from 'react'
import { useNavigate } from "react-router-dom"

function AllBooks(){
    const navigate = useNavigate()
    const [data,setData] = useState()
    useEffect(() => {
        axios.get('http://localhost:5000/book/allbooks')
        .then(response => {
            setData(response.data)
            console.log(response.data)
        })
        .catch(err => console.log(err))
    },[])

    const alldata = data && (
        <>
            {data.map((value,index) => 
                    <div className="bookitem" onClick={() => navigate("/showbook/"+value._id)} key={index}>                
                        <ul>
                            <li>name : {value.name}</li>
                            <li>Pages : {value.pages}</li>
                            <li>author : {value.author}</li>
                        </ul>
                    </div>
                )}
        </>
    )

    return(
        <>
            <div>
                <div className='search'>
                    <input type="text" placeholder='search'/>
                    <button>Search</button>
                </div>
                <div>
                    {alldata}
                </div>
            </div>
        </>
    )
}

export default AllBooks