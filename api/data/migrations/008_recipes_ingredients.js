exports.up = async (knex) => {
    await knex.schema
      .createTable('recipes_ingredients', (table) => {
          table
            .integer('recipe_id')
            .notNullable()
            .references('recipe_id')
            .inTable('recipes')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
          table
            .integer('ingredient_id')
            .notNullable()
            .references('ingredient_id')
            .inTable('ingredients')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.string('quantity').notNullable()
        table.primary(['recipe_id', 'ingredient_id'])
      })
  }
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('recipes_ingredients')
  }