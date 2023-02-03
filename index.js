const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then((result) => {
    return Recipe.create({
      "title": "Asian Glazed Chicken Thighs 1",
      "level": "Amateur Chef",
      "ingredients": [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs"
      ],
      "cuisine": "Asian",
      "dishType": "main_course",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      "duration": 40,
      "creator": "Chef LePapu"
    })
  })
  .then((createdRecipe) => {
    console.log(createdRecipe.title)
    return Recipe.insertMany(data)
  })
  .then((recipeMany) => {
    const titles = recipeMany.map(recipe => recipe.title);
    console.log(titles);
  })
  .then((recipeMany) => {
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100});
  })
  .then((updatedRecipe) => {
    if(updatedRecipe){
      console.log('Success!')
    }
  })
  .then((deleteOne) => {
    return Recipe.deleteOne({
      "title": "Carrot Cake",
      "level": "Amateur Chef",
      "ingredients": [
        "6 cups grated carrots",
        "1 cup brown sugar",
        "1 cup raisins",
        "4 eggs",
        "1 1/2 cups white sugar",
        "1 cup vegetable oil",
        "2 teaspoons vanilla extract",
        "1 cup crushed pineapple, drained",
        "3 cups all-purpose flour",
        "1 1/2 teaspoons baking soda",
        "1 teaspoon salt",
        "4 teaspoons ground cinnamon"
      ],
      "cuisine": "International",
      "dishType": "dessert",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
      "duration": 130,
      "creator": "Chef Nadia"
    })
  })
  .then(() => {
    console.log('Recipe Deleted!')
  })
  .then(() => {
    mongoose.connection.close()
    console.log('Connection is closed!')
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  