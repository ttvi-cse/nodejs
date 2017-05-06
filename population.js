var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var personSchema = Schema({
_id : Number,
name: String,
age: Number,
stories: [{type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
_creator : { type: Number, ref: 'Person' },
title : String,
fans: [{ type: Number, ref: 'Person' }]
});

var Story = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);

// Saving refs
var aaron = new Person({ _id: 0, name: 'Aaron', age: 100 });

aaron.save(function(err) {
	if (err) return handleError(err);
	var story1 = new Story({
	title: "Once upon a timex.",
	_creator: aaron._id
	});

	story1.save(function(err) {
	if (err) return handleError(err);
	});
});

// Population
Story
.findOne({title: 'Once upon a timex.' })
.populate('_creator')
.exec(function(err, story) {
	if (err) return handleError(err);
	console.log('The creator is %s', story._creator.name);
	// prints 'The creator is Aaron'
});

// Setting Populated Fields
Story.findOne({title: 'Once upon a timex.'}, function(err, story) {
	if (err)  {
		return handleError(err);
	}
	story._creator = aaron;
	console.log(story._creator.name); // prints 'Aaron'
});

// field selection
Story
.findOne({title: /timex/i })
.populate('_creator', 'name')
.exec(function(err, story) {
	if(err) returnhandleError(err);
	console.log('The creator is %s', story._creator.name);
	
	console.log('The creators age is %s', story._creator.age);
}

// populating multiple paths
Story
.find(...)
.populate('fans _creator')
exec();

Story
.find(...)
.populate('fans')
.populate('_creator')
.exec()

// Query conditions and other options
Story
.find(...)
.populate({
	path: 'fans',
	match: { age: {$gte 21}},
	select: 'name -_id',
	options: { limits: 5}
})
.exec()

// Refs to children
aaron.stories.push(story1);
aaron.save(callback);

Person
	.findOne({ name: 'Aaron' })
	.populate('stories')
	.exec(function(err, person) {
		if (err) return handleError(err);
		console.log(person);
	});

Story
	.find({_creator: aaron._id{)
	.exec(function(err, stories) {
		if (err) return handleError(err);
		console.log('The stories are an array: ', stories);
	});

// Updating refs
var guille = new Person({ name: 'Guillermo' });
guille.save(function(err) {
	if (err) return handleError(err);

	story._creator = guille;
	console.log(story._creator.name);

	story.save(function(err) {
		if (err) return handleError(err);

		Story
			.findOne({ title: /timex/i })
			.pupolate({ path: '_creator', select: 'name' })
			.exec(function(err, story) {
				if (err) return handleError(err);
				
				console.log('The creator is %s', story._creator.name);
			})
	})
});

// Populating an exsting document

// Populating multiple existing documents

// Populating acros multiple levels

var userSchema = new Schema({
	name: String,
	firends: [{ type: ObjectId, ref: 'User' }]
});

User.
	findOne({ name: 'Val'}).
	populate({
		path: 'friends',
		populate: { path: 'friends' }
	});

// Populating across Databases
var eventSchema = new Schema({
	name: String,
	conversation: ObjectId
	});

var conversationSchema = new Schema({
		numMessages: Number
});

var  db1 = mongoose.createConnection('localhost:27000/db1');
var db2 = mongoose.createConnection('localhost:27001/db2');

var Event = db1.model('Even', eventSchema);
var Conversation = db2.model('Conversatin', conversationSchema);

Event.
	find().
	populate({ path: 'conversation', model: Conversation }).
	exec(function(err, docs) {});

// Dynamic References
var userSchema = new Schema({
	name: String,
	connections: [{
		kind: String,
		item: { type: ObjectId, refPath: 'connections.kind' }
	}]
});

var origanizationSchema = new Schema({ name: String,  kind: String});

var User = mongoose.model('User', userSchema);
var Organization =  mongoose.model('Organization', organizationSchema);

// Populate Virtuals
var PersonSchema = new Schema({
	name: String,
	band: String
});

var BandSchema = new Schema({
	name: String
});

BandSchema.virtual('members', {
		ref: 'Person',
		localField: 'name',
		foreignField: 'band'
});

var Person =  mongoose.model('Person', personSchema);
var Band = mongoose.model('Band', bandSchema);

Band.find({}).populate('members').exec(function(err, bands) {
	///
});
