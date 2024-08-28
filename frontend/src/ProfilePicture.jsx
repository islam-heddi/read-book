import React,{useState,useEffect} from 'react'
import axios from 'axios'

function addProfilePicture(props){
    const [isChangingPicture,setIsChangingPicture] = useState(false)
    const [thefile,setThefile] = useState()
    const [pictureUrl,setPictureUrl] = useState("")
    const [data,setData] = useState()
    useEffect(() => {
        axios.get('http://localhost:5000/profile/getpictureprofile/'+props.id)
        .then(response => {
            setData(response.data)
        })
        .catch(err => {
            setPictureUrl('http://localhost:5000/defaultpictures/profiledefault.jpg')
            console.log(err)
        })
    },[])

    useEffect(() => {
        if(data){
            setPictureUrl('http://localhost:5000/'+data.pictureUrl)
        }else{
            setPictureUrl('http://localhost:5000/defaultpictures/profiledefault.jpg')
            
        }
    },[data])

    const handlePicture = () => {
        setIsChangingPicture(true)
    }
    
    const handleChangeFile = (e) => {
        setThefile(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const information = {
            id : props.id,
            pictureUrl : thefile
        }
        try{
            console.log(information)
            const res = await axios.post('http://localhost:5000/profile/addpictureprofile',information,{
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            console.log(res)
        }catch(err){
            console.log(err)
        }
        
    }

    const changePicture = <div>
    <h1>Wanna change the profile picture ?</h1>
    <form onSubmit={handleSubmit}>
        Select the picture :
        <input type="file" onChange={e => handleChangeFile(e)}/>
        <button>Change</button>
    </form>
    </div>
    return(<>
        <img className='profile' 
             src={pictureUrl}
             onClick={handlePicture} alt='profile picture'/>
            {isChangingPicture? changePicture :""}
    </>)
}

export default addProfilePicture