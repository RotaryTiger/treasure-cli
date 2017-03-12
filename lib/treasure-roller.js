var _ = require('underscore');
var roller = require('./roller');

var log = function(message) {
	if (false) console.log(message);
};

//==== Tables ====
var art = require('../tables/objects/art');
var gems = require('../tables/objects/gemstones');

/**
 * 
 */
function rollMoney(table) {
	// console.log('rolling money for table ' + JSON.stringify(table, null, 4));
	var moneyTypes = _.keys(table.money);
	var message = '';

	_.each(moneyTypes, function(type, index) {
		var money = table.money[type];
		// console.log('money: ' + JSON.stringify(money, null, 4));
		var amount = 0;

		if (money.roll) {
			console.log('rolling ' + money.roll + ' and adding it to the total');
			amount += roller.rollDice(money.roll);
		}

		if (money.value && money.value > 1) {
			console.log('multiplying roll by ' + money.value);
			amount *= money.value;
		}

		message += '\n' + moneyTypes[index] + ': ' + amount;
	});

	return message;
}

/**
 * 
 */
function generateGemstones(value) {
	return gems[value].descriptions[roller.rollDice(gems[value].roll) - 1];
}

/**
 * 
 */
function generateArtObjects(value) {
	return art[value].descriptions[roller.rollDice(art[value].roll) - 1];
}

/**
 * 
 */
function getType(type, value) {
	if (type === 'gemstones') {
		return generateGemstones(value);
	} else if (type === 'art object') {
		return generateArtObjects(value);
	}
}

/**
 * 
 */
function rollObjects(table) {
	var objectTypes = _.keys(table.object);
	var message = '';

	/**
	 * Get objects
	 */
	_.each(objectTypes, function(object, index) {
		var type = objectTypes[index] === 'gems' ? 'gemstones' : 'art objects';
		
		if (object.roll && object.value) {
			message += '\n' + 
			           type + ': ' + 
			           roller.rollDice(object.roll) + ' ' + 
			           getType(type, object.value) + ' worth ' + 
			           object.value;
		} else {
			console.log('did not have roll and value');
		}
	});

	return message;
}

/**
 * 
 */
function rollMagicItems(table) {
	var magicTypes = _.keys(table.magic);
	var message;

	/**
	 * Get magic items
	 */
	_.each(magicTypes, function(magic, index) {

	});

	return message;
}

/**
 * Roll for treasure based on the provided table's parameters. Each table has three different
 * kinds of treasure(s) to roll for:
 *    - Money (broken down into CP, SP, EP, GP, and PP)
 *    - Objects (broken down into Gems and Art)
 *    - Magic (consisting of a roll to make on a table)
 *
 * @params {object} table - treasure table found in /tables directory
 *
 * @returns {string} string of the entire log output
 */
function rollTreasure(table) {
	// console.log('[roll treasure] table: ' + JSON.stringify(table, null, 4));

	var output = '';
	var money = rollMoney(table);
	var objects = undefined; //rollObjects(table);
	var magicItems = undefined; //rollMagicItems(table);

	console.log('[roll treasure] money: ' + money);
	console.log('[roll treasure] objects: ' + objects);
	console.log('[roll treasure] magic items: ' + magicItems);

	if (money) output += money + '\n';
	if (objects) output += objects + '\n';
	if (magicItems) output += magicItems + '\n';

	return output;
}

module.exports = {
	rollTreasure: rollTreasure
};
