exports.up = async (knex) => {
    await knex.schema
      .createTable('users_recipes', (table) => {
          table
            .integer('user_id')
            .notNullable()
            .references('user_id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
          table
            .integer('recipe_id')
            .notNullable()
            .references('recipe_id')
            .inTable('recipes')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.primary(['user_id', 'recipe_id'])
      })
  }
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('users_recipes')
  }