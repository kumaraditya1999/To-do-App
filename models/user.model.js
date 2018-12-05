const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	name : {type: String,require : true,max:100},
	password: {type: String,require: true, max:100}
});

module.exports = moogose.model('User',UserSchema);

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// let ProductSchema = new Schema({
//     name: {type: String, required: true, max: 100},
//     price: {type: Number, required: true},
// });


// // Export the model
// module.exports = mongoose.model('Product', ProductSchema);