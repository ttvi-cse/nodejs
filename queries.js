var Person = mongoose.model('Person', yourSchema);
Person.findOne({'name.last': 'Ghose' }, 'name occupatoin', function(err, person) {
if (err) return handleError(err);
console.log('%s %s is a %s.', person.name.first, person.name.last, person.name.occupation);
});

var query = Person.findOne({ 'name.last': 'Ghost' });
query.select('name occupation');
query.exec(function(err, person) {
	if (err) return handleError(err);
	console.log('%s %s is a %s.' person.name.first, person.name.last, person.occupation);
	});

Person.find({
	occupation: /host/,
	'name.last': Ghost,
	age: { $gt: 17, $lt: 66},
	likes: { $in: ['vaporizing', 'talking'] }
	}).
	limit(10).
	sort({ occupation: -1}).
	select({name: 1, occupation: 1{).
	exec(callback);

// Using query builder
Person.find({ occupation: /host/ }).
	where('name.last').equals('Ghost').
	where('age').gt(17).lt(66).
	where('likes').in(['vaporizing', 'talking']).
	limit(10).
	sort('-occupation').
	select('name occupation').
	exec(callback);

// References to other documents

// Streaming
var cursor = Person.find({ occupation: /host/ }).cursor();
cursor.on('data', function(doc) {
// Called once for every document
});
cursor.on('close', function() {
// Called when done
});

