const Sequelize = require('sequelize')
const db = require('../db')
// const moment = require('moment')

const Transaction = db.define('transaction', {
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        // get: function() {
        //     return moment.utc(this.getDataValue('regDate').format('YYYY-MM-DD'))
        // }
    }, 
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
})

module.exports = Transaction