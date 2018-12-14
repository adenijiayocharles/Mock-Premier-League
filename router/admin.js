const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const Admin = require("../models/adminModels");



router.post("/admin/signup", (req, res) => {
    if(req.body.name === undefined){
        return res.status(400).json({
            message: "Admin name can not be empty"
        });        
    }


    if(req.body.email === undefined){
        return res.status(400).json({
            message: "Email address can not be empty"
        });        
    }  
    
    if(req.body.password === undefined){
        return res.status(400).json({
            message: "Password can not be empty"
        });        
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
                status: false,
                message: "Email already exists"
            });
        }
    })

    // if user does not exist, store details
    bcryptjs.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            return res.status(500).json({
                status: false,
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
                res.status(200).json({
                    status: true,
                    message: "Admin details created"
                });
            })
            .catch(err => {
                status: false,
                res.status(500).json(err)
            })
        }
    })
});

router.post("/admin/login", (req, res) => {

    if(req.body.email === undefined){
        return res.status(400).json({
            message: "Email address can not be empty"
        });        
    }  
    
    if(req.body.password === undefined){
        return res.status(400).json({
            message: "Password can not be empty"
        });        
    }

    Admin.find({email: req.body.email})
    .then(admin => {
        if(admin.length < 1){
            res.status(401).json({
                status: false,
                message: "Auth failed"
            })
        }

        bcryptjs.compare(req.body.password, admin[0].password, (err, result) => {
            // comparison failed
            if(err){
                res.status(401).json({
                    status: false,
                    message: "Auth failed"
                })                
            }

            //comparison successful
            if(result){
                return res.status(200).json({
                    message: "Auth successful"
                })
            }

            //error
            res.status(401).json({
                message: "Auth failed"
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});
module.exports = router;