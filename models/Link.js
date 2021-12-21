const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    number_order: {type: Number, required: true, unique: true},
    send_point: {type: String, required: true},
    ship_address: {type: String, required: true},
    status: {type: String, required: true},
    date: {type: Date, default: Date.now}
})

module.exports = model('Link', schema)