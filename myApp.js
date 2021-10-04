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
    data.markModified('edited-field'); //for "mixed arrays"

    //done in here, at the very end, when we have finished
    data.save((err, updatedPerson) => (err ? done(err) : done(null, updatedPerson)));

    //done(null /*, data*/);
  })
};


//9 https://www.freecodecamp.org/learn/back-end-development-and-apis/mongodb-and-mongoose/perform-new-updates-on-a-document-using-model-findoneandupdate
//9 https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
//9 https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  /*
  Note: You should return the updated document. To do that, you need to pass the options document { new: true } as the 3rd argument to findOneAndUpdate(). By default, these methods return the unmodified object.
  */
  Person.findOneAndUpdate({ name: personName },
    { age: ageToSet },
    { new: true },
    (err, data) => (err ? done(err) : done(null, data)));

  //done(null /*, data*/);
};

//10 https://www.freecodecamp.org/learn/back-end-development-and-apis/mongodb-and-mongoose/delete-one-document-using-model-findbyidandremove
//10 https://mongoosejs.com/docs/api.html#model_Model.findOneAndRemove
//10 https://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => (err ? done(err) : done(null, data)));
  // done(null /*, data*/);
};

//11 https://www.freecodecamp.org/learn/back-end-development-and-apis/mongodb-and-mongoose/delete-many-documents-with-model-remove
//11 https://mongoosejs.com/docs/api.html#model_Model.remove
/* 11
    Note: The Model.remove() doesn’t return the deleted document, but a JSON object containing the outcome 
    of the operation, and the number of items affected. Don’t forget to pass it to the done() callback, 
    since we use it in tests.
*/
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, data) => (err ? done(err) : done(null, data)));

  //done(null /*, data*/);
};

//12 https://www.freecodecamp.org/learn/back-end-development-and-apis/mongodb-and-mongoose/chain-search-query-helpers-to-narrow-search-results
/* 12 Chain Search Query Helpers to Narrow Search Results
If you don’t pass the callback as the last argument to Model.find() (or to the other search methods), the query is not executed. You can store the query in a variable for later use. This kind of object enables you to build up a query using chaining syntax. The actual db search is executed when you finally chain the method .exec(). You always need to pass your callback to this last method. There are many query helpers, here we'll use the most commonly used.

Modify the queryChain function to find people who like the food specified by the variable named foodToSearch. Sort them by name, limit the results to two documents, and hide their age. Chain .find(), .sort(), .limit(), .select(), and then .exec(). Pass the done(err, data) callback to exec().
*/
//12 https://mongoosejs.com/docs/api.html#aggregate_Aggregate-sort
//12 https://mongoosejs.com/docs/api.html#query_Query-limit
//12 https://mongoosejs.com/docs/api.html#query_Query-select
//12 https://mongoosejs.com/docs/api.html#query_Query-exec
const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 'asc'})
  .limit(2)
  .select('-age')
  .exec((err, data) => (err ? done(err) : done(null, data)));

  //done(null /*, data*/);
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
