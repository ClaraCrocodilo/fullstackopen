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
        response = response.concat(JSON.stringify(req.body));
    }
    return response.join(" ");

}));

app.get("/info", (request, response, next) => {
    Person.countDocuments().then(count => {
        response.send(`<p>Phonebook has info for ${count} people</p>`
            + `<p> ${new Date()} </p>`);
    }).catch(error => next(error));
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
        .then(() => {
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
    }

    const person = new Person ({
        name: body.name,
        number: body.number
    });

    person.save().then(savedPerson => {
        response.json(savedPerson);
    }).catch(error => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: "name missing"
        });
    } else if (!body.number) {
        return response.status(400).json({
            error: "number missing"
        });
    }
    
    const person = {
        name: body.name,
        number: body.number
    };

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => response.json(updatedPerson))
        .catch(error => next(error));

});

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    } else {
        next(error);
    }
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
