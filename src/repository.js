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

    getTasks() {
        return new Promise(resolve => {
            connection.query('SELECT * FROM task', function (err, rows) {
                if (err) throw err;
                resolve(rows.map(Task.create));
            });
        });
    }

    getPlannedTasks() {
        return new Promise(resolve => {
            connection.query('SELECT * FROM plannedTask', function (err, rows) {
                if (err) throw err;
                resolve(rows.map(PlannedTask.create));
            });
        });
    }

    shutdown() {
        connection.end();
    }
}

module.exports = new Repository();
