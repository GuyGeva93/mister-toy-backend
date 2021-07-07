const express = require('express')
const cors = require('cors')
const toyService = require('./services/toy-service')
const app = express()
const port = 3000

// Express App Configuration
// Ask Express.js to serve static files from the 'public' folder
app.use(express.static('public'))
app.use(express.json())
app.use(cors())


// Get Toys list
app.get('/api/toy', (req, res) => {
  const {filterBy} = req.query
  toyService.query(filterBy)
    .then(toys => res.send(toys))
})

// Get Single toy
app.get('/api/toy/:toyId', (req, res) => {
  const { toyId } = req.params
  toyService.getById(toyId)
    .then(toy => res.send(toy))
})

// Create toy
app.post('/api/toy', (req, res) => {
  const { name, price, type, createdAt, inStock } = req.body
  const toy = {
    name,
    price,
    type,
    createdAt,
    inStock
  }
  toyService.save(toy)
    .then(savedToy => {
      res.send(savedToy)
    })
})

// Edit toy 
app.put('/api/toy', (req, res) => {
  // console.log('req.body', req.body)
  const { _id, name, price, type, createdAt, inStock } = req.body
  const toy = {
    _id,
    name,
    price,
    type,
    createdAt,
    inStock
  }
  toyService.save(toy)
    .then(savedToy => {
      res.send(savedToy)
    })
})

// Remove toy 
app.delete('/api/toy/:toyId', (req, res) => {
  const { toyId } = req.params
  // console.log('toyId', toyId)
  toyService.remove(toyId)
    .then(() => {
      res.send('Deleted!')
    })
    .catch(err => {
      console.log(err);
    })
})

app.listen(port, () => {
  console.log(`My app listening at http://localhost:${port}`)
})

