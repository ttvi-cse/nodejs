var schema = new mongoose.Schema({ name: 'string', size: 'string' });
var Tank = mongoose.model('Tank', schema);

// Constructing documents
var small = new Tank({size: 'small'}i);
small.save(function(err) {
	if (err) return handleError(err);
});

Tank.create({ size: 'small' }, function(err, small) {
	if (err) return handleError(err);
});
// Querying
Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback);

// Removing
Tank.remove({ size: 'large' }, function(err) {
	if (err) return handleError(err);
});

// Updating

