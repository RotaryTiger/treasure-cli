/**
 * Different functions for randomizing numbers
 */

/**
 * Generate a random integer between 1 and the value passed as an argument (inclusive) to
 * simulate the rolling of a die
 *
 * @params {number} val - upper bound of integers to generate
 *
 * @return {number} random number between 1 and val
 */
function random(val) {
	return 1 + Math.floor(Math.random() * val);
}

/**
 * Generate a random integer based on the dice notation [X]d[Y] where Y represents the
 * size of the die, and X represents the number of dice to roll. For example, "2d6" should
 * generate two numbers between 1 and 6, combine their values, and return the result
 *
 * @params {string} formula - dice notation formula
 *
 * @returns {number} the combined value of the dice rolls based on the formula
 */
function rollDice(formula) {
	var dice = formula.split('d'),
	    dieNumber = parseInt(dice[0]),
	    dieSize = parseInt(dice[1]),
	    result = 0;

	for (var i = 0; i < dieNumber; i++) {
		result += random(dieSize);
	}

	return result;
}

module.exports = {
	random: random,
	rollDice: rollDice
};
