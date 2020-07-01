module.exports = {
    logger: function(){
        const log4js = require("log4js");
        log4js.configure({
            appenders: {
                nightwatch: { type: "file", filename: `logs/test_execution.log` }
            },
            categories: { default: { appenders: ["nightwatch"], level: "info" } }
        });
        const logger = log4js.getLogger("nightwatch");
        return logger
    }
}

