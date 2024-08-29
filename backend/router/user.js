const express = require('express')
const router = express.Router()
const profilepicture = require('./../models/schemaprofilepicture')
const multer = require('multer')
const upload = multer({dest:'uploads'})
const { move_this_profile_picture } = require('./moveFunctions')
const fs = require('fs')

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

router.put('/updatepictureprofile/:id',upload.single("pictureUrl"),async (req,res) => {
    const { id } = req.params
    let pictureUrl = req.file
    try{
        const resp = await profilepicture.find({id:id})
        if(fs.existsSync(resp.pictureUrl)){
            await fs.unlink(resp.pictureUrl,(err) => {
                if(err) res.status(400).send(`error : ${err}`)
            })
        }
        pictureUrl = move_this_profile_picture(pictureUrl)
        if(pictureUrl == 2) return res.status(400).send("The file extension must be .bmp .png .jpg .jpeg")
        else if(pictureUrl == 0 ) return res.status(400).send("error while sending the file")
        const resp2 = await profilepicture.findOneAndUpdate({id},{pictureUrl})
        return res.status(200).send("Update the picture done successfully")
    }catch(err){
        return res.status(500).send(`Error : ${err}`)
    }
})

router.delete('/deletepictureprofile/:id',(req,res) => {
    const {id} = req.params;
    profilepicture.find({id:id})
    .then(userprofile => {
        if(fs.existsSync(userprofile.pictureUrl)){
            fs.unlink(userprofile.pictureUrl,(err) => {
                if(err) return res.status(400).send("error while deleting the picture")
            })
        }
        profilepicture.findOneAndDelete({id})
        .then(response => {
            return res.status(200).send(`deleting the element successfully ${response}`)
        })
        .catch(err => {
            return res.status(500).send(`error : ${err}`)
        })
    })
    .catch(err => res.status(500).send(err))
})
module.exports = router