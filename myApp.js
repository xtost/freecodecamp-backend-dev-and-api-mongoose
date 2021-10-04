require('dotenv').config();
//1
const mongoose = require('mongoose');

//2
const { Schema } = mongoose;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

//const Person = mongoose.model('Person',personSchema);



mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//2
let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  //3
  let personDoc = new Person({
    name: 'Xavi',
    age: 20,
    favoriteFoods: ['pizza', 'hotdog']
  });

  personDoc.save((err, data) => (err ? done(err) : done(null, data)));

};

//4
/*
let myArrayOfPeople = [{
  name: 'XaviMany1',
  age: 21,
  favoriteFoods: ['pizza1', 'hotdog1']
},
  {
    name: 'XaviMany2',
    age: 22,
    favoriteFoods: ['pizza2', 'hotdog2']
  },
  {
    name: 'XaviMany3',
    age: 23,
    favoriteFoods: ['pizza3', 'hotdog3']
  }];

*/
const createManyPeople = (arrayOfPeople, done) => {
  Person.create((err, data) => (err ? done(err) : done(null, data)));
  // done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */



//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
