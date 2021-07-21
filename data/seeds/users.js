
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'loki', password: 'password', email: 'loki@marvel.com'},
        {id: 2, username: 'cyclops', password: 'password', email: 'cyclops@marvel.com'},
        {id: 3, username: 'sylvie', password: 'password', email: 'sylvie@marvel.com'},
        {id: 4, username: 'jeangray', password: 'password', email: 'jeangray@marvel.com'},
      ]);
    });
};
