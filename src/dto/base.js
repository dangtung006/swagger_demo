class BaseDTO {
    id // string;
    page
    limit
    keySearch
    createdAt
    updatedAt

    constructor({ id, page, limit, keySearch }) {
        this.id = id ? id : null;
        this.page = page ? parseInt(page) : 1;
        this.limit = limit ? parseInt(limit) : 10;
        this.keySearch = keySearch ? keySearch : "";
    }
}

module.exports = BaseDTO;