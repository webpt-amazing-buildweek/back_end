exports.up = async (knex) => {
    await knex.schema
      .createTable('images', (table) => {
          table.increments('image_id')
          table.string('image_source').notNullable()
      })
  }
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('images')
  }