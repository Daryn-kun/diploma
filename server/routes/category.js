const express = require('express')
const router  = express.Router()

const Category = require('../models/category')

router.get('/', (req, res) => {
	Category.find({}, (err, categories) => {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred', err);
		}
		else {
			res.json(categories);
		}
	});
});

router.post('/new_category', (req, res) => {
    let categoryData = req.body
    let category = new Category(categoryData)
    category.save((error, enteredCategory) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).send(enteredCategory)
        }
    })
})

router.get('/:id', function(req, res){
	console.log('Get request for a single category');
	Category.findById(req.params.id)
	.exec(function(err, category){
		if (err){
			console.log("Error retrieving category");
		} else {
			res.json(category);
		}
	})
})

module.exports = router
