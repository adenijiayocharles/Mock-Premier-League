const express = require("express");
const router = express.Router();
const Team = require("../models/teamModels");


// save team
router.post("/team", (req, res) => {
    if(Object.keys(req.body).length === 0){
        return res.status(400).json({
            message: "Request body is missing"
        });
    }

    // search if team has been added before
    Team.find({name: (req.body.name).toLowerCase()})
    .then(team => {
        if(team.length >= 1){
            return res.status(409).json({
                status: false,
                message: "Team already exists"
            });
        }
    });

    // search if team has been added before
    Team.find({teamid: req.body.teamid})
    .then(team => {
        if(team.length >= 1){
            return res.status(409).json({
                status: false,
                message: "Team already exists"
            });
        }
    });    

    // add team
    let teamDetails = {
        teamid: req.body.teamid,
        name: (req.body.name).toLowerCase(),
        coach: req.body.coach,
        year_founded: req.body.year_founded
    };

    let team = new Team(teamDetails);
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

// view all teams
router.get("/team", (req, res) => {
    Team.find()
    .then(results => {
        res.status(200).json({
            status: true,
            count: results.length,
            teams: results.map(result => {
                return {
                    teamid: result.teamid,
                    name: result.name,
                    coach: result.coach,
                    founded: result.year_founded
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            status: false,
            message: "no available teams"
        });
    })
});

// view single team by id
router.get("/team/:id", (req, res) => {
    Team.findOne({teamid: req.params.id})
    .then(team => {
        return res.status(200).json({
            status : "true",
            team: {
                id: team.teamid,
                name: team.name,
                founded: team.year_founded,
                coach: team.coach
            }
        });
    })
    .catch(err => {
        return res.status(500).json({
            status: false,
            message: `Unable to locate team with id ${req.params.id}`
        });            
    })
});

// delete team
router.delete("/team/:id", (req, res) => {
   Team.findOneAndDelete({teamid: req.params.id})
   .then(result => {
       res.status(200).json({
            status: true,
            message: "team deleted",
       })
   })
   .catch(err => {
       res.status(500).json({
            status: false,
            message: `invalid team id ${req.params.id}`
       })
   })
});

// update team details
router.patch("/team/:id", (req, res) => {
    Team.findOneAndUpdate({teamid: req.params.id}, req.body, {})
    .then(result => {
        console.log(result);
        res.status(200).json({
            status: true,
            message: "team details updated",
        })
    })
    .catch(err => {
        res.status(500).json({
            status: false,
            message: `unable to update team. Invalid team id ${req.params.id} `,
            error: err
       })
    })
});

router.put("/team/:id", (req, res) => {
    Team.findOneAndUpdate({teamid: req.params.id}, req.body, {})
    .then(result => {
        console.log(result);
        res.status(200).json({
            status: true,
            message: "team details updated",
        })
    })
    .catch(err => {
        res.status(500).json({
            status: false,
            message: "unable to update team. Invalid team id",
            error: err
       })
    })
});
module.exports = router;