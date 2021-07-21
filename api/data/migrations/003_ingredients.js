exports.up = async (knex) => {
    await knex.schema
      .createTable('ingredients', (table) => {
          table.increments('ingredient_id')
          table.string('ingredient_name').notNullable()
      })
  }
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('ingredients')
  }