module.exports = class PlannedTask {
    static create(data) {
        const {id, date, done, memberId, taskId} = data;
        return new PlannedTask(id, date, done);
    }

    constructor(id, date, done) {
        this.id = id;
        this.date = date;
        this.done = done;
    }
};
