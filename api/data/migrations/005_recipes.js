exports.up = async (knex) => {
    await knex.schema
      .createTable('recipes', (recipe) => {
        recipe.increments('recipe_id')
        recipe.string('recipe_name', 200).notNullable()
        recipe.string('recipe_description').notNullable()
        recipe.string('recipe_source', 320).notNullable()
        recipe
            .integer('user_id')
            .notNullable()
            .references('user_id')
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        recipe
            .integer('image_id')
            .references('image_id')
            .inTable('images')
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        recipe
            .integer('category_id')
            .notNullable()
            .references('category_id')
            .inTable('categories')
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        recipe.timestamps(false, true)

      })
  }
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('recipes')
  }
  