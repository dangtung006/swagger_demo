const ClaimEnityEnity = require("../entities/claim");
const BaseRepository = require("./base");

class ClaimRepository extends BaseRepository{
    constructor(){
        super({
            entity : ClaimEnityEnity
        })
    }
}

module.exports = ClaimRepository