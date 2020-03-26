var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;
var AuthorSchema = new Schema(
    {
        first_name: {type: String, required:true, max:100},
        family_name: {type: String, required: true, max: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date}
    }
);

//Virtual for author's full name
AuthorSchema.virtual('name').get(function(){
    // To avoid errors in cases where an author doesn't have either a family name of first name
    // We want to make sure we handle the exception by return an empty string for that case
    var fullname = '';
    if(this.first_name && this.family_name) {
        fullname = this.family_name + ', ' + this.first_name;
    }
    if(!this.first_name || !this.family_name){
        fullname = '';
    }
    return fullname;
});

//Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function(){
    return(this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

//virtual for author's URL
AuthorSchema.virtual('url').get(function(){
    return('/catalog/author/' + this._id)
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
