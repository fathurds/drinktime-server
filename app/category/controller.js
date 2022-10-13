const Category = require('./model');

module.exports = {
    index: async (req, res) => {
        try {
            const category = await Category.find();

            res.json({ data: category });
        } catch (err) {
            res.status(500).json({ message: err.message || 'Internal Server Error' });
        }
    },

    getByType: async (req, res) => {
        try {
            const { type } = req.params;

            const category = await Category.find({ type });

            res.json({ data: category });
        } catch (err) {
            res.status(500).json({ message: err.message || 'Internal Server Error' });
        }
    },

    create: async (req, res) => {
        try {
            const { name, type, image } = req.body;

            const category = await Category({ name, type, image });
            await category.save();

            res.json({ data: category });
        } catch (err) {
            res.status(500).json({ message: err.message || 'Internal Server Error' });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, type, image } = req.body;

            await Category.findOneAndUpdate({ _id: id }, { name, type, image });

            res.json({
                message: 'Update Success',
                data: { name, type, image }
            });
        } catch (err) {
            res.status(500).json({ message: err.message || 'Internal Server Error' });
        }
    },

    destroy: async (req, res) => {
        try {
            const { id } = req.params;

            const category = await Category.findOneAndRemove({ _id: id });

            res.json({
                message: 'Deleted',
                data: category
            });
        } catch (err) {
            res.status(500).json({ message: err.message || 'Internal Server Error' });
        }
    }
}