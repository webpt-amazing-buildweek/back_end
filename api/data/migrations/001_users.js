exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (user) => {
      user.increments('user_id')
      user.string('user_username', 200).notNullable().unique()
      user.string('user_password', 200).notNullable().unique()
      user.string('user_email', 320).notNullable()
      user.timestamps(false, true)
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
}
