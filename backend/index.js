import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import cors from 'cors'

const app = express()
const port = 8800

app.use(bodyParser.json())

app.use(cors())

app.get('/api/data', (req, res) => {
    if (fs.existsSync('data.json')) {
        const data = JSON.parse(fs.readFileSync('data.json', 'utf8'))
        res.json(data)
    } else {
        res.status(404).json({ error: 'Data not found' })
    }
})

app.get('/api/numberOfOrders', (req, res) => {
    if (fs.existsSync('data.json')) {
        const data = JSON.parse(fs.readFileSync('data.json', 'utf8'))
        res.json(Number(data[data.length - 1].id))
    } else {
        res.status(404).json({ error: 'Data not found' })
    }
})


app.post('/api/data', (req, res) => {
    const jsonData = req.body
    let existingData = []
    if (fs.existsSync('data.json')) {
        existingData = JSON.parse(fs.readFileSync('data.json', 'utf8'))
    }
    existingData.push(jsonData)
    fs.writeFileSync('data.json', JSON.stringify(existingData))
    res.send('Data added successfully')
})

app.listen(port, () => {
    console.log(`Connected to backend! Listening on port ${port}`)
})