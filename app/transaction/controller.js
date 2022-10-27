const Transaction = require('./model');

module.exports = {
    index: async (req, res) => {
        try {
            const { limit, offset } = req.query;

            const transaction = await Transaction.find()
                .select("transactionId cashier subTotal total createdAt")
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
    },

    transactionToday: async (req, res) => {
        try {
            const dateTemp = new Date();
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

            const transaction = await Transaction.find({ transactionId: { $regex: dateNumber, $options: "i" } })
                .select("transactionId cashier subTotal total createdAt")
                .sort({ transactionId: -1 });
            const count = await Transaction.count({ transactionId: { $regex: dateNumber, $options: "i" } })

            if (transaction) {
                res.json({
                    message: "Success",
                    data: count,
                    transactions: transaction
                })
            } else {
                res.status(404).json({ message: "Data not found" });
            }
        } catch (err) {
            res.status(500).json({ message: err.errors || 'Internal Server Error' });
        }
    }
}