/**
 * Each Query method returns a Query object, so that we can chain them together.
 * Query objects are immutable (we can re-use them) and lazy (we don’t do any work until we really have to.)
 * exec() method executes the query and returns the result.
 **/

export class Query {
	exec(): unknown {
		return null;
	}
	find() {
		return this;
	}
	findAll() {
		return this;
	}
	/* .... */
}
