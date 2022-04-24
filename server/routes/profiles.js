const express = require('express')
const router  = express.Router()
const jwt     = require('jsonwebtoken')

const User = require('../models/user')

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            let payload = { subject: registeredUser._id}
            let user_id = registeredUser._id;
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token, user_id})
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({email: userData.email}, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid email')
            } else 
            if (user.password !== userData.password) {
                res.status(401).send('Invalid password')
            } else {
                let payload = { subject: user._id}
                let user_id = user._id;
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token, user_id})
            }
        }
    })
})

router.get('/:id', function(req, res){
	console.log('Get request for a single user');
	User.findById(req.params.id)
	.exec(function(err, user){
		if (err){
			console.log("Error retrieving user");
		} else {
			res.json(user);
		}
	})
})

router.put('/editpage/:id', function (req, res){
    var user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        gender: req.body.gender,
    };

    console.log('Update user data');
    User.findByIdAndUpdate(req.params.id,
        { $set: user },
        { new: true },
        (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in User Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/changepass/:id', function (req, res){
    var user = {
        password: req.body.password
    };

    console.log('Update user password');
    User.findByIdAndUpdate(req.params.id,
        { $set: user },
        { new: true },
        (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in User Password Update :' + JSON.stringify(err, undefined, 2)); }
        });
});

module.exports = router