import React,{useState} from 'react'

function Comments(){
    const [comment,setComment] = useState("")

    const handleComment = (e) => {
        setComment(e.target.value)
    }

    return(<>
        <div>
            <input type='text' value={comment} onChange={e => handleComment(e)} placeholder="Put your comment here" />
            <button>Submit</button>
        </div>
        
    </>)
}

export default Comments 