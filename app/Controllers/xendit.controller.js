require('dotenv').config()
const Xendit = require('xendit-node');
const x = new Xendit({
  secretKey: process.env.XENDIT_API_KEY,
});
const { Invoice, Disbursement } = x;
const invoiceSpecificOptions = {};
const disbursementSpecificOptions = {};
const i = new Invoice(invoiceSpecificOptions);
const d = new Disbursement(disbursementSpecificOptions);
const {createTransaction} = require("./transaction.controller")
const {getDetailUser} = require("./user.controller")
const {User, Transaction} = require('../models')

const createInvoice = async (req, res) => {
    try {   
        // get data user
        // console.log(req.userId);
        let user = await User.findOne({
            where: {
                id: req.userId
            }
        })
        
        // create invoice 
        i.createInvoice({
            externalID: Date.now().toString(),
            payerEmail: user.email,
            description: 'Invoice for Donation',
            amount: req.body.amount,
            'customer_notification_preference': {
                'invoice_created': [
                  'email'
                ],
                'invoice_reminder': [
                  'email'
                ],
                'invoice_paid': [
                  'email'
                ],
                'invoice_expired': [
                  'email'
                ]
              },
            'success_redirect_url': 'https://8373-140-213-150-180.ap.ngrok.io/api/v1/invoice/callback',
            'failure_redirect_url': 'https://8373-140-213-150-180.ap.ngrok.io/api/v1/invoice/callback',
            
        }).then((response) => {
            // return res.status(500).json({
            //     // msg: transaction.msg
            //     msg: response
            // })
            // store transaction data into db 
            let transaction = createTransaction({
                user_id: req.userId,
                amount: req.body.amount,
                type: 'T',
                status: response.status,
                to_user: req.body.to_user,
                code: response.id
            })
            if (!transaction.status) {
                return res.status(500).json({
                    // msg: transaction.msg
                    msg: "Internal server error"
                })
            }
            
            return res.status(201).json({
                message: "Success to create invoice user.",
                data: response.invoice_url
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

const invoiceCallback = (req, res) => {
    // res.status(200).json({
    //     "msg": 'Successfully resolve callback'
    // })

    if(req.headers['x-callback-token'] != process.env.XENDIT_WEBHOOK_KEY) {
        res.status(401).json({
            "msg": 'Sorry we cann\'t resolve this request'
        })
    }

    try {
        let code = req.body.id
        let status = req.body.status
        let payment = req.body.payment_method
        let payment_channel = req.body.payment_channel
        let failure_code = req.body.failure_code
        // console.log(req.body);
        Transaction.update({
            status,
            payment,
            payment_channel,
            failure_code
        }, 
            {
                where: {code}
            }
        )

        res.status(200).json({
            "msg": 'Successfully resolve callback'
        })
        
    } catch (error) {
        console.log('error nih', error);
        res.status(404).json({
            "msg": 'Internal server error'
        })
    }
    
}

const disbursement =  (req, res) => {
    
    try {
        Transaction.findOne({
            where: {
                "type": 'W',
                "user_id": req.userId,
            },
            order: [
                ['createdAt', 'DESC'],
            ]
        }).then(async data => {
            // console.log(data);
            // return true
            data = data ? data.id : 1;
            let id = `disb-${data}`
            // externalID
            req.body['externalID'] = id

            await d.create(req.body).then(resp => {
                console.log(resp);
                return
                let transaction = createTransaction({
                    user_id: req.userId,
                    amount: req.body.amount,
                    type: 'W',
                    status: resp.status,
                    to_user: req.userId,
                    code: resp.id
                })
                
                return res.status(201).json({
                    "msg": "Successfull create disbursement",
                    data: resp
                    })
                    
            })

        }).catch(error => {
            return res.status(500).json({
                msg: error.message
            })
        })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}

const disbursementCallback = (req, res) => {
    // res.status(200).json({
    //     "msg": 'Successfully resolve callback'
    // })
    // return

    if(req.headers['x-callback-token'] != process.env.XENDIT_WEBHOOK_KEY) {
        res.status(401).json({
            "msg": 'Sorry we cann\'t resolve this request'
        })
    }

    try {
        let code = req.body.id
        let status = req.body.status
        let payment = req.body.payment_method
        let payment_channel = req.body.payment_channel
        let failure_code = req.body.failure_code
        // console.log(req.body);
        Transaction.update({
            status,
            payment,
            payment_channel,
            failure_code
        }, 
            {
                where: {code}
            }
        )

        res.status(200).json({
            "msg": 'Successfully resolve callback'
        })
        
    } catch (error) {
        console.log('error nih', error);
        res.status(404).json({
            "msg": 'Internal server error'
        })
    }
    
}

module.exports = {
    createInvoice,
    invoiceCallback,
    disbursement,
    disbursementCallback,
}