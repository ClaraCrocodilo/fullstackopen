const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const Person = require("./models/person");

const app = express();

app.use(express.json());
app.use(express.static("build"));
app.use(morgan(function (tokens, req, res) {
    let response = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"), "-",
        tokens["response-time"](req, res), "ms"
    ];
    if (tokens.method(req, res) === "POST") {
        response = response.concat(JSON.stringify(req.body))
    };
    return response.join(" ");

}));

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

app.get("/api/persons", (request, response, next) => {
    Person.find({}).then(people => {
        response.json(people);
    }).catch(error => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id).then(people => {
        response.json(people);
    }).catch(error => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end();
        }).catch(error => next(error));
});

app.post("/api/persons", (request, response, next) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: "name missing"
        });
    } else if (!body.number) {
        return response.status(400).json({
            error: "number missing"
        });
    } else if (persons.map(p => p.name).includes(body.name)) {
        return response.status(400).json({
            error: "name must be unique"
        });
    };

    const person = new Person ({
        name: body.name,
        number: body.number
    });

    person.save().then(savedPerson => {
        response.json(savedPerson).catch(error => next(error));
    });
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    } else {
        next(error);
    };
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
