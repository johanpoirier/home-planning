const periods = {
    0: 'Matin',
    1: 'Midi',
    2: 'Soir'
};

module.exports = class Task {
    static create(data) {
        const {id, name, description, period, icon, color} = data;
        return new Task(id, name, description, period, icon, color);
    }

    static get periods() {
        return {
            MORNING: 0,
            MIDI: 1,
            EVENING: 2
        }
    }

    constructor(id, name, description, period, icon, color) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.period = period;
        this.icon = icon ? icon.toString('base64') : false;
        this.color = color;
    }

    get periodName() {
        return periods[this.period];
    }
};
