// init DB
const mongoose = require("mongoose");
const { dbConfig } = require("../configs/const");

class MyDB {

    constructor() {
        this.connect();
    }

    async connect(type = "mongodb") {
        const { host , port, name  } = dbConfig;

        try {
            await mongoose.connect(
                `mongodb://${host}:${port}/${name}?retryWrites=true&w=majority`,
                { maxPoolSize: 50 }
            );
            mongoose.set('debug', true);
        } catch (err) {
            console.log(err)
            console.log("connect err");
        }
    }

    static async getInstance() {
        if (!MyDB.instance) {
            MyDB.instance = new MyDB();
        }

        return MyDB.instance;
    }
}

module.exports = MyDB