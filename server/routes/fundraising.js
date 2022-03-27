const express = require('express')
const router  = express.Router()
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
		console.log(file);
		var filetype = '';
		if(file.mimetype === 'image/gif') {
		  filetype = 'gif';
		}
		if(file.mimetype === 'image/png') {
		  filetype = 'png';
		}
		if(file.mimetype === 'image/jpeg') {
		  filetype = 'jpg';
		}
		cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
  
const upload = multer({ storage: storage });

const Fundraising = require('../models/fundraising')

router.get('/', (req, res) => {
	Fundraising.find({}, (err, fundraisings) => {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred', err);
		}
		else {
			res.json(fundraisings);
		}
	});
});

router.post('/create', upload.single('imagePath'), (req, res, next) => {
    let fundraisingData = req.body
	console.log(req.file.filename)
    fundraisingData.imagePath = 'http://localhost:3000/images/' + req.file.filename 
    let fundraising = new Fundraising(fundraisingData)
    fundraising.save((error, enteredFundraising) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).send(enteredFundraising)
        }
    })
});

router.get('/:id', function(req, res){
	console.log('Get request for a single fundraising');
	Fundraising.findById(req.params.id)
	.exec(function(err, fundraising){
		if (err){
			console.log("Error retrieving fundraising");
		} else {
			res.json(fundraising);
		}
	})
})

module.exports = router