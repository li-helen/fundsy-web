const Sequelize = require('sequelize')
const db = require('../db')

const Account = db.define('account', {
    accessToken: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        // get () {
        //     return () => this.getDataValue('accessToken')
        // }
    },
    lastUpdate: {
        type: Sequelize.DATEONLY,
        // get: function() {
        //     return moment.utc(this.getDataValue('regDate').format('YYYY-MM-DD'))
        // }
    }
})

module.exports = Account