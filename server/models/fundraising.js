const mongoose = require('mongoose')

const Schema = mongoose.Schema
const fundraisingSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId, ref: 'user'
    },
    title: String,
    details: String,
    categoryid: { 
        type: Schema.Types.ObjectId, ref: 'category'
    },
    amount_goal: Number,
    city: String,
    date: { type: Date, default: Date.now },
    currency: { type: String, default: "Tenge"},
    imagePath: String,
    card_num: String
})
module.exports = mongoose.model('fundraising', fundraisingSchema, 'fundraisings')