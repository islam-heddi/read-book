const express = require('express')
const router = express.Router()
const Customer = require(".././models/schemacustomer")

router.post("/addCustomer",(req,res) => {
    const { name,adress } = req.body;
    const newCustomer = new Customer({
        name,
        adress,
    })
    newCustomer.save()
    .then(() => {
        res.send("DATA CREATED SUCCESSFULLY")
    })
    .catch((err) => {
        res.send(`Error : ${err}`)
    })
})

router.get("/getCustomers",(req,res) => {
    Customer.find().then((users) => {
        res.json(users)
    }
    )
    .catch(err => res.send(err))
})

router.put("/updateCustomer",(req,res) => {
    const { original_name,new_name } = req.body;
    Customer.findOneAndUpdate({name: original_name},{name: new_name})
    .then(() => {
        res.send("Updated successfully")
    })
    .catch((err) => res.send(`Error : ${err}`))
})


router.delete("/deleteCustomer",(req,res) => {
    const {name} = req.body;
    Customer.findOneAndDelete({name})
    .then(() => {
        res.send("Deleted Successfully")
    })
    .catch((err) => res.send(`error : ${err}`))
})


module.exports = router