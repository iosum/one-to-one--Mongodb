const express = require('express');
const router = express.Router();

// add mongoose & Client model for CRUD
const mongoose = require('mongoose');
const Client = require('../models/client');

// read the list of clients
router.get('/', (req, res) => {
    Client.find((err, clients) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render('clients/add');
        }
    });
});


// load the add client form
router.get('/add', (req, res) => {
    res.render('clients/add');
});

// store the client from the add new client form
router.post('/add', (req, res) => {
    Client.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contact: req.body.contact,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        country: req.body.country,
        postalCode: req.body.postalCode,
        email: req.body.email
    },(err, newClient) => {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect('/clients/add');
        }
    });
});

// GET /clients/delete/foo
// :_id means this method expects a parameter called "_id"
router.get('/delete/:_id', (req, res, next) => {
    // use the mongoose model to delete the selected document
    // http requests has a parameter called _id, and we can access it through it's attribute which is params
    Client.remove({_id: req.params._id}, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/clients/add');
        }
    });
});

// GET /projects/edit/:_id : display the populated edit form
router.get('/edit/:_id', (req, res, next) => {
    Client.findById(req.params._id, (err, client) => {
        if (err) {
            console.log(err);
        } else {
            res.render('clients/edit', {
                client: client
            });
        }
    });
});

router.post('/edit/:_id', (req, res, next) => {
    Client.findOneAndUpdate({
            _id: req.params._id
        },
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            contact: req.body.contact,
            address: req.body.address,
            city: req.body.city,
            province: req.body.province,
            country: req.body.country,
            postalCode: req.body.postalCode,
            email: req.body.email
        }, (err, client) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/clients');
            }
        });
});

module.exports = router;