const Transaction = require('./model');

module.exports = {
    index: async (req, res) => {
        try {
            const { limit, offset } = req.query;

            const transaction = await Transaction.find()
                .select("transactionId subTotal total createdAt")
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip(offset);

            const count = await Transaction.count();

            let totalPage;
            if (!limit || limit == 0) {
                totalPage = 1;
            } else {
                totalPage = Math.ceil(count / limit);
            }

            res.json({
                message: "Success",
                data: count,
                totalPage,
                transaction
            })
        } catch (err) {
            res.status(500).json({ message: err.errors || 'Internal Server Error' });
        }
    },

    detail: async (req, res) => {
        try {
            const { id } = req.params;

            const transaction = await Transaction.findOne({ _id: id });

            res.json({
                message: "Success",
                data: transaction
            })
        } catch (err) {
            res.status(500).json({ message: err.errors || 'Internal Server Error' });
        }
    }
}