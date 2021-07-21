exports.up = async (knex) => {
    await knex.schema
      .createTable('instructions', (table) => {
          table.increments('instruction_id')
          table.string('instruction', 1000).notNullable()
          table.integer('step_number').notNullable()
          table
            .integer('recipe_id')
            .notNullable()
            .references('recipe_id')
            .inTable('recipes')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
      })
  }
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('instructions')
  }