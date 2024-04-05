//Our Custom exception class, will log detailed info about the error
class CustomException {
    constructor(message, status = 500) {
        this.name = `CustomException`;
        this.message = message;
        this.status = status;
        this.stack = (new Error()).stack;
    }
}

module.exports = CustomException;