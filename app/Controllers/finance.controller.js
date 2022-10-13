const {Transaction, sequelize} = require("../models")

const getFinance = async (req, res) => {
    try {
        let balance =  await Transaction.findAll({
            where: {
                user_id: req.userId,
                type: 'T', 
                status: 'PAID', 
            },
            attributes: 
            [
                [sequelize.fn('SUM', sequelize.cast(sequelize.col('amount'), 'int')) , 'amounts'],
                [sequelize.fn('COUNT', sequelize.cast(sequelize.col('amount'), 'int')) , 'n_donation'],
            ]
        })
        let disbursed =  await Transaction.findAll({
            where: {
                user_id: req.userId,
                type: 'W'
            },
            attributes: 
            [
                [sequelize.fn('SUM', sequelize.cast(sequelize.col('amount'), 'int')) , 'amounts'],
            ]
        })
        
        
        balance[0].dataValues['n_views'] = 0
        balance[0].dataValues['disbursed'] = disbursed[0].dataValues.amounts ? disbursed[0].dataValues.amounts : 0
        // console.log();
        
        res.status(200).json({
            "msg": "Success retrieve data finance",
            "data": balance[0]
        })
        
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            "msg": "Internal server error",
        })
    }
}

const getBalance = async (req, res) => {
    try {
        const { page, size} = req.query;
        const { limit, offset } = getPagination(page, size);
        let balance =  await Transaction.findAll({
            where: {
                user_id: req.userId,
                type: 'T',
                status: "PAID" 
            },
            attributes: 
            [
                [sequelize.fn('SUM', sequelize.cast(sequelize.col('amount'), 'int')) , 'amounts'],
            ]
        })

        Transaction.findAndCountAll({
            where: {
                user_id: req.userId
            },
            limit,
            offset,
        }).then(result => {
            const data = getPagingData(result, page, limit)
            console.log(result);
            res.status(200).json({
                "msg": "Success retrieve the data",
                "data": {
                    amounts: balance[0].dataValues.amounts,
                    transcations: data,
                }
            })
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            "msg": "Internal server error",
        })
    }
}

const getPagination = (page, size) => {
    const limit = size ? +size : 8;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

const getPagingData = (dataQuery, page, limit) => {
    const { count: totalItems, rows: data } = dataQuery;
    const active = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, data, totalPages, active };
};

module.exports = {
    getFinance,
    getBalance,
}