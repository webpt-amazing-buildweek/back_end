exports.up = function (knex) {
  return knex.schema.createTable('users', users => {
    users.increments("id");
    users.string('username', 255).notNullable().unique();
    users.string('password', 255).notNullable();
    users.string('email', 255).notNullable().unique()
    users.boolean('isOwner').notNullable();
  })

  .createTable('items', items => {
    items.increments('id');
    items.string('item_name', 255).notNullable();
    items.string('location', 255).notNullable();
    items.integer('quantity').unsigned().notNullable();
    items.float('price').notNullable();
    items.text("description").notNullable();
    items.integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('items')
  .dropTableIfExists('users');
};
