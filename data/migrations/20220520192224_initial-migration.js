/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema
    .createTable('recipes', tbl => {
      tbl.increments() //primary key
      tbl.string('name') // Recipes have a name that must be unique (e.g. "Spaghetti Bolognese")
        .unique()
        .notNullable()
    })
    .createTable('ingredients', tbl => { // Ingredients can be used in different recipes, in different quantities.
      tbl.increments()
      tbl.string('name')
      tbl.string('unit') 
    })
    .createTable('steps', tbl => { // Recipes contain an ordered list of steps (e.g. "Preheat the oven", "Roast the squash").
      tbl.increments() //primary key
      tbl.string('instructions')
      tbl.integer('step_number')
      tbl.integer('recipe_id')   // Each step contains some instructions (e.g. "Preheat the oven") and belongs to a single recipe.
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('recipes')
    })
  
    .createTable('ingredients_steps', tbl => { // Steps might involve any number of ingredients (zero, one or more).
      tbl.float('quantity') // If a step involves one or more ingredients, each ingredient is used in a certain quantity.
      tbl.integer('step_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('steps')
      tbl.integer('ingredients_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('ingredients')
      tbl.primary(['step_id', 'ingredients_id'])
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('ingredients_steps')
      .dropTableIfExists('steps')
      .dropTableIfExists('ingredients')
      .dropTableIfExists('recipes')
  };
  