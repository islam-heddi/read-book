import React,{useState,useEffect} from 'react'
import axios from'axios'
function Comments(props){
    const [comment,setComment] = useState("")
    const [todayDate,setTodayDate] = useState("")
    const [user,setUser] = useState() 
    const [data,setData]  = useState()
    const handleComment = (e) => {
        setComment(e.target.value)
    }

    useEffect(() => {
        axios.get('http://localhost:5000/board')
        .then(response => setUser(response.data))
        .catch(err => console.log(err))
    },[])

    useEffect(() => {
        axios.get('http://localhost:5000/comment/getCommentsByBookId/'+props.bookid)
        .then(response => {
            setData(response.data)
        })
        .catch(err => console.log(err))
    },[])

    const ShowComments = data && <div>
        {
            data.map((value,index) => <div key={index}>
                <p>in : <b>{value.datePublish}</b></p>
                <p>{value.comment}</p>
            </div>)
        }
    </div>

    const handleSubmitComment = async () => {
        if(!user) {
            console.log("Error in user or waiting for parsing the data")
            return 0;
        }
        let today = new Date()
        let today_string = today.toString()
        today_string = today_string.split(' ')
        setTodayDate(today_string[0]+" "+today_string[1]+" "+today_string[2]+" "+today_string[3])
        const information = {
            bookid: props.bookid,
            commenterid: user.id,
            comment,
            datePublish: todayDate
        }
        try{

            const response = await axios.post('http://localhost:5000/comment/addComment',information)
            console.log(response)
        }catch(err){
            console.log(err)
        }
    }

    return(<>
        <div>
        <h1>Comments</h1>
            <input type='text' className='commentinput' value={comment} onChange={e => handleComment(e)} placeholder="Put your comment here" />
            <button onClick={handleSubmitComment}>Comment</button>
        </div>
        {ShowComments}
    </>)
}

export default Comments 