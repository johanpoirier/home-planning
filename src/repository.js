const mysql = require('mysql');
const dbParams = {
    host: 'db',
    user: 'planning',
    password: 'planning',
    database : 'planning'
};

const Member = require('./models/Member');
const Task = require('./models/Task');
const PlannedTask = require('./models/PlannedTask');

class Repository {

    constructor() {
        this.cnx = mysql.createConnection(dbParams);
        this.cnx.connect();
    }

    getMembers() {
        return new Promise(resolve => {
            this.cnx.query('SELECT * FROM member', function (err, rows) {
                if (err) throw err;
                resolve(rows.map(Member.create));
            });
        });
    }

    getMember(id) {
        return new Promise(resolve => {
            this.cnx.query(`SELECT * FROM member WHERE id = ${parseInt(id, 10)}`, function (err, rows) {
                if (err) throw err;
                resolve(Member.create(rows.pop()));
            });
        });
    }

    getTasks() {
        return new Promise(resolve => {
            this.cnx.query('SELECT * FROM task', function (err, rows) {
                if (err) throw err;
                resolve(rows.map(Task.create));
            });
        });
    }

    getTask(id) {
        return new Promise(resolve => {
            this.cnx.query(`SELECT * FROM task WHERE id = ${parseInt(id, 10)}`, function (err, rows) {
                if (err) throw err;
                resolve(Task.create(rows.pop()));
            });
        });
    }

    getPlannedTasksByDate(date) {
        return new Promise(resolve => {
            this.cnx.query(`SELECT * FROM plannedTask WHERE \`date\` like '${date}%' ORDER BY taskId`, (err, results) => {
                if (err) throw err;

                const plannedTasks = Promise.all(results.map(async data => {
                    const plannedTask = PlannedTask.create(data);
                    plannedTask.member = await this.getMember(data['memberId']);
                    plannedTask.task = await this.getTask(data['taskId']);
                    return plannedTask;
                }));

                resolve(plannedTasks);
            });
        });
    }

    addPlannedTask(taskId, memberId, date) {
        return new Promise(resolve => {
            this.cnx.query('INSERT INTO plannedTask SET ?', {taskId, memberId, date}, err => {
                if (err) throw err;
                resolve();
            });
        });
    }

    removePlannedTask(taskId, memberId, date) {
        return new Promise(resolve => {
            this.cnx.query('DELETE FROM plannedTask WHERE taskId = ? AND memberId = ? AND date = ?', [taskId, memberId, date], err => {
                if (err) throw err;
                resolve();
            });
        });
    }

    shutdown() {
        this.cnx.end();
    }
}

module.exports = new Repository();
