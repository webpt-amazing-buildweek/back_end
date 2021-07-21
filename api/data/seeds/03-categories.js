exports.seed = function(knex) {
    return knex('categories').insert([
      { category_name: 'Breakfast'},
      { category_name: 'Lunch'},
      { category_name: 'Beverages'},
      { category_name: 'Appetizers'},
      { category_name: 'Soups'},
      { category_name: 'Salads'},
      { category_name: 'Main dishes: Beef'},
      { category_name: 'Main dishes: Poultry'},
      { category_name: 'Main dishes: Pork'},
      { category_name: 'Main dishes: Seafood'},
      { category_name: 'Main dishes: Vegetarian'},
      { category_name: 'Side dishes: Vegetables'},
      { category_name: 'Side dishes: Other'},
      { category_name: 'Desserts'},
      { category_name: 'Canning / Freezing'},
      { category_name: 'Breads'},
      { category_name: 'Holidays'},
      { category_name: 'Entertaining'},
    ]);
  };
  