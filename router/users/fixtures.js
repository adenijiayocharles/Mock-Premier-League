const express = require("express");
const router = express.Router();
const Fixture = require("../../models/admin/fixturesModels");

router.get("/users/fixtures", (req, res) => {
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
        return res.status(400).json({
            error: err
        });
    })
});

router.get("/users/fixtures/complete", (req, res) => {
    Fixture.find({playstatus: true})
    .then(fixtures => {
        if(fixtures.length === 0){
            return res.status(404).json({
                status: false,
                message: "there are currently no completed fixtures"
            })
        }      

        return res.status(200).json({
            status: true,
            count: fixtures.length,
            data: fixtures
        })
    })
    .catch(err => {
        return res.status(400).json({
            error: err
        });
    })
});

router.get("/users/fixtures/pending", (req, res) => {
    Fixture.find({playstatus: false})
    .then(fixtures => {
        if(fixtures.length === 0){
            return res.status(404).json({
                status: false,
                message: "there are currently no pending fixtures"
            })
        }      

        return res.status(200).json({
            status: true,
            count: fixtures.length,
            data: fixtures
        })
    })
    .catch(err => {
        return res.status(400).json({
            error: err
        });
    })
});

module.exports = router;