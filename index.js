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

  const periods = [
    {
      title: 'Matin',
      tasks: todayTasks.filter(t => t.task.period === Task.periods.MORNING)
    },
    {
      title: 'Midi',
      tasks: todayTasks.filter(t => t.task.period === Task.periods.MIDI)
    },
    {
      title: 'Soir',
      tasks: todayTasks.filter(t => t.task.period === Task.periods.EVENING)
    }];

  res.render('index', {formattedDate, periods: periods.filter(p => p.tasks.length > 0)});
});

app.listen(3003, () => {
  console.log('Express started on port 3003.');
});

