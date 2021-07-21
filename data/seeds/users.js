
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'loki', password: 'password', email: 'loki@marvel.com', isUser: true},
        {id: 2, username: 'cyclops', password: 'password', email: 'cyclops@marvel.com', isUser: true},
        {id: 3, username: 'sylvie', password: 'password', email: 'sylvie@marvel.com', isUser: false},
        {id: 4, username: 'jeangray', password: 'password', email: 'jeangray@marvel.com', isUser: false},
        {id: 5, username: 'user', password: 'password', email: 'user@lambda.com', isUser: false},
        {id: 6, username: 'admin', password: 'password', email: 'admin@lambda.com', isUser: true}
      ]);
    });
};
