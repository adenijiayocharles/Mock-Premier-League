const express = require("express");
const router = express.Router();
const Team = require("../../models/admin/teamModels");
const checkUserAuth = require("../../middleware/userAuth");


router.get("/users/teams", checkUserAuth, (req, res) => {
    console.log(req.url);
    Team.find()
    .then(results => {
        if(results.length === 0){
            return res.status(404).json({
                status: false,
                message: "there are currently no team"
            });            
        }     

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
router.get("/users/teams/:id", checkUserAuth,(req, res) => {
    Team.findOne({teamid: req.params.id})
    .then(team => {
        if(team.length === 0){
            return res.status(404).json({
                status: false,
                message: `there are currently no team with id ${req.params.id}`
            })
        }   

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

// name search with query
router.get("/users/teams/name/:q", checkUserAuth,(req, res) => {
    Team.findOne({name: new RegExp('^'+req.params.q+'$', "i")})
    .then(team => {
        if(team.length === 0){
            return res.status(404).json({
                status: false,
                message: "there are currently no team"
            })
        }           
        
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
            message: `Unable to locate team with name ${req.params.q}`
        });            
    })
});
module.exports = router;