const express = require("express");
const router = express.Router();
const Team = require("../models/teamModels");


// save team
router.post("/team/create", (req, res) => {
    if(Object.keys(req.body).length === 0){
        return res.status(400).json({
            message: "Request body is missing"
        });
    }

    // search if team has been added before
    Team.find({name: req.body.name})
    .then(team => {
        if(team.length >= 1){
            return res.status(409).json({
                message: "Team already exists"
            });
        }
    });

    // add team
    let team = new Team(req.body);
    team.save()
    .then(result => {
        res.status(201).json({
            status: true,
            message: "Team created successfully",
        });
    })
    .catch(err => {
        console.log(err.code);
        res.status(500).json(err)
    })    
});
// edit team

// delete team

// view all teams

// view single team

module.exports = router;