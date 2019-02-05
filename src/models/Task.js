const periods = {
    0: 'Matin',
    1: 'Midi',
    2: 'Soir'
}

module.exports = class Task {
    static create(data) {
        const {id, name, description, period} = data;
        return new Task(id, name, description, period);
    }

    constructor(id, name, description, period) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.period = period;
    }

    get periodName() {
        return periods[this.period];
    }
};
