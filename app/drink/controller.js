const Drink = require('./model');

module.exports = {
    index: async (req, res) => {
        try {
            const drink = await Drink.find()
                .select("name desc price condition image category")
                .populate("category", "name");

            res.json({
                message: 'Success',
                data: drink
            })
        } catch (err) {
            res.status(500).json({ message: err.message || 'Internal Server Error' });
        }
    },

    getByCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const drink = await Drink.find({
                category: {
                    _id: id
                }
            })
                .select("name desc price condition image category")
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

            const drink = await Drink(payload).populate('category', 'name');
            await drink.save();

            res.json({
                message: 'Success',
                data: drink
            })
        } catch (err) {
            res.status(500).json({ message: err.message || 'Internal Server Error' });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body;

            await Drink.findOneAndUpdate({ _id: id }, payload);

            res.json({
                message: "Updated",
                data: payload
            })

        } catch (err) {
            res.status(500).json({ message: err.message || 'Internal Server Error' });
        }
    },

    destroy: async (req, res) => {
        try {
            const { id } = req.params;

            const drink = await Drink.findOneAndRemove({ _id: id });

            res.json({
                message: "Deleted",
                data: drink
            })
        } catch (err) {
            res.status(500).json({ message: err.message || 'Internal Server Error' });
        }
    }
}