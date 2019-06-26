const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
    label: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = Category