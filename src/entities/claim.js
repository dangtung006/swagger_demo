const { Schema, model } = require("mongoose");
const COLLECTION_NAME = 'claims';
const DOCUMENT_NAME = 'claim';

const ClaimSchema = new Schema({
    userId: { type: String, require: true },
    document: { type: String, require: true },
    amount: { type: Number, require: true},

}, {
    collection: COLLECTION_NAME,
    timestamps: {
        createdAt: "createdOn",
        updatedAt: "modifiedOn"
    }
});

const ClaimEnity = model(DOCUMENT_NAME, ClaimSchema);
module.exports = ClaimEnity;