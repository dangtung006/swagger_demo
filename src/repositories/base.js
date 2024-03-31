class BaseRepository {
    constructor({ entity }){
        this.entity =  entity ? entity : null;
    }

    getById(id){
        return this.entity.findById(id);
    }

    getAll(conditions={}){
        return this.entity.find(conditions).limit(10000);
    }

    getList({ page, sort, limit }){
        return this.entity.find().skip((page -1) * limit).sort(sort).limit(limit);
    }

    getListByConditions({ conditions = {} , sort ={ createdOn : -1 }, limit = 50 , page = 1}){
        return this.entity.find(conditions).skip((page -1) * limit).sort(sort).limit(limit);
    }

    getOneByConditions(conditions){
        return this.entity.findOne(conditions)
    }
    
    deleteOneById(id){
        return this.entity.findByIdAndDelete({ _id: id });
    }

    create(data){ return this.entity.create(data); }

    save(data){ return (new this.entity(data)).save(); }

    updateOneByCondition(filter, update, opt) {
        return this.entity.updateOne(filter, update, opt);
    }

    getOneAndUpdateById(id, update, options = {upsert: false, new : true}) {
        return this.entity.findByIdAndUpdate({ _id: id }, update, options);
    }

    getOneAndUpdateByConditions(conditions, update, options= { upsert: false, new : true} ){
        return this.entity.findOneAndUpdate(conditions, update, options);
    }

    countByConditions(filter){
        return this.entity.countDocuments(filter)
    }

    countAll(){
        return this.entity.estimatedDocumentCount();
    }
}

module.exports = BaseRepository