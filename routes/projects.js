const express = require('express');
const router = express.Router();

// add mongoose and projects model references for CRUD
const mongoose = require('mongoose');
const Project = require('../models/project');

// add the clients model to get the client collections
const Client = require('../models/client');

// add passport to check user authentication
const passport = require('passport');

// add body-parser to parse the response of the body
const bodyParser = require('body-parser');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        // user is logged in already so continue to the next function
        return next();
    }
    res.redirect('/login');
}


// GET /projects
router.get('/', isLoggedIn, (req, res, next) => {
    // use the Project model & mongoose to select(read) all the projects from MongoDB
    Project.find((err, projects) => {
        console.log(req);
        if (err) {
            console.log(err);
        } else {
            // load the main projects page
            res.render('projects/index', {
                projects: projects,
                user: req.user
            });
        }
    });
});

/**
 *  GET /projects/add
 */
router.get('/add', isLoggedIn,(req, res, next) => {
    // load the add view
    // get the list of clients for the dropdown
    Client.find((err, clients) => {
        if (err) {
            console.log(err);
        } else {
            res.render('projects/add', {
                clients: clients
            });
        }
    });

});

router.post('/add',isLoggedIn, (req, res, next) => {
    // create a new document in the projects collection using the project model
    Project.create({
        // get the data from the form and store it in the mongodb
        name: req.body.projectName,
        description: req.body.projectDescription
    }, (err, newProject) => {
        // if we get an error while storing the data
        if (err) {
            // log the error to the console
            console.log(err);
        }
        // otherwise, the data is stored successfully and we can redirect to the main page
        else {
            // load the updated foods index
            res.redirect('/projects');
        }
    })
});

// GET /projects/delete/foo
// :_id means this method expects a parameter called "_id"
router.get('/delete/:_id',isLoggedIn, (req, res, next) => {
    // use the mongoose model to delete the selected document
    // http requests has a parameter called _id, and we can access it through it's attribute which is params
    Project.remove({_id: req.params._id}, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/projects');
        }
    });
});

// GET /projects/edit/:_id : display the populated edit form
router.get('/edit/:_id',isLoggedIn, (req, res, next) => {
    Project.findById(req.params._id, (err, project) => {
        if (err) {
            console.log(err);
        } else {
            res.render('projects/edit', {
                project: project,
                user: req.user
            });
        }
    });
});


router.post('/edit/:_id',isLoggedIn, (req, res, next) => {
    Project.findOneAndUpdate({
            _id: req.params._id
        },
        {
            name: req.body.projectName,
            description: req.body.projectDescription
        }, (err, project) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/projects');
            }
        });
});


// make the controller public
module.exports = router;