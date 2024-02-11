require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

const errorHandler = (error, request, response, next) => {
  console.dir('errorhandler')
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(errorHandler)

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  }).catch(err => next(err))
})

app.post('/api/persons', (req, res) => {
  const person = new Person(req.body)
  person.save().then(result => {
    res.send(person)
  }).catch(err => next(err))
})
app.put('/api/persons/:id', (req, res) => {
  const person = new Person(req.body)
  Person.updateOne({ _id : req.params.id }, req.body).then(result => {
    res.send(person)
  }).catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res) => {
  Person.deleteOne({ _id: req.params.id }).then(result => {
    res.send({id: req.params.id})
  }).catch(err => next(err))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
