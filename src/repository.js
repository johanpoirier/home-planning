const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'db',
    user: 'planning',
    password: 'planning',
    database : 'planning'
});

const Member = require('./models/Member');
const Task = require('./models/Task');
const PlannedTask = require('./models/PlannedTask');

class Repository {
    constructor() {
        this.cnx = connection.connect();
    }

    getMembers() {
        return new Promise(resolve => {
            connection.query('SELECT * FROM member', function (err, rows) {
                if (err) throw err;
                resolve(rows.map(Member.create));
            });
        });
    }

    getMember(id) {
        return new Promise(resolve => {
            connection.query(`SELECT * FROM member WHERE id = ${parseInt(id, 10)}`, function (err, rows) {
                if (err) throw err;
                resolve(Member.create(rows.pop()));
            });
        });
    }

    getTasks() {
        return new Promise(resolve => {
            connection.query('SELECT * FROM task', function (err, rows) {
                if (err) throw err;
                resolve(rows.map(Task.create));
            });
        });
    }

    getTask(id) {
        return new Promise(resolve => {
            connection.query(`SELECT * FROM task WHERE id = ${parseInt(id, 10)}`, function (err, rows) {
                if (err) throw err;
                resolve(Task.create(rows.pop()));
            });
        });
    }

    getPlannedTasksByDate(date) {
        return new Promise(resolve => {
            connection.query(`SELECT * FROM plannedTask WHERE \`date\` like '${date}%'`, (err, rows) => {
                if (err) throw err;

                const plannedTasks = Promise.all(rows.map(async data => {
                    const plannedTask = PlannedTask.create(data);
                    plannedTask.member = await this.getMember(data['memberId']);
                    plannedTask.task = await this.getTask(data['taskId']);
                    return plannedTask;
                }));

                resolve(plannedTasks);
            });
        });
    }

    shutdown() {
        connection.end();
    }
}

module.exports = new Repository();
