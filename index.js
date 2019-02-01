const express = require('express');
const exphbs  = require('express-handlebars');

const moment = require('moment');
require('moment/locale/fr');

const hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    dateFormat: require('handlebars-dateformat')
  }
});

const app = express();
app.engine('handlebars', hbs.engine);
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
  const now = moment().format('YYYY-MM-DD');
  const formattedDate = moment().format('dddd DD MMMM YYYY');
  const plannedTasks = await repository.getPlannedTasksByDate(now);
  res.render('index', {formattedDate, plannedTasks});
});

app.listen(3003, () => {
  console.log('Express started on port 3003.');
});

