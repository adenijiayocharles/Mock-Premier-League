const express = require("express");
const router = express.Router();
const Fixture = require("../../models/admin/fixturesModels");
const checkAdminAuth = require("../../middleware/adminAuth");

// create fixture
router.post("/fixtures", checkAdminAuth, (req, res) => {
    if(Object.keys(req.body).length === 0){
        return res.status(400).json({
            message: "request body is missing"
        });
    }

    let fixture = new Fixture(req.body);
    fixture.save()
    .then(result => {
        res.status(200).json({
            status: true,
            message: "Fixture created successfully",
            data: result
        })
    })
    .catch(err => {
        return res.status(500).json({
            status: false,
            message: "Unable to create new fixture",
            error: err
        });
    })
});

// get all fixtures
router.get("/fixtures", checkAdminAuth, (req, res) => {
    Fixture.find()
    .then(fixtures => {
        if(fixtures.length === 0){
            return res.status(404).json({
                status: false,
                message: "there are currently no fixtures"
            })
        }      

        return res.status(200).json({
            status: true,
            count: fixtures.length,
            data: fixtures
        })
    })
    .catch(err => {
        res.status(400).json({
            status: false,
            error: err
        })
    })
});

//get single fixture
router.get("/fixtures/:id", checkAdminAuth, (req, res) => {
    if(req.params.id === undefined){
        return res.status(400).json({
            message: "id param can not be empty"
        });        
    }

    Fixture.findOne({_id: req.params.id})
    .then(result => {
        res.status(200).json({
            status: true,
            data: {
                fixture_id: result._id,
                played: result.playstatus ? "completed" : "pending",
                home_team: result.home,
                away_team: result.away,
                played_date: result.playdate,
                played_time: result.playtime,
                venue: result.stadium,
                score: {
                    home: result.score.home,
                    away: result.score.away
                }
            }
        })
    })
    .catch(err => {
        res.status(404).json({
            status: false,
            message: `Unable to find team with id ${req.params.id}`
        })
    })
});

// delete fixture
router.delete("/fixtures/:id", checkAdminAuth, (req, res) => {
    if(req.params.id === undefined){
        return res.status(400).json({
            message: "id param can not be empty"
        });        
    }

    Fixture.findOneAndDelete({_id: req.params.id})
    .then(result => {
        res.status(200).json({
            status: true,
            message: "fixture deleted"
        })
    })
    .catch(err => {
        res.status(404).json({
            status: false,
            message: `unable to delete fixture with id ${req.params.id}`
        })
    })
});

//update scores and play status
router.put("/fixtures/score/:id", checkAdminAuth, (req, res) => {
    if(req.params.id === undefined){
        return res.status(400).json({
            message: "id param can not be empty"
        });        
    }

    if(req.body.status === undefined){
        return res.status(400).json({
            message: "Status field can not be empty"
        });        
    }    

    if(req.body.home === undefined){
        return res.status(400).json({
            message: "home score field can not be empty"
        });        
    }        

    if(req.body.away === undefined){
        return res.status(400).json({
            message: "away score field can not be empty"
        });        
    }            

    let score = {
        playstatus: req.body.status,
        score: {
            home: req.body.home,
            away: req.body.away    
        }
    }
    Fixture.findOneAndUpdate({_id: req.params.id}, score, {})
    .then(results => {
        res.status(200).json({
            status: true,
            message: "fixture updated"
        })
    })
    .catch(err => {
        res.status(400).json({
            status: false,
            message: "unable to update fixture"
        })
    })
});

//update play date
router.put("/fixtures/date/:id", checkAdminAuth, (req, res) => {
    if(req.params.id === undefined){
        return res.status(400).json({
            message: "id param can not be empty"
        });        
    }


    if(req.body.playdate === undefined){
        return res.status(400).json({
            message: "playdate field can not be empty"
        });        
    }

    Fixture.findOneAndUpdate({_id: req.params.id }, req.body, {})
    .then(results => {
        res.status(200).json({
            status: true,
            message: "fixture date updated"
        })
    })
    .catch(err => {
        res.status(400).json({
            status: false,
            message: "unable to update fixture date"
        })
    })
});

module.exports = router;