const Cart = require('./model');

module.exports = {
    index: async (req, res) => {
        try {
            const cart = await Cart.find();
            const data = await Cart.aggregate([{
                $group: {
                    _id: null,
                    subTotal: {
                        $sum: {
                            $multiply: ["$price", "$quantity"]
                        }
                    }
                }
            }]);

            const tax = data[0]?.subTotal * 0.1;
            const total = data[0]?.subTotal + tax;

            res.json({
                message: 'Success',
                data: {
                    product: cart,
                    subTotal: data[0]?.subTotal,
                    total: total ? total : undefined
                }
            })
        } catch (err) {
            res.status(500).json({ message: err.errors || 'Internal Server Error' });
        }
    },

    create: async (req, res) => {
        try {
            const payload = req.body;

            const cart = await Cart(payload);
            await cart.save();

            res.json({
                message: 'Success',
                data: cart
            })
        } catch (err) {
            res.status(500).json({ message: err.errors || 'Internal Server Error' });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { quantity } = req.body;

            if (quantity < 1) {
                await Cart.findOneAndRemove({ _id: id });
            } else {
                await Cart.findOneAndUpdate({ _id: id }, { quantity });
            }

            res.json({ message: "Updated" })

        } catch (err) {
            res.status(500).json({ message: err.errors || 'Internal Server Error' });
        }
    },

    destroy: async (req, res) => {
        try {
            const { id } = req.params;

            await Cart.findOneAndRemove({ _id: id });

            res.json({
                message: "Deleted"
            })
        } catch (err) {
            res.status(500).json({ message: err.errors || 'Internal Server Error' });
        }
    },

    destroyMany: async (req, res) => {
        try {
            const { data } = req.body;

            if (data.length > 0 && typeof data === 'object') {
                await Cart.deleteMany({ _id: { $in: data } });

                res.json({ message: "Deleted" });
            } else {
                res.status(400).json({ message: "Data must be array of id" });
            }

        } catch (err) {
            res.status(500).json({ message: err.errors || 'Internal Server Error' });
        }
    },

    destroyAll: async (req, res) => {
        try {
            await Cart.deleteMany({});

            res.json({ message: "Deleted" });
        } catch (err) {
            res.status(500).json({ message: err.errors || 'Internal Server Error' });
        }
    }
}