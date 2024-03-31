const Joi = require("joi");
const BaseDTO = require("./base");

class ClaimDTO extends BaseDTO {

    userId //string
    amount //string 
    document//string


    constructor({ id, page, limit, userId, amount, document}) {

        super({ 
            id : id,
            page : page,
            limit : limit
        });

        this.userId = userId;
        this.amount = amount ? parseFloat(amount) : null;
        this.document = document;
    
    }

    validateCreate() {
        return Joi.object({

            userId: Joi.string().required(),
            amount: Joi.number().required(),
            document: Joi.string().required(),

        }).validate({
            userId: this.userId,
            amount: this.amount,
            document: this.document,
        });
    }

    validateGetList() {
        return Joi.object({
            userId : Joi.string().required()
        }).validate({
            userId : this.userId
        })
    }

    validateGetDetail() { 
        return Joi.object({
            userId : [Joi.string().required()],
            id : [Joi.string().required()]
        }).validate({ 
            id : this.id,  
            userId : this.userId
        });
    }

    validateUpdate() {}
    validateRemove() {}
}

module.exports = ClaimDTO;