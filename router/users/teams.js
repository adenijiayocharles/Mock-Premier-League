const express = require("express");
const router = express.Router();
const Team = require("../../models/admin/teamModels");
const checkUserAuth = require("../../middleware/userAuth");


router.get("/users/teams", checkUserAuth, (req, res) => {
    console.log(req.url);
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
router.get("/users/teams/:id", checkUserAuth, (req, res) => {
    console.log(req.url);
    console.log(req.params.id);
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

module.exports = router;