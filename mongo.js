

const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://Suarsan:${password}@cluster0.xy1i3ld.mongodb.net/phoneBook?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
const Person = mongoose.model('Person', personSchema)

if (!(name && number)) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(r => console.log(`${r.name} ${r.number}`))
        mongoose.connection.close()
    })
}

if (name && number) {
    const person = new Person({ name, number })
    person.save().then(result => {
      console.log(`added ${name} number ${number} to phonebook`)
      mongoose.connection.close()
    })
}
