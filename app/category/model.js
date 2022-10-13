const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name cannot be empty']
    },
    type: {
        type: String,
        enum: ['Food', 'Drink'],
        default: 'Food'
    },
    image: {
        type: String,
        required: [true, 'Image cannot be empty']
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);