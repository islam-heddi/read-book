const express = require('express')
const router = express.Router()
const profilepicture = require('./../models/schemaprofilepicture')
const multer = require('multer')
const upload = multer({dest:'uploads'})
const { move_this_profile_picture } = require('./moveFunctions')

router.get('/getpictureprofile/:id',async (req,res) => {
    const {id} = req.params
    try{
        const respo = await profilepicture.findOne({id:id})
        if(res == 0 ) return res.status(404).send("element not found")
        else res.status(200).json(respo)
    }catch(err){
        return res.status(500).send(`Error : ${err}`)
    }
})

router.post('/addpictureprofile',upload.single("pictureUrl"),(req,res) => {
    let pictureUrl = req.file
    const {id} = req.body;
    pictureUrl = move_this_profile_picture(pictureUrl)
    
    if(pictureUrl == 2) return res.status(400).send("The file extension must be .bmp .png .jpg .jpeg")
    else if(pictureUrl == 0 ) return res.status(400).send("error while sending the file")

    const newProfilePicture = new profilepicture({
        id,
        pictureUrl
    })
    newProfilePicture.save()
    .then(response => {return res.status(200).send(`Operation done <br>${response}`)})
    .catch(err => {return res.status(500).send(`error : ${err}`)})
})

module.exports = router