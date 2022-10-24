const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be empty'],
    },
    type: {
        type: String,
        required: [true, 'Type cannot be empty'],
    },
    level: Number,
    size: String,
    condition: String,
    price: {
        type: Number,
        required: [true, 'Price cannot be empty'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity cannot be empty'],
    },
    desc: String
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);