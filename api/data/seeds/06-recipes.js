exports.seed = function(knex) {
      return knex('recipes').insert([
        { recipe_name: 'Blistered Green Beans with Garlic', 
          recipe_description: 'Real good beans with garlic', 
          recipe_source: 'Nana', 
          user_id: 1, 
          image_id: 1, 
          category_id: 1
        },
        { recipe_name: 'Bucatini Alla Gricia With Fava Beans', 
          recipe_description: 'Easy pasta', 
          recipe_source: 'Neighbor', 
          user_id: 2, 
          image_id: 2, 
          category_id: 2
        },
      ]);
    };
