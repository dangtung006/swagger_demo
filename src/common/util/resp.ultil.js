const { responseKey } = require("../../configs/request")

const makeResponse = (resp)=>({ [responseKey] : resp });

module.exports = {
    makeResponse
}