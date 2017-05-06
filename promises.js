// Built-in Promises
var gnr = new Band({
	name: "Guns N' Roses",
	members: ['Ax1', 'Slash']
});

var promise = gnr.save();
assert.ok(promise instanceof require('mpromise'));

promise.then(function(doc) {
	assert.equal(doc.name, "Guns N' Roses");
});

// Queries are not promises
var query = Band.findOne({name: "Guns N' Roses"});
assert.ok(!(query instanceof require('mpromise')));

query.then(functon(doc) {});

var promise = query.exec();
assert.ok(promise instanceof require('mpromis'));

promise.then(function(doc) {
		// use doc
});

// Promises for the MongoDB Driver

