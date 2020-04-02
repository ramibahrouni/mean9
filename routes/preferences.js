var express = require('express');
var router = express.Router();
var app = express();
var server = require('http').createServer(app);
var Clients = require('../models/preferences');
// const accountSid = 'AC13c4f83e59e67a2f25086a02c7ea14cf';
// const authToken = '7090ae421b57fe4a4a34c71f1398e005';
// const twilio = require('twilio')(accountSid, authToken);
// const nodemailer = require('nodemailer');
// var transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "a039b3531ce540",
//       pass: "511fbaa6b225af"
//     }
//   });

// const message = {
//     from: 'ramibahrouni47@gmail.com', // Sender address
//     to: 'rami.bahrouni@outlook.com',         // List of recipients
//     subject: 'Testing Email Sending API', // Subject line
//     text: 'Hello, MedAMine & Ghada, i think the test works perfectly!' // Plain text body
// };
// list data

router.get('/', function(req, res) {
    Clients.find(function (err, clients) {
        if (err) return next(err);
        res.json(clients);
    });
});

// get data by id
router.get('/:id', function(req, res, next) {
    Clients.findById(req.params.id, function (err, clients) {
        if (err) return next(err);
        res.json(clients);
    });
});
  
// post data
router.post('/', function(req, res, next) {
    Clients.create(req.body, function (err, clients) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(clients);
    });
});
  
// put data
router.put('/:id', function(req, res, next) {
    Clients.findByIdAndUpdate(req.params.id, req.body, function (err, clients) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(clients);
    });
});
  
// delete data by id
router.delete('/:id', function(req, res, next) {
    Clients.findByIdAndRemove(req.params.id, req.body, function (err, clients) {
        if (err) return next(err);
        res.json(clients);
    });
});

module.exports = router;
