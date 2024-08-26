import NavBar from "./NavBar"
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"

function ShowBook(props){
    const navigate = useNavigate()
    const [data,setData] = useState()
    const id_of_book = useParams()
    const [pdfurl,setPdfurl] = useState("")
    useEffect(() => {
        axios.get('http://localhost:5000/book/findbook/'+id_of_book.id)
        .then(response => setData(response.data))
        .catch((err) => {
            console.log(err)
            navigate(-1)
        })
    },[])


    useEffect(() => {
        console.log(data)
        const url = "http://localhost:5000/"
        setPdfurl(!data? "" : url+data.pathbook)
    },[data])

/*    useEffect(() => {
        axios.get('http://localhost:5000/book/downloadbook/'+id_of_book.id)
        .then(response => {
            setDownloaddata(response.data)
        })
        .catch((err) => {
            console.log(err)
            navigate(-1)
        })
    },)*/

    const previewing = data && (
            <div>
                <h1>View the book</h1>
                <ul>
                    <li>Name : {data.name}</li>
                    <li>Author : {data.author}</li>
                    <li>pages : {data.pages}</li>
                </ul>
                <iframe src={pdfurl} width="100%" height="500px" />
            </div>       
    )

    return(
        <>
            <NavBar auth={props.auth}/> 
            {!data? "Loading ........": previewing}
        </>
    )
}

export default ShowBook