const config = require('../../config');
const jwt = require('jsonwebtoken');

const User = require('../auth/model');

module.exports = {
    isLoginUser: async (req, res, next) => {
        try {
            const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

            const data = jwt.verify(token, config.jwtKey);

            const user = await User.findOne({ _id: data.user.id });

            if (!user) {
                throw new Error();
            }

            req.user = user;
            req.token = token;
            next();

        } catch (err) {
            res.status(401).json({
                error: 'Not authorize to access this resource'
            })
        }
    }
}