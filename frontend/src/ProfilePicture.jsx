import React,{useState,useEffect} from 'react'
import axios from 'axios'

function addProfilePicture(props){
    const [isChangingPicture,setIsChangingPicture] = useState(false)
    const [thefile,setThefile] = useState()
    const [pictureUrl,setPictureUrl] = useState("")
    const [data,setData] = useState()
    const [istemp,setIsTemp] = useState(false)
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
            setIsTemp(false)
        }else{
            setPictureUrl('http://localhost:5000/defaultpictures/profiledefault.jpg')
            setIsTemp(true)
        }
    },[data])

    const handlePicture = () => {
        setIsChangingPicture(!isChangingPicture)
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
            location.reload()
        }catch(err){
            console.log(err)
        }
        
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const information ={
            pictureUrl: thefile
        }
        try{
            const response = await axios.put('http://localhost:5000/profile/updatepictureprofile/'+data.id,information,{headers: {
                "content-type": "multipart/form-data",
            },})
            console.log(response)
            location.reload()
        }catch(err){
            console.log(err)
        }
    }

    const handleDelete = async () => {
        try{
            const resp = await axios.delete('http://localhost:5000/profile/deletepictureprofile/'+data.id)
            console.log(resp)
            location.reload()
        }catch(err){
            console.log(err)
        }
    }

    const updatePicture = <div id='updatedelpicture'>
            <h1>Wanna update the picture ?</h1>
            <form onSubmit={handleUpdate}>
                Select the picture :
                <input type="file" onChange={e => handleChangeFile(e)} required/>
                <button>Update</button>            
            </form>
            <button className='errbtn' onClick={handleDelete}>Delete the picture</button>
        </div>

    const addPicture = <div id="addpicture">
    <h1>Wanna change the profile picture ?</h1>
    <form onSubmit={handleSubmit}>
        Select the picture :
        <input type="file" onChange={e => handleChangeFile(e)} required/>
        <button>Change</button>
    </form>
    </div>

    const changePicture = istemp? addPicture : updatePicture
    return(<>
        <img className='profile' 
             src={pictureUrl}
             onClick={handlePicture} alt='profile picture'/>
            {isChangingPicture? changePicture :""}
    </>)
}

export default addProfilePicture