const Buffer = require('buffer').Buffer;

module.exports = class Member {
    static create(data) {
        const {id, name, email, avatar} = data;
        return new Member(id, name, email, avatar);
    }

    constructor(id, name, email, avatar) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.avatar = avatar ? avatar.toString('base64') : '';
    }
};
