module.exports = class PlannedTask {
    static create(data) {
        const {id, date, done} = data;
        return new PlannedTask(id, date, done);
    }

    constructor(id, date, done) {
        this.id = id;
        this.date = date;
        this.done = done;
    }
};
