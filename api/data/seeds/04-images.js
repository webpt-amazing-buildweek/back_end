exports.seed = function(knex) {
  return knex('images').insert([
    { image_source: 'https://assets.bonappetit.com/photos/5c38c88f3a94835decfc5934/1:1/w_1600%2Cc_limit/crispy-fried-green-beans.jpg'},
    { image_source: 'https://assets.bonappetit.com/photos/5e6bb3ba9b123d000836fd04/1:1/w_2560%2Cc_limit/0420-Pasta-Bucatini-with-Fava-Beans.jpg'},
  ]);
};