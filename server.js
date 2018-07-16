var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;

var knex = require('./db/knex');

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

// SELECT ROWS
app.get('/todos', function(req, res) {
  // knex.raw('SELECT * FROM todos').then(function(todos) {
  //   res.send(todos.rows)
  // });
  knex.
    select().
    from('todos').
    then(
      function(todos) {
        res.send(todos)
      });
})

app.get('/todos/:id', function(req, res) {
  knex.
    select().
    from('todos').
    where('id', req.params.id).
    then(function(todos) {
      res.send(todos)
    })
})

app.post('/todos', function(req, res) {
  // knex.raw('INSERT INTO todos(title, user_id) values(?, ?)', ['go play some sports', '1']).
  // then(function(todos) {
    // knex.
      // select().
      // from('todos').
      // then(
      //   function(todos) {
      //     res.send(todos)
      //   });
  // })
  knex('todos').
    insert({
      title: req.body.title,
      user_id: req.body.user_id
    }).
    then(function() {
      knex.
      select().
      from('todos').
      then(
        function(todos) {
          res.send(todos)
        });
    })
})

app.put('/todos/:id', function(req, res) {
  // knex.
  //   raw(
  //     'UPDATE todos SET ' + req.body.field + ' = ? WHERE id = ?',
  //     [ req.body.value, req.params.id ]
  //   )
  knex('todos').
  where('id', req.params.id).
  update({
    title: req.body.title,
    completed: req.body.completed
  }).then(function() {
    knex.select()
      .from('todos')
      .then(function(todos) {
        res.send(todos);
      })
  })
})

app.delete('/todos/:id', function(req, res) {
  // knex.raw('DELETE FROM todos WHERE id = ?', [req.params.id])
  knex('todos').where('id', req.params.id).del().then(function() {
    knex.
    select().
    from('todos').
    then(function(todos) {
      res.send(todos)
    })
  })
})

app.get('/todos-of-user/:id', function(req, res) {
  // knex.raw('SELECT * FROM todos INNER JOIN users ON todos.user_id = users.id WHERE todos.user_id = ?', [req.params.id]).then(function(data) {
  //   res.send(data)
  // })
  knex.
  from('todos').
  innerJoin('users', 'todos.user_id', 'users.id').
  where('todos.user_id', req.params.id).
  then(function(data) {
    res.send(data)
  })
})

app.listen(port, function() {
  console.log('listening on port: ' + port);
});
