const express = require('express')
const router = express.Router()
const Comments = require('./../models/schemaComments')

router.post('/addComment',(req,res) => {
    const {bookid,comment,commenterid,datePublish} = req.body
    const newComment = new Comments({
        bookid,
        commenterid,
        comment,
        datePublish,
    })
    newComment.save()
    .then(response => res.status(200).send(`added successfully ${response}`))
    .catch(err => res.status(500).send(`ERROR : ${err}`))
})

module.exports = router