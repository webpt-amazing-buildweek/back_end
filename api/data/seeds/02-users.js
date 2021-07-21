
exports.seed = function(knex) {
      return knex('users').insert([
        {
          user_username: 'storm', 
          user_email: 'storm@marvel.com', 
          user_password: '$2y$10$aQS3vb7l84Aof3MVKxznM.LaQIiauBvmvjsVr.dXRWs/pbj9I2zo6' /*abc1234*/},
        {
          user_username: 'scott', 
          user_email: 'cyclops@marvel.com', 
          user_password: '$2y$10$bsqvOIcgOJ/SQMIw/5U7tu1KsRwd2aFRD/NsRa524HtXeUAsMJK/q' /*1234abc*/},
      ]);
    }
