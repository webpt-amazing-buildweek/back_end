exports.seed = function(knex) {
    return knex('recipes_ingredients').insert([
      {
        recipe_id: 1,
        ingredient_id: 1,
        quantity: '1lb',
    },
      {
        recipe_id: 1,
        ingredient_id: 2,
        quantity: '1/3 cup',
    },
      {
        recipe_id: 1,
        ingredient_id: 3,
        quantity: 'pinch',
    },
      {
        recipe_id: 1,
        ingredient_id: 4,
        quantity: '6 cloves',
    },
      {
        recipe_id: 1,
        ingredient_id: 5,
        quantity: '1 tsp',
    },
      {
        recipe_id: 1,
        ingredient_id: 6,
        quantity: '1 tbsp',
    },
      {
        recipe_id: 2,
        ingredient_id: 7,
        quantity: '1 tbsp',
    },
      {
        recipe_id: 2,
        ingredient_id: 8,
        quantity: '8 oz',
    },
      {
        recipe_id: 2,
        ingredient_id: 9,
        quantity: '1 3/4 cups',
    },
      {
        recipe_id: 2,
        ingredient_id: 10,
        quantity: '1 lb',
    },
      {
        recipe_id: 2,
        ingredient_id: 11,
        quantity: '2 oz (about 1 cup)',
    },

    ]);
  }

