require('dotenv').config()
const midtransClient = require('midtrans-client');
const { generateCustomUuid } = require('custom-uuid');

const {User, Transaction} = require('../models')
const {createTransaction} = require("./transaction.controller")

// Create Snap API instance
let apiClient = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction : false,
    serverKey : process.env.MIDTRANS_SERVER_KEY,
    clientKey : process.env.MIDTRANS_CLIENT_KEY
});

const createInvoice = async (req, res) => {

    try {
        
        let user = await User.findOne({
            where: {
                id: req.userId
            }
        })
        
        let uuid_custom = `TRN-${generateCustomUuid("123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 15)}`

        let parameter = {
            "transaction_details": {
                "order_id": uuid_custom,
                "gross_amount": req.body.amount
            },
            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "first_name": user.name,
                "email": user.email,
                "phone": user.phone
            }
        };

        // console.log(parameter);

        apiClient.createTransaction(parameter)
        .then((transaction)=>{

            let saveTrn = createTransaction({
                user_id: req.userId,
                amount: req.body.amount,
                type: 'T',
                status: 'PENDING',
                to_user: req.body.to_user,
                code: uuid_custom
            })
            if (!saveTrn.status) {
                return res.status(500).json({
                    // msg: saveTrn.msg
                    msg: "Internal server error"
                })
            }
            
            return res.status(201).json({
                message: "Success to create invoice user.",
                data: transaction
            })
        })
    } catch (error) {
        
    }
    

}

const invoiceCallback = (req, res) => {
    try {
        apiClient.transaction.notification(req.body)
        .then((statusResponse)=>{
            let orderId = statusResponse.order_id;
            let transactionStatus = statusResponse.transaction_status;
            let fraudStatus = statusResponse.fraud_status;
    
            // console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);
    
            // Sample transactionStatus handling logic
            if (transactionStatus == 'capture'){
                if (fraudStatus == 'challenge'){
                    // TODO set transaction status on your database to 'challenge'
                    // and response with 200 OK
                    Transaction.update({
                        transactionStatus: 'challenge',
                        payment,
                        payment_channel,
                        failure_code
                    }, 
                        {
                            where: {code : orderId}
                        }
                    ).then(() => {
                        return res.status(200).json({
                            "msg": 'Successfully resolve callback'
                        })
                    }).catch(() => {
                        return res.status(404).json({
                            "msg": 'Transaction doesn\'t exist.'
                        })
                    })
                    
                } else if (fraudStatus == 'accept'){
                    // TODO set transaction status on your database to 'success'
                    // and response with 200 OK
                    Transaction.update({
                        transactionStatus: 'success',
                        payment,
                        payment_channel,
                        failure_code
                    }, 
                        {
                            where: {code : orderId}
                        }
                    ).then(() => {
                        return res.status(200).json({
                            "msg": 'Successfully resolve callback'
                        })
                    }).catch(() => {
                        return res.status(404).json({
                            "msg": 'Transaction doesn\'t exist.'
                        })
                    })
                }
            } else if (transactionStatus == 'settlement'){
                // TODO set transaction status on your database to 'success'
                // and response with 200 OK
                Transaction.update({
                    transactionStatus: 'success',
                    payment,
                    payment_channel,
                    failure_code
                }, 
                    {
                        where: {code : orderId}
                    }
                ).then(() => {
                    return res.status(200).json({
                        "msg": 'Successfully resolve callback'
                    })
                }).catch(() => {
                    return res.status(404).json({
                        "msg": 'Transaction doesn\'t exist.'
                    })
                })
            } else if (transactionStatus == 'cancel' ||
            transactionStatus == 'deny' ||
            transactionStatus == 'expire'){
                // TODO set transaction status on your database to 'failure'
                // and response with 200 OK
                Transaction.update({
                    transactionStatus: 'failure',
                    payment,
                    payment_channel,
                    failure_code
                }, 
                    {
                        where: {code : orderId}
                    }
                ).then(() => {
                    return res.status(200).json({
                        "msg": 'Successfully resolve callback'
                    })
                }).catch(() => {
                    return res.status(404).json({
                        "msg": 'Transaction doesn\'t exist.'
                    })
                })
            } else if (transactionStatus == 'pending'){
                // TODO set transaction status on your database to 'pending' / waiting payment
                // and response with 200 OK
                Transaction.update({
                    transactionStatus: 'pending',
                    payment,
                    payment_channel,
                    failure_code
                }, 
                    {
                        where: {code : orderId}
                    }
                ).then(() => {
                    return res.status(200).json({
                        "msg": 'Successfully resolve callback'
                    })
                }).catch(() => {
                    return res.status(404).json({
                        "msg": 'Transaction doesn\'t exist.'
                    })
                })
            }
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            "msg": 'Internal server error',
            // "msg": error
        })
    }
}

const createPayout = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    createInvoice,
    createPayout,
    invoiceCallback,
}