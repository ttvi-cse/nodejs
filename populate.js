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

