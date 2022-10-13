const Food = require('./model');

module.exports = {
    index: async (req, res) => {
        try {
            const food = await Food.find()
                .select("name desc price discount condition level topping image category")
                .populate("category", "name");

            res.json({
                message: 'Success',
                data: food
            })
        } catch (err) {
            res.status(500).json({ message: err.message || 'Internal Server Error' });
        }
    },

    getByCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const drink = await Food.find({
                category: {
                    _id: id
                }
            })
                .select("name desc price discount condition level topping image category")
                .populate("category", "name");

            res.json({
                message: 'Success',
                data: drink
            })
        } catch (err) {
            res.status(500).json({ message: err.message || 'Internal Server Error' });
        }
    },

    create: async (req, res) => {
        try {
            const payload = req.body;

            if (req.user.role > 200) {
                return res.status(403).json({
                    message: "Doesn't have access to this action."
                })
            }

            const food = await Food(payload).populate("category", "name");
            await food.save();

            res.json({
                message: 'Success',
                data: food
            })
        } catch (err) {
            res.status(500).json({ message: err.message || 'Internal Server Error' });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body;

            if (req.user.role > 200) {
                return res.status(403).json({
                    message: "Doesn't have access to this action."
                })
            }

            await Food.findOneAndUpdate({ _id: id }, payload);

            res.json({
                message: "Updated",
            })

        } catch (err) {
            res.status(500).json({ message: err.message || 'Internal Server Error' });
        }
    },

    destroy: async (req, res) => {
        try {
            const { id } = req.params;

            if (req.user.role > 200) {
                return res.status(403).json({
                    message: "Doesn't have access to this action."
                })
            }

            const food = await Food.findOneAndDelete({ _id: id });

            res.json({
                message: "Deleted",
                data: food
            })
        } catch (err) {
            res.status(500).json({ message: err.message || 'Internal Server Error' });
        }
    }
}