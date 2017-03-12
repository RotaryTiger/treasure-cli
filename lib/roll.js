//==== Roller ====
var _ = require('underscore');
var roller = require('./roller');
var treasureRoller = require('./treasure-roller');

//==== Tables ====
var hoard_a = require('../tables/hoard/challenge-0-4');
var hoard_b = require('../tables/hoard/challenge-5-10');
var hoard_c = require('../tables/hoard/challenge-11-16');
var hoard_d = require('../tables/hoard/challenge-17-20');
var individual_a = require('../tables/individual/challenge-0-4');
var individual_b = require('../tables/individual/challenge-5-10');
var individual_c = require('../tables/individual/challenge-11-16');
var individual_d = require('../tables/individual/challenge-17-20');

/**
 * For the given table, determine the breakpoints at which treasure is generated
 *
 * @params {object} table - a table from the /tables directory
 *
 * @return {array} array of decending integers representing tiers of treasure
 */
function getTiers(table) {
	var keys = _.keys(table);
	var tiers = [];

	for (var i = 0, j = keys.length; i < j; i++) {
		tiers.push(parseInt(keys[i]));
	}

	return tiers.reverse();
}

/**
 * Determine which tier a d100 result falls under
 *
 * @params {number} d100 - randomly generated integer between 1 and 100
 * @params {object} table - table from whence to derive tiers
 *
 * @return {number} the tier corresponding to the d100 result
 */
function getTreasureTier(d100, table) {
	var tiers = getTiers(table);
	var result;

	for (var i = 0, j = tiers.length; i < j; i++) {
		if (d100 <= tiers[i]) {
			result = tiers[i];
		}
	}

	return result;
}

/**
 * For the given table, roll 1d100 to generate treasure
 *
 * @params {object} table - a table from the /tables directory
 *
 * @return {string} message to display containing treasure values generated
 */
function rollTable(table) {
	var d100 = roller.random(100);
	var tier = getTreasureTier(d100, table);
	
	return treasureRoller.rollTreasure(table[tier]);
}

module.exports = {
	getTiers: getTiers,
	getTreasureTier: getTreasureTier,
	rollTable: rollTable,
	generateTreasure: function(challenge, type) {
		if (type === 'individual') {
			if (0 <= challenge <= 4) {
				rollTable(individual_a);
			}
			else if (5 <= challenge <= 10) {
				rollTable(individual_b);
			}
			else if (11 <= challenge <= 16) {
				rollTable(individual_c);
			}
			else if (17 <= challenge) {
				rollTable(individual_d);
			}
			else {
				console.log('"' + challenge + '" did not match any known tables. Please try again.');
			}
		} else if (type === 'hoard') {
			if (0 <= challenge <= 4) {
				rollTable(hoard_a);
			}
			else if (5 <= challenge <= 10) {
				rollTable(hoard_b);
			}
			else if (11 <= challenge <= 16) {
				rollTable(hoard_c);
			}
			else if (17 <= challenge) {
				rollTable(hoard_d);
			}
			else {
				console.log('"' + challenge + '" did not match any known tables. Please try again.');
			}
		} else {
			console.log('"' + type + '" did not match any known types. Please try again.');
		}
	}
};
