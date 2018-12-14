const express = require("express");
const router = express.Router();
const Fixture = require("../models/fixturesModels");

// create fixture
router.post("/fixture", (req, res) => {
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
        return res.status(400).json({
            status: false,
            message: "Unable to create new fixture",
            error: err
        });
    })
});

// get all fixtures
router.get("/fixture", (req, res) => {
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
router.get("/fixture/:id", (req, res) => {
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
        res.status(400).json({
            status: false,
            message: `Unable to find team with id ${req.params.id}`
        })
    })
});


// delete fixture
router.delete("/fixture/:id", (req, res) => {
    Fixture.findOneAndDelete({_id: req.params.id})
    .then(result => {
        res.status(200).json({
            status: true,
            message: "fixture deleted"
        })
    })
    .catch(err => {
        res.status(400).json({
            status: false,
            message: `unable to delete fixture with id ${req.params.id}`
        })
    })
});

//update scores and play status
router.patch("/fixture/score/:id", (req, res) => {
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
})
module.exports = router;