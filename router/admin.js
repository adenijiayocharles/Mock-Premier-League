const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const Admin = require("../models/adminModels");


router.post("/admin/signup", (req, res) => {
    // if no data in request body
    if(!req.body) {
        return res.status(400).send('Request body is missing')
    }    

    //check if email is valid
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))){
        return res.status(400).send({
            message: "Invalid email address"
        });
    }

    // search if email is already registered
    Admin.find({email: req.body.email})
    .then(admin => {
        if(admin.length >= 1){
            return res.status(409).json({
                message: "Email already exists"
            });
        }
    })

    // if user does not exist, store details
    bcryptjs.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            return res.status(500).json({
                error: err
            });
        }else{
            let admin = new Admin({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            admin.save()
            .then(result => {
                res.status(201).json({
                    status: true,
                    message: "Admin details created",
                    result: {
                        name: result.name,
                        email: result.email
                    }
                });
            })
            .catch(err => {
                console.log(err.code);
                res.status(500).json(err)
            })
        }
    })
});
module.exports = router;