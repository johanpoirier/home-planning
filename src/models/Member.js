module.exports = class Member {
    static create(data) {
        const {id, name, email} = data;
        return new Member(id, name, email);
    }

    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
};
