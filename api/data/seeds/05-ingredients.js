exports.seed = function(knex) {
    return knex('ingredients').insert([
      { ingredient_name: 'green beans'},
      { ingredient_name: 'olive oil'},
      { ingredient_name: 'kosher salt'},
      { ingredient_name: 'garlic'},
      { ingredient_name: 'red pepper flakes'},
      { ingredient_name: 'capers'},
      { ingredient_name: 'black peppercorns'},
      { ingredient_name: 'guanciale'},
      { ingredient_name: 'fresh or frozen fava beans'},
      { ingredient_name: 'bucatini'},
      { ingredient_name: 'pecorino romano'},
    ]);
  };