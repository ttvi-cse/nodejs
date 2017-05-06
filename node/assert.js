var assert = require('assert');
assert.deepEqual(Error('a'), Error('b'));
const obj1 = {
	a : {
		b : 1
	}
};
const obj2 = {
	a : {
		b : 2
	}
};
const obj3 = {
	a : {
		b : 1
	}
};
const obj4 = Object.create(obj1);
assert.deepEqual(obj1, obj1);
assert.deepEqual(obj1, obj2);
assert.deepEqual(obj1, obj3);
assert.deepEqual(obj1, obj4);

// assert.equal
assert.equal(1,1);
assert.equal(1,'1');
assert.equal(1,2);
assert.equal({a: {b:1}}, {a: {b:1}});

