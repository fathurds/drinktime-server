const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Food name must not be null'],
    },
    desc: {
        type: String,
        required: [true, 'Description must not be null'],
    },
    price: {
        type: Number,
        required: [true, 'Price must not be null']
    },
    discount: {
        type: Number
    },
    condition: {
        type: [String],
        default: undefined
    },
    topping: {
        type: [String],
        default: undefined
    },
    level: {
        type: [Number],
        default: undefined
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category must not be null']
    },
}, { timestamps: true })

module.exports = mongoose.model('Food', foodSchema);