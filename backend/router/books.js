const express = require('express')
const router = express.Router()
const book = require('./../models/schemabook')

router.get('/allbooks',(req,res) => {
    book.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(400).send(err))
})

router.get('/findbook/:id',(req,res) => {
    const {id} = req.params
    book.findById({_id:id})
    .then(book => res.status(200).json(book))
    .catch(err => res.status(404).send("book not found"))
})

router.post('/addbook',(req,res) => {
    const { coverPicture,name,author,pages,publisherid } = req.body;
    const newBook = new Book({
        publisherid,
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
    book.findByIdAndDelete({_id:id})
    .then(() => res.status(200).send("Deleted Successfully"))
    .catch(err => res.status(400).send(`error : ${err}`))
})

module.exports = router