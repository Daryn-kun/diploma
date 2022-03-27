const express = require('express')
const router  = express.Router()

const Donation = require('../models/donation')

router.post('/donate', (req, res) => {
    let donationData = req.body
    let donation = new Donation(donationData)
    donation.save((error, enteredDonation) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).send(enteredDonation)
        }
    })
})

router.get('/', (req, res) => {
	Donation.find({}, (err, donations) => {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred', err);
		}
		else {
			res.json(donations);
		}
	});
});

router.get('/:id', function(req, res){
	console.log('Get request for a single donation');
	Donation.findById(req.params.id)
	.exec(function(err, donation){
		if (err){
			console.log("Error retrieving donation");
		} else {
			res.json(donation);
		}
	})
})

module.exports = router
