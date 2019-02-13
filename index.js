const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const moment = require('moment');
require('moment/locale/fr');

const hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    dateFormat: require('handlebars-dateformat')
  }
});


const jsonParser = bodyParser.json();

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
  const formattedDate = moment().format('dddd DD MMMM YYYY');

  const members = await repository.getMembers();

  const today = moment().format('YYYY-MM-DD');
  const todayTasks = await repository.getPlannedTasksByDate(today);

  members.forEach(member => {
    const memberTasks = todayTasks.filter(t => t.member.id === member.id);
    member.morningTasks = memberTasks.filter(mt => mt.task.period === Task.periods.MORNING);
    member.noonTasks = memberTasks.filter(mt => mt.task.period === Task.periods.NOON);
    member.eveningTasks = memberTasks.filter(mt => mt.task.period === Task.periods.EVENING);
  });

  res.render('index', {
    formattedDate,
    members
  });
});

app.get('/admin', async (req, res) => {
  const formattedDate = moment().format('dddd DD MMMM YYYY');

  const tasks = await repository.getTasks();
  const members = await repository.getMembers();

  const today = moment().format('YYYY-MM-DD');
  const todayTasks = await repository.getPlannedTasksByDate(today);

  members.forEach(member => {
    const memberTaskIds = todayTasks.filter(t => t.member.id === member.id).map(t => t.task.id);
    const memberTasks = tasks.map(task => ({...task, active: memberTaskIds.includes(task.id)}));
    member.morningTasks = memberTasks.filter(t => t.period === Task.periods.MORNING);
    member.noonTasks = memberTasks.filter(t => t.period === Task.periods.NOON);
    member.eveningTasks = memberTasks.filter(t => t.period === Task.periods.EVENING);
  });

  res.render('admin', {
    formattedDate,
    members
  });
});

app.post('/admin/plannedTask', jsonParser, async (req, res) => {
  const {taskId, memberId} = req.body;
  const today = moment().format('YYYY-MM-DD');
  await repository.addPlannedTask(taskId, memberId, today);
  res.sendStatus(204);
});

app.delete('/admin/plannedTask', jsonParser, async (req, res) => {
  const {taskId, memberId} = req.body;
  const today = moment().format('YYYY-MM-DD');
  await repository.removePlannedTask(taskId, memberId, today);
  res.sendStatus(204);
});

app.listen(3003, () => {
  console.log('Hme planning server started on port 3003.');
});
