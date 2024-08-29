import axios from "axios"
import React,{useEffect,useState,createContext} from 'react'
import { useNavigate } from "react-router-dom"

function AllBooks(){
    const navigate = useNavigate()
    const [data,setData] = useState()
    const [search,setSearch] = useState("")
    const [dataSearch,setDataSearch] = useState()
    const [isSearching,setIsSearching] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:5000/book/allbooks')
        .then(response => {
            setData(response.data)
            console.log(response.data)
        })
        .catch(err => console.log(err))
    },[])

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const startSearch = async () => {
        setIsSearching(true)
        try{
            const resp = await axios.get('http://localhost:5000/book/search?q='+search)
            console.log(resp)
            setDataSearch(resp.data)
        }catch(err){
            console.log(err)
        }
    }

    const ShowAllBooks = () => {
        setIsSearching(false)
    }

    const searchedData = dataSearch && (
        <>
        {dataSearch.map((value,index) => 
                    <div className="bookitem" onClick={() => navigate("/showbook/"+value._id)} key={index}>                
                        <ul>
                            <img src={value.coverPicture == "default"? 'http://localhost:5000/defaultpictures/default.png':`http://localhost:5000/${value.coverPicture}`} width="259px" height="194px" alt="cover picture" />
                            <li>name : {value.name}</li>
                            <li>Pages : {value.pages}</li>
                            <li>author : {value.author}</li>
                        </ul>
                    </div>
                )}
        </>
    )

    const alldata = data && (
        <>
            {data.map((value,index) => 
                    <div className="bookitem" onClick={() => navigate("/showbook/"+value._id)} key={index}>                
                        <ul>
                            <img src={value.coverPicture == "default"? 'http://localhost:5000/defaultpictures/default.png':`http://localhost:5000/${value.coverPicture}`} width="259px" height="194px" alt="cover picture" />
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
                    <input type="text" value={search} onChange={(e) => handleSearch(e)} placeholder='search'/>
                    <button onClick={startSearch}>Search</button>
                </div>
                {!isSearching? "":<button onClick={ShowAllBooks}>All Books</button>}
                <div>
                    {!isSearching? alldata: searchedData}
                </div>
            </div>
        </>
    )
}

export default AllBooks