/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

 const recipes = [
  { name: 'Broccoli Pesto Pasta' },
  { name: 'Lemon Chicken' },
  { name: 'Salmon en Papillote' }
]

const ingredients = [
  { name: 'Broccoli', unit: 'lbs' },
  { name: 'Pesto', unit: 'lbs' },
  { name: 'Pasta', unit: 'lbs' },
  { name: 'Lemon', unit: 'slices' },
  { name: 'Chicken', unit: 'kilos' },
  { name: 'Salmon', unit: 'grams' }
]

const steps = [
  //Broccoli Pesto Pasta
  { instructions: "Heat pan", step_number: 1, recipe_id: 1 },
  { instructions: "Add broccoli", step_number: 2, recipe_id: 1 },
  { instructions: "Add pesto mixed with pasta", step_number: 3, recipe_id: 1 },
  //Lemon Chicken
  { instructions: "Heat oven really hot", step_number: 1, recipe_id: 2 },
  { instructions: "Put chicken and lemon in oven", step_number: 2, recipe_id: 2 },
  { instructions: "Put in oven at 500 degrees", step_number: 3, recipe_id: 2 },
  //Salmon en Papillote
  { instructions: "Catch a fish", step_number: 1, recipe_id: 3 },
  { instructions: "Cook it", step_number: 2, recipe_id: 3 }
]

const ingredients_steps = [
  //Broccoli Pesto Pasta
  { quantity: 3.2, step_id: 2, ingredients_id: 1 },
  { quantity: 1.5, step_id: 3, ingredients_id: 2 },
  { quantity: 3.3, step_id: 3, ingredients_id: 3 },
  //Lemon Chicken
  { quantity: 1, step_id: 5, ingredients_id: 4 },
  { quantity: .4, step_id: 5, ingredients_id: 5 },
  //Salmon en Papillote
  { quantity: 7, step_id: 7, ingredients_id: 6 }
]

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('ingredients_steps').truncate()
  await knex('steps').truncate()
  await knex('ingredients').truncate()
  await knex('recipes').truncate()


  await knex('recipes').insert(recipes)
  await knex('ingredients').insert(ingredients)
  await knex('steps').insert(steps)
  await knex('ingredients_steps').insert(ingredients_steps)
};