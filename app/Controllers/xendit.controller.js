require('dotenv').config()
const Xendit = require('xendit-node');
const x = new Xendit({
  secretKey: process.env.XENDIT_API_KEY,
});
const { Invoice } = x;
const invoiceSpecificOptions = {};
const i = new Invoice(invoiceSpecificOptions);

const createInvoice = (req, res) => {
    try {
        i.createInvoice({
            externalID: Date.now().toString(),
            payerEmail: 'sayidinaahmadalqososyi@gmail.com',
            description: 'Invoice for Shoes Purchase',
            amount: 100000,
        }).then((response) => {
            return res.status(201).json({
                message: "Success to create invoice user.",
                data: response.id
            })
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const getInvoice = (req, res) => {
    try {
        i.getInvoice({invoiceID: req.body.id})
        .then(response => {
            return res.status(201).json({
                message: "Success to retrieve invoice user.",
                data: response
            })
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const cancelInvoice = (req, res) => {
    try {
        i.expireInvoice({
            invoiceID: req.body.id
        }).then((response) => {
            return res.status(201).json({
                message: "Success to cancel .",
                data: response.id
            })
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

module.exports = {
    createInvoice
}