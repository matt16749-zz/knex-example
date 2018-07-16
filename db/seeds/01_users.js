
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { name: 'Some guy', email: 'test@test.com' },
        { name: 'Some girl', email: 'test2@test.com' },
        { name: 'Someone else', email: 'test3@test.com' },
      ]);
    });
};
