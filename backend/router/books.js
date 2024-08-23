const express = require('express')
const router = express.Router()
const book = require('./../models/schemabook')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
router.get('/allbooks',(req,res) => {
    book.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(400).send(err))
})

router.get('/mybooks/:id',(req,res) => {
    const {id} = req.params;
    book.find({publisherid:id})
    .then(books => res.json(books))
    .catch(err => res.status(400).send(err))
})

router.get('/downloadbook/:id',(req,res)=>{
    const {id} = req.params
    book.findById({_id:id})
    .then(book => res.status(200).download(book.pathbook))
    .catch(err => res.status(404).send("book not found"))
})

router.get('/findbook/:id',(req,res) => {
    const {id} = req.params
    book.findById({_id:id})
    .then(book => res.status(200).json(book))
    .catch(err => res.status(404).send("book not found"))
})

const move_this_pdf_file = (oldfile) => {
    let oldpath = oldfile.originalname
    const ext = path.extname(oldpath)
    if(ext != ".pdf") return 0
    const filename = path.basename(oldpath,'.pdf')
    var today = new Date()
    var year = today.getFullYear()
    var month = today.getMonth()
    month = (month < 10)? "0"+month : month
    var day = today.getDay()
    day = (day < 10)? "0"+day : day
    var hour = today.getHours()
    hour = (hour < 10)? "0"+hour:hour
    var minute = today.getMinutes()
    minute = (minute < 10)? "0"+minute:minute
    var second = today.getSeconds()
    second = (second < 10)? "0"+second:second
    const newpath = `./files/${filename}${year}${month}${day}${hour}${minute}${second}.pdf`
    fs.copyFile(oldfile.path,newpath,(err) => {
        if(err) return 0
    }) 
    return newpath
}

router.post('/addbook',upload.single('pathbook'),(req,res) => {
    let pathbook = req.file
    if(!pathbook) return res.status(400).send("Bad file or invalid file")
    let { coverPicture,name,author,pages,publisherid } = req.body;
    pathbook = move_this_pdf_file(pathbook)
    if(!pathbook) return res.status(500).send("Error : check the extension of file it should be .pdf or no such a file or a directory")
    const newBook = new book({
        publisherid,
        pathbook,
        coverPicture,
        name,
        author,
        pages
    })
    newBook.save()
    .then(() => res.status(200).send("Added successfully"))
    .catch((err) => res.send(`error : ${err}`))
})

router.put('/updatebook/:id', (req,res) => {
    const {id} = req.params
    const { coverPicture,name,author,pages,publisherid } = req.body
    book.findByIdAndUpdate({_id:id},{coverPicture,publisherid,name,author,pages})
    .then(() => res.status(200).send("updated successfully"))
    .catch(err => res.status(400).send(err))

})

router.delete('/deletebook/:id',(req,res) => {
    const {id} = req.params
    book.findById({_id:id})
    .then(tbook => {
            let filepdf = tbook.pathbook
            filepdf = path.resolve(filepdf)
            if(fs.existsSync(filepdf)){
                fs.unlink(filepdf,(err) => {
                    if(err) return res.status(400).send("unable to remove the file")
                    book.findByIdAndDelete({_id:id})
                    .then(() => res.status(200).send("Deleted Successfully"))
                    .catch(err => res.status(400).send(`error : ${err}`))
                })
            }else{
                res.status(404).send("Error : file doesnt exist")
            }
        })
        .catch(err => res.status(404).send("id is not existing"))
    }
)

module.exports = router