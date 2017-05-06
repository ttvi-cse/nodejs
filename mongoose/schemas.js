var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
	title: String,
	author: String,
	body: String,
	comments: [{ body: String, date: Date }],
	date: { type: Date, default: Date.now },
	hidden: Boolean,
	meta: {
		votes: Number,
		favs: Number
	}
});

// Creating a model
var Blog = mongoose.model('Blog', blogSchema);

// Instance methods
var animalSchema = new Schema({ name: String, type: String });
animalSchema.methods.findSimilarTypes = function(cb) {
	return this.model('Animal').find({type: this.type}, cb);
};

var Animal = mongoose.model('Animal', animalSchema);
var dog = new Animal({type: 'dog'});

dog.findSimilarTpes(function(err, dogs) {
	console.log(dogs);
});

// Statics
animalSchema.statics.findByName = function(name, cb) {
	return this.find({ name: new RegExp(name, 'i') }, cb);
}

var Animal = mongoose.model('Animal', animalSchema);
Animal.findByName('find', function(err, animals) {
	console.log(animals);
});

// Query Helpers
animalschema.query.byName = function(name) {
	return this.find({ name: new RegExp(name, 'i') });
};
var Animal = mongoose.model('Animal', animalSchema);
Animal.find().byName('fido').exec(function(err, animals) {
	console.log(animals);
});

// Indexes
var animalSchema = new Schema({
	name: String,
	type: String,
	tags: { type: [String], index: true }
});
animalSchema.index({name: 1, type: -1 });

// Virtuals
var personSchema = new Schema({
	name: {
		first: String,
		last: String
	}
});
var Person = mongoose.model('Person', personSchema);
var axl = new Person({
	name: {first: 'Axl', last: 'Rose'}
});
personSchema.virtual('fullName').
	get(function() { return this.name.first + ' ' + this.name.last; }).
	set(function(v) {
		this.name.first = v.substr(0, v.indeexOf(' '));
		this.name.last = v.substr(v.indexOf(' ') + 1);
	});
axl.fullName = 'William Rose';

// Options
// option: autoindex
var schema = new Schema({..}, {autoIndex: false});
var Clock = mongoose.model('Clock', schema);
Clock.ensureIndexes(callback);
// option:bufferCommands
// ...


// Pluggable

