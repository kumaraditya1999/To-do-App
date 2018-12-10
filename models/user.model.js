const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NotesSchema = new Schema({
	title : String,
	description : String,
	priority : Number,
	time : String,
	date : String,
});


let UserSchema = new Schema({
	firstname : {type: String,require : true,max:100},
	lastname : {type: String,require : true,max:100},
	email : {type: String,require : true,max:100},
	username : {type: String,require : true,max:100},
	password : {type: String,require: true, max:100},
	notes : [{type :NotesSchema}],
});

module.exports = mongoose.model('User',UserSchema);
