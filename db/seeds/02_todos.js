
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        { title: 'eat breakfast', user_id: 1 },
        { title: 'go to work', user_id: 2 },
        { title: 'go to gym', user_id: 3 },
        { title: 'run 2 miles', user_id: 1 },
        { title: 'eat dinner', user_id: 2 },
        { title: 'sleep at 11', user_id: 3 }
      ]);
    });
};
