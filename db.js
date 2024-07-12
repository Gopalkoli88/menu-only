const mongoose = require('mongoose')

// mongourl 
const mongoURL = 'mongodb://localhost:27017/unite'

mongoose.connect(mongoURL)

const db = mongoose.connection

db.on('connected', () => {
    console.log('database is connected ')
})
db.on('error', () => {
    console.log('something error is occure ')
})
db.on('disconnected', () => {
    console.log('database connection is disconnected ')
})
module.exports = db;