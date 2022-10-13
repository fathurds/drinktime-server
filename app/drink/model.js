const mongoose = require('mongoose');

const drinkSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'drink name cannot be empty'],
    },
    desc: {
        type: String,
        required: [true, 'Description cannot be empty'],
    },
    price: [{
        size: {
            type: String,
            required: [true, 'Size cannot be empty'],
        },
        price: {
            type: Number,
            required: [true, 'Number cannot be empty'],
        },
        discount: {
            type: Number
        },
    }],
    condition: {
        type: [String],
        default: ['Hot', 'Ice']
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category cannot be empty']
    },
}, { timestamps: true })

module.exports = mongoose.model('Drink', drinkSchema);