const db = require('../../data/db-config')


const getRecipeById = async id => {
  return rows = await db('recipes')
    .where('recipes.id', id)
    .leftJoin('steps', 'recipes.id', 'steps.recipe_id')
    .leftJoin('ingredients_steps', 'steps.id', 'ingredients_steps.step_id')
    .leftJoin('ingredients', 'ingredients_steps.ingredients_id', 'ingredients.id')
    .select('recipes.id as recipe_id', 'recipes.name as recipe_name', 'steps.id as steps_id', 'steps.step_number', 'steps.instructions', 'ingredients_steps.quantity', 'ingredients_steps.ingredients_id as ingredient_id', 'ingredients.name as ingredient_name')

  const recipe_with_steps = {
    recipe_id: rows[0].recipe_id,
    recipe_name: rows[0].recipe_name,
    steps: []
  }

  rows.forEach((row, i) => {
    if (row.steps_id) {
      recipe_with_steps.steps.push({
        step_id: row.step_id,
        step_number: row.step_number,
        step_instructions: row.step_instructions,
        ingredients: rows.filter(ingredient => ingredient.ingredient_id !==null && ingredient.steps_id === row.steps_id)
          .map(obj => {
            return {ingredient_id: obj.ingredient_id, ingredient_name: obj.ingredient_name, quantity: obj.quantity}
          })
        
      })
      //need to figure out how to not repeat steps... there is a row for each ingredient so that might be best place to start rather than with steps
      // if (row.ingredient_id) {
      //   recipe_with_steps.steps[i].ingredients.push({

      //   })
      // }

    }
  })


  return recipe_with_steps
    //   SELECT recipes.id, recipes.name, steps.id, steps.step_number, steps.instructions, ingredients_steps.quantity, ingredients_steps.ingredients_id as ingredient_id, ingredients.name as ingredient_name
    // FROM recipes 
    // LEFT JOIN steps on recipes.id=steps.recipe_id
    // LEFT JOIN ingredients_steps ON steps.id=ingredients_steps.step_id
    // LEFT JOIN ingredients ON ingredients_steps.ingredients_id=ingredients.id
    // WHERE recipes.id=1
    
}

module.exports = {
  getRecipeById
}