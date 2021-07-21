exports.seed = function(knex) {
    return knex('users_recipes').insert([
      { user_id: 1, 
        recipe_id: 1, 
      },
      { user_id: 2, 
        recipe_id: 2, 
      },
    ]);
  };
