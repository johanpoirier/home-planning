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
const Task = require('./src/models/Task');

app.get('/', async (req, res) => {
  const today = moment().format('YYYY-MM-DD');
  const formattedDate = moment().format('dddd DD MMMM YYYY');

  const todayTasks = await repository.getPlannedTasksByDate(today);

  const morningTasks = todayTasks.filter(t => t.task.period === Task.periods.MORNING);
  const midiTasks = todayTasks.filter(t => t.task.period === Task.periods.MIDI);
  const eveningTasks = todayTasks.filter(t => t.task.period === Task.periods.EVENING);

  res.render('index', {formattedDate, morningTasks, midiTasks, eveningTasks});
});

app.listen(3003, () => {
  console.log('Express started on port 3003.');
});

