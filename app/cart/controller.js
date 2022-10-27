const Cart = require('./model');
const Transaction = require('../transaction/model');

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
    },

    order: async (req, res) => {
        try {
            const cart = await Cart.find();

            if (cart.length > 0) {
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

                // INVOICE START
                const dateTemp = new Date;
                const year = dateTemp.getFullYear();
                let date = dateTemp.getDate();
                let month = dateTemp.getMonth() + 1;
                if (month < 10) {
                    month = "0" + month;
                }
                if (date < 10) {
                    date = "0" + date;
                }
                const dateNumber = `${year}${month}${date}`;

                let payload = {};

                const lastTransaction = await Transaction.findOne({}, {}, { sort: { createdAt: -1 } });
                if (lastTransaction) {
                    const lastTransactionArr = lastTransaction.transactionId.split("/");

                    let uniqueCode = 0;
                    if (lastTransactionArr[1] !== dateNumber) {

                        if (lastTransactionArr[1] > dateNumber) { // FIXED BUG IF USER CHANGE LOCAL DATE
                            const lastTransactionForBug = await Transaction.findOne({ transactionId: { $regex: dateNumber, $options: "i" } }).sort({ transactionId: -1 });
                            const lastTransactionForBugArr = lastTransactionForBug.transactionId.split("/");
                            uniqueCode = parseInt(lastTransactionForBugArr[2]) + 1;

                        } else {
                            uniqueCode = 1;
                        }
                    } else {
                        uniqueCode = parseInt(lastTransactionArr[2]) + 1;
                    }
                    // INVOICE END

                    payload = {
                        transactionId: `INV/${dateNumber}/${uniqueCode}`,
                        cashier: req.user.username,
                        product: cart,
                        subTotal: data[0]?.subTotal,
                        total: total ? total : undefined,
                    }

                } else {
                    payload = {
                        transactionId: `INV/${dateNumber}/1`,
                        cashier: req.user.username,
                        product: cart,
                        subTotal: data[0]?.subTotal,
                        total: total ? total : undefined,
                    }

                    // INVOICE END IF DON'T HAVE HISTORY TRANSACTION
                }

                const transaction = await Transaction(payload);
                await transaction.save();
                await Cart.deleteMany({});

                res.json({
                    message: "Success",
                    data: transaction
                })

            } else {
                res.status(404).json({ message: "Data not found" });
            }
        } catch (err) {
            res.status(500).json({ message: err.errors || 'Internal Server Error' });
        }
    }
}