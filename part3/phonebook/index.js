const express = require("express");
const app = express();

app.use(express.json());

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
];

const generateId = () => {
    const existingIds = persons.map(person => person.id);
    const maxId = 1e6;
    let newId = ~~(Math.random() * maxId) + 1;
    while (existingIds.includes(newId)) {
        newId = ~~(Math.random() * maxId) + 1;
        console.log(newId);
    };
    return newId;
};
generateId()

app.get("/info", (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>`
    + `<p> ${new Date()} </p>`
    );
});

app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    };
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);
    console.log("persons", persons)
    response.status(204).end()
});

app.post("/api/persons", (request, response) => {
    const body = request.body;
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    };
    persons = persons.concat(person);
    response.json(person);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
