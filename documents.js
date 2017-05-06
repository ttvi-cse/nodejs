// Retrieving

// Updating
Tank.findById(id, function(err, tank) {
	if (err) return handleError(err);

	tank.size = 'large';
	tank.save(function(err, updateTank) {
		if (err) return handleError(err);
		res.send(updatedTank);
	});
});
Tank.update({_id: id}, {$set: {size: 'large' }}, callback);

Tank.findByIdAndUpdate(id, { $set: { size: 'large' }}, { new: true }, function(err, tank) {
	if (err) return handleError(err);
	res.send(tank);
});

// Validating

