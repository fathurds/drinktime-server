const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const HASH_ROUND = 10;

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username must not be null'],
        minLength: [5, "Username must have at least 5 characters"],
        maxLength: [12, "Username up to 12 characters"],
    },
    password: {
        type: String,
        required: [true, 'Password must not be null'],
        minLength: [5, "Password must have at least 5 characters"],
    },
    name: {
        type: String,
        required: [true, 'Name must not be null']
    },
    role: {
        type: Number,
        enum: [100, 200, 300],
        default: 300
    }
});

// Unique username
userSchema.path('username').validate(async function (value) {
    try {
        const count = await this.model('User').countDocuments({ username: value });
        return !count;
    } catch (err) {
        throw err;
    }
}, attr => `${attr.value} already used`);

// Hash Password
userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND);
    next();
})

module.exports = mongoose.model('User', userSchema);