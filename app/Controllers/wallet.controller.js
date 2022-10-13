const {Wallet, Payment} = require('../models')

const createWalletAccount = async (req, res) => {
    try {

        req.body['user_id'] = req.userId

        if(req.body.is_active) {
            // first false kan is_active semua wallet jika user mengirim is_active yg baru
            await Wallet.update({is_active: false}, 
                {where: {
                    user_id: req.userId
                }}
            )
        }
        
        // first false kan is_active semua wallet
        Wallet.create(req.body).then(() => {
            return res.status(201).json({
                "msg": "Success add wallet account"
            })
        })
    
    } catch (error) {
        return res.status(500).json({
            "msg": "Internal server error"
        })
    }
}

const getWalletAccount = (req, res) => {
    try {
        Wallet.findAll({
            where: {
                user_id: req.userId
            },
            order: [
                ['is_active', 'DESC'],
            ],
            include: Payment
        }).then(result => {
            res.status(200).json({
                msg: "Success retrieve wallet accounts",
                data: result
            })
        })
    } catch (error) {
        
    }
}

const active = (req, res) => {
    try {
        try {

            req.body['user_id'] = req.userId
            
            // first false kan is_active semua wallet
            Wallet.update({
                is_active : false
            }, {
                where: {
                    user_id: req.userId,
                }
            }).then(() => {
                Wallet.update({
                    is_active : true
                }, {
                    where: {
                        user_id: req.userId,
                        id: req.body.id,
                    }
                }).then(() => {
                    Wallet.findAll({
                        where: {
                            user_id: req.userId
                        },
                        order: [
                            ['is_active', 'DESC'],
                        ],
                        include: Payment
                    }).then(result => {
                        return res.status(201).json({
                            "msg": "Success update wallet account",
                            "data": result
                        })
                    })
                })
            })
            
        
        } catch (error) {
            return res.status(500).json({
                "msg": "Internal server error"
            })
        }
    } catch (error) {
        
    }
}

module.exports = {
    createWalletAccount,
    getWalletAccount,
    active,
}