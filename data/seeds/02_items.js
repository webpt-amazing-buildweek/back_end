

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex("items").insert([
        {id: 1, item_name: "Hand-woven Baskets",location: "Village of ABC",quantity: 12,price: 10.50, text:  "These baskets are hand-woven with care by the local village of ABC.  Each one is crafted carefully with unique designs and colors.",user_id: 1},
        {id: 2, item_name: "Dyed Textiles",location: "Village of X",quantity: 6,price: 20.75, text:  "These fantistically dyed textiles are made from organic cotton.",user_id: 2},
      ])
    });
};