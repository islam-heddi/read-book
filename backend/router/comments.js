const express = require('express')
const router = express.Router()
const Comments = require('./../models/schemaComments')

router.get('/getAllComments',(req,res) => {
    Comments.find()
    .then(comments => res.status(200).json(comments))
    .catch(err => res.status(500).send(err))
})

router.get('/getComment/:id',(req,res) => {
    const {id} = req.params
    Comments.find({_id:id})
    .then(Comments => res.status(200).json(Comments))
    .catch(err => res.status(500).send(err))
})

router.get('/getCommentsByUserId/:id',(req,res) => {
    const { id } = req.params
    Comments.find({commentid:id})
    .then(Comments => res.status(200).json(Comments))
    .catch(err => res.status(500).send(err))
})

router.get('/getCommentsByBookId/:id',(req,res) => {
    const {id} = req.params
    Comments.find({bookid:id})
    .then(Comments => res.status(200).json(Comments))
    .catch(err => res.status(500).send(`Error : ${err}`))
})

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

router.put('/updateComment/:id',(req,res) => {
    const { id } = req.params;
    const { comment } = req.body;
    Comments.findAndUpdate({_id:id},{comment})
    .then(response => res.status(200).send(`Updated Successfully ${response}`))
    .catch(err => res.status(500).send(`ERROR : ${err}`))
})

router.delete('/deleteComment/:id',(req,res) => {
    const {id} = req.params
    Comments.findAndDelete({_id:id})
    .then(response => res.status(200).send(`deleted successfully ${response}`))
    .catch(err => res.status(500).send(`ERROR : ${err}`))
})

module.exports = router