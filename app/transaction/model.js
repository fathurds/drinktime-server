const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    transactionId: {
        type: String,
        required: [true, "transactionId cannot be empty"],
    },
    subTotal: {
        type: Number,
        required: [true, 'subTotal cannot be empty'],
    },
    total: {
        type: Number,
        required: [true, 'total cannot be empty'],
    },
    cashier: {
        type: String,
        required: [true, 'Cashier cannot be empty'],
    },
    product: [{
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
    }]
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);