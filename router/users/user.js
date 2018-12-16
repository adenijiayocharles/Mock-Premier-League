const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../../models/users/userModel");


router.post("/users/signup", (req, res) => {
    if(req.body.name === undefined){
        return res.status(400).json({
            message: "name field can't be empty"
        });
    }

    if(req.body.email === undefined){
        return res.status(400).json({
            message: "email field can't be empty"
        });
    }    

    if(req.body.password === undefined){
        return res.status(400).json({
            message: "password field can't be empty"
        });
    }    

    //check if email is valid
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))){
        return res.status(400).send({
            message: "Invalid email address"
        });
    }    

    //search if registered before
    User.find({email: req.body.email})
    .then(user => {
        if(user.length >= 1){
            return res.status(409).json({
                status: false,
                message: "User already exists"
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
            let admin = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            admin.save()
            .then(result => {
                res.status(200).json({
                    status: true,
                    message: "User details created"
                });
            })
            .catch(err => {
                return res.status(500).json({
                    status: false,
                    error: err
                })
            })
        }
    })    
});

router.post("/users/login", (req, res) => {

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

    User.find({email: req.body.email})
    .then(user => {
        if(user.length < 1){
            res.status(401).json({
                status: false,
                message: "Auth failed"
            })
        }

        bcryptjs.compare(req.body.password, user[0].password, (err, result) => {
            // comparison failed
            if(err){
                res.status(401).json({
                    status: false,
                    message: "Auth failed"
                })                
            }
            //comparison successful
            if(result){
                // jwt here
                const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, "secret",
                    {
                        expiresIn: "3h"
                    }
                );
                return res.status(200).json({
                    message: "Auth successful",
                    token: token
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