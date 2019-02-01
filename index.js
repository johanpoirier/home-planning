const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['png'],
  index: false,
  maxAge: '10s',
  redirect: false
};

app.use(express.static('public', options));


const repository = require('./src/repository');

app.get('/', async (req, res) => {
  const members = await repository.getMembers();
  const tasks = await repository.getTasks();
  res.render('index', {members, tasks});
});

app.listen(3003, () => {
  console.log('Express started on port 3003.');
});

