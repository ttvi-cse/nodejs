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

