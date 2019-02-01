module.exports = class Task {
    static create(data) {
        const {id, name, description, duration} = data;
        return new Task(id, name, description, duration);
    }

    constructor(id, name, description, duration) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.duration = duration;
    }
};
