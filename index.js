const { response } = require('express');
const express = require('express')
const app = express()

var morgan = require('morgan')
app.use(morgan('tiny'))
app.use(express.json());

const cors = require('cors')

app.use(cors())

let persons =  [
      {
        "name": "Arto Hellas",
        "phone": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "phone": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "phone": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "phone": "39-23-6423122",
        "id": 4
      },
      {
        "name": "asdd",
        "phone": "12123",
        "id": 5
      },
      {
        "name": "sid1",
        "phone": "9999",
        "id": 6
      },
      {
        "name": "asd",
        "phone": "4",
        "id": 7
      },
      {
        "name": "asdfg",
        "phone": "324",
        "id": 8
      },
      {
        "name": "sfgfg",
        "phone": "2314",
        "id": 9
      }
    ]

// app.get('/api/persons/',(request, response) => {
//         response.send(persons)
//     })

app.get('/api/persons', function (req, res) {
    console.log(res)
    res.send(persons)
})

app.get('/api/info',(request, response)=> {
    let total = 0
    persons.forEach(element => {
        total += 1
    })
    var today = new Date();

    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var dateTime = date+' '+time;
    response.send(`<p>There are ${total} entries</p></br><p>${dateTime}</p>`)

})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => person.id === id)
    console.log(person)
    if (person) {
    response.json(person)
    }
    else {
        response.status(404).end() 
    }
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    let present = 0
    if ((!body.name) || (!body.phone)) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    persons.forEach(entry => {
        
        if (entry === body.name) {
            return response.status(400).json({ 
                error: 'content missing' 
              })
            present = 1
        }
    })
    if (present === 0) {
    const person = {
      name: body.name,
      phone: body.phone,
      id: Math.random() < 1000000,
    }
  
    persons = persons.concat(person)
  
    response.json(person)
        }
    
  })

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
