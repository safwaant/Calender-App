const express = require('express')
const router = express.Router()
const client = require('../initDB')


router.get('/', (req, res) => {
    client.query(`SELECT Available_Day FROM GroupAvailableDays`, (err, result) => {
        res.json(result.rows);
    })
    client.end
})

router.route('/:id')
.get((req, res) => {
    client.query(`SELECT Available_Day FROM GroupAvailableDays WHERE Group_Code = ${req.params.id}`, (err, result) => {
        res.json(result.rows);
    })
    client.end
})

module.exports = router