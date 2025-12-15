const mongoose = require("mongoose");

let instance = null;
class Database{

    constructor(){
        if (!instance) {
            this.mongoConnection = null;
            instance = this;
        }
    }

    async connect(options) {
        try {
            console.log("Connecting...");
            let db = await mongoose.connect(options);
            this.mongoConnection = db;
            console.log("Connectid");
        } catch (err) {
            console.error(err);
            process.exit(1);
        }

    }
}

module.exports = Database;