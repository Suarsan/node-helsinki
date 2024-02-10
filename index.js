const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

app.post('/api/persons', (req, res) => {
  const person = { id: Math.floor(Math.random() * 1000), ...req.body }
  if (!person.name) {
    res.status(401).json({ error: 'Name is required' })
  }
  if (persons.find(p => p.name === person.name)) {
    res.status(401).json({ error: 'Person already exists' })
  }
  persons = [...persons, person]
  res.send(person)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === parseInt(req.params.id))
  if (!person) {
    res.status(404).json({ error: 'Person not found' })
  }
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(p => p.id !== parseInt(req.params.id))
  res.send({id: parseInt(req.params.id)}).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
