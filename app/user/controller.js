const User = require('../auth/model');

module.exports = {
    index: async (req, res) => {
        try {
            const role = req.user.role;
            if (role > 200) {
                return res.status(403).json({
                    message: "Doesn't have access to this action."
                })
            }

            const user = await User.find({ role: { $gte: role } })
                .select("username name role")
                .sort({ role: 1 });

            res.json({
                message: "Success",
                data: user
            })
        } catch (err) {
            res.status(500).json({ message: err.errors || 'Internal server error' })
        }
    },
    create: async (req, res, next) => {
        try {
            const payload = req.body;

            if (!payload.role || payload.role > req.user.role) {
                const user = new User(payload);
                await user.save();

                delete user._doc.password;

                res.json({ data: user });
            } else {
                return res.status(403).json({
                    message: "Doesn't have access to this action."
                })
            }


        } catch (err) {
            if (err && err.name === "ValidationError") {
                return res.status(422).json({
                    error: 1,
                    message: err.message,
                })
            }
            next(err);
        }
    },

    destroy: async (req, res) => {
        try {
            const { username } = req.params;

            const user = await User.findOne({ username });

            if (user.role <= req.user.role) {
                return res.status(403).json({
                    message: "Doesn't have access to this action."
                })
            }

            await User.deleteOne({ username });

            return res.json({ message: "Deleted" });
        } catch (err) {
            res.status(500).json({ message: err.errors || 'Internal server error' });
        }
    }
}