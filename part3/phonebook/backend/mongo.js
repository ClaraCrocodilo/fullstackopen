const mongoose = require("mongoose");

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.1k52e.mongodb.net/` +
    "phonebook?retryWrites=true&w=majority"

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log("phonebook:");
        result.forEach(person => {
            console.log(person.name, person.number)
        });
        mongoose.connection.close();
    });
} else if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    });

    person.save().then(result => {
        console.log("added", process.argv[3], "number", process.argv[4],
            "to phonebook");
        mongoose.connection.close();
    });
};