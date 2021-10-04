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

let arrayOfPeople = [{
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

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => (err ? done(err) : done(null, data)));
  //or insertMany for large batches of documents
  // done(null /*, data*/);
};

//5 https://mongoosejs.com/docs/api.html#model_Model.find
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => (err ? done(err) : done(null, data)));
  // Person.find({name: personName}).exec();
  //done(null /*, data*/);
};

//6 https://mongoosejs.com/docs/api.html#model_Model.findOne
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => (err ? done(err) : done(null, data)));
  // Person.findOne({favoriteFoods: food}).exec();
  //done(null /*, data*/);
};

//7 https://mongoosejs.com/docs/api.html#model_Model.findById
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => (err ? done(err) : done(null, data)));
  // Person.findOne(personId).exec();
  //done(null /*, data*/);
};

//8 https://www.freecodecamp.org/learn/back-end-development-and-apis/mongodb-and-mongoose/perform-classic-updates-by-running-find-edit-then-save
//8 https://mongoosejs.com/docs/api.html#document_Document-markModified
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, data) => {
    if (err) {
      done(err);
    }
    data.favoriteFoods.push(foodToAdd);
    data.markModified('edited-field');

    data.save((err, updatedPerson) => (err ? done(err) : done(null, updatedPerson)));

    //done(null /*, data*/);
  })
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
